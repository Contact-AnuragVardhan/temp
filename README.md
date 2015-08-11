https://github.com/mmurph211/Autocomplete
//Utility for Search,Filter--can be used in datagrid
https://github.com/javve/list.js
http://joehewitt.github.io/scrollability/tableview.html
http://cubiq.org/dropbox/iscroll4/examples/simple/
------------------------------------------------------------------------------------------------------
var nsList = Object.create(nsContainerBase);

nsList.initializeComponent = function() 
{
	this.base.initializeComponent();
	this.__dataProvider = null;
	this.__labelField = "label";
	this.__labelFunction = null;
	this.__templateID = null;
	this.__itemRenderer = null;
	this.__setDataCallBack = null;
	this.__selectedIndex = -1;
	this.__selectedItem = null;
	this.__allowMultipleSelection = false;
	this.__selectedItems = new Array();	
	
	this.__outerContainer = null;
	this.__childContainer = null;
	this.__listContainer = null;
	
	
	this.__availableHeight = 0;
	this.__scrollHeight = 0;
	this.__listItemHeight = 0;
	this.__rowCount = 0;
	this.__maxRows = 0;
	this.__visibleRows = 0;
	this.__hiddenRows = 0;
	this.__availableRows = 0;
	this.__topHiddenRows = 0;
	this.__bottomHiddenRows = 0;
	this.__maxCount = 0;
	this.__startArrayElement = -1;
	this.__scrollOffset = 0;
	
	this.__positionX = 0;
	this.__positionY = 0;
	this.__changeX = 0;
	this.__changeY = 0;
};

nsList.setComponentProperties = function() 
{
	if(this.hasAttribute("labelField"))
	{
		this.__labelField = this.getAttribute("labelField");
	}
	if(this.hasAttribute("labelFunction"))
	{
		this.__labelFunction = this.getAttribute("labelFunction");
	}
	if(this.hasAttribute("templateID"))
	{
		this.__templateID = this.getAttribute("templateID");
	}
	if(this.hasAttribute("setDataCallBack"))
	{
		this.__setDataCallBack = this.getAttribute("setDataCallBack");
	}
	if(this.hasAttribute("allowMultipleSelection"))
	{
		this.__allowMultipleSelection = this.getAttribute("allowMultipleSelection");
	}
	this.__setTemplate();
	this.base.setComponentProperties();
};

nsList.setDataProvider = function(dataProvider)
{
	this.__dataProvider = dataProvider;
	if(this.__dataProvider && this.__dataProvider.length > 0)
	{
		this.__calculateComponentParameters();	
		this.__createComponents();
		this.__bindRenderers();
		this.__calculateDimensions();
		this.__renderList(0);
		this.__setPosition(0,0);
	}
};

nsList.__setTemplate = function()
{
	if(this.__templateID)
	{
		this.__itemRenderer = this.util.getTemplate(this.__templateID);
	}
	else
	{
		var renderer = new this.util.defaultRenderer();
		this.__itemRenderer = renderer.getRenderer();
		this.__setDataCallBack = renderer.setData;
	}
};

nsList.__createComponents = function()
{
	if(!this.__outerContainer)
	{
		this.__outerContainer = this.util.createDiv(this.getID() + "#container","nsListParentContainer");
		this.__outerContainer.style.height = this.__availableHeight + "px";
		this.addChild(this.__outerContainer);
		this.__childContainer = this.util.createDiv(this.getID() + "#childContainer","nsListChildContainer");
		this.__outerContainer.appendChild(this.__childContainer);
		var divHeight = this.util.createDiv(null,"nsListScrollerCause");
		divHeight.style.maxHeight = this.__scrollHeight + "px";
		divHeight.style.height = this.__scrollHeight + "px";
		this.__outerContainer.appendChild(divHeight);
		this.__listContainer = document.createElement("ul");
		this.util.addStyleClass(this.__listContainer,"nsListContainer");
		this.__childContainer.appendChild(this.__listContainer);
		console.log("this.__rowCount::" + this.__rowCount);
		for(var count = 0; count <= this.__rowCount; count++) 
		{
			 var listItem = document.createElement("li");
			 listItem.style.height = this.__listItemHeight + "px";
			 this.__listContainer.appendChild(listItem);
		}
		this.util.addEvent(this.__outerContainer,"scroll",this.__scrollHandler.reference(this));
	}
};

nsList.__calculateComponentParameters = function()
{
	if(this.hasAttribute("nsHeight"))
	{
		this.__availableHeight = this.util.getDimensionAsNumber(this,this.getAttribute("nsHeight"));
	}
	else if(this.style.height != "")
	{
		this.__availableHeight  = this.util.getDimensionAsNumber(this,this.style.height);
	}
	else
	{
		this.__availableHeight  = this.offsetHeight;
	}
	var tempRenderer = this.__itemRenderer.cloneNode(true);
	this.addChild(tempRenderer);
	this.__listItemHeight = tempRenderer.offsetHeight;
	this.__rowCount = Math.round(this.__availableHeight/this.__listItemHeight) * 2;
	this.__scrollHeight = ((this.__dataProvider.length) * this.__listItemHeight);
	this.deleteChild(tempRenderer);
};

nsList.__calculateDimensions = function()
{
	if(this.__listContainer.children)
	{
		this.__maxRows = (this.__listContainer.offsetHeight - this.__availableHeight) / this.__listItemHeight;
		this.__availableRows = this.__listContainer.children.length;
		this.__visibleRows = (this.__availableHeight / this.__listItemHeight);
		this.__hiddenRows = this.__availableRows - this.__visibleRows;
		this.__topHiddenRows = Math.floor(this.__hiddenRows / 2);
		this.__bottomHiddenRows = this.__topHiddenRows + (this.__hiddenRows % 2);
		this.__maxCount = Math.max(0,this.__dataProvider.length - this.__visibleRows);
		for(var count = 0; count < this.__listContainer.children.length; count++) 
		{
			this.__listContainer.children[count].originalOrder = count;
		}
	}
};

nsList.__renderList = function(value)
{
	var selectedIndex = this.__selectedIndex;
	if(value < 0)
	{
		value = 0;
	}
	else if(value > this.__maxCount)
	{
		value = this.__maxCount;
	}
	
	if(this.__selectedIndex != value)
	{
		this.__selectedIndex = value;
		selectedIndex = value;
		var topOffset = 0;
		var minBottomRows = Math.min(this.__bottomHiddenRows,this.__maxCount - this.__selectedIndex);
		var minTopRows = Math.min(this.__selectedIndex,this.__topHiddenRows);
		topOffset = this.__listContainer.children[0].originalOrder;
		var rowsOnTop = (this.__selectedIndex - topOffset % this.__availableRows) % this.__availableRows;
		var rowsOnBottom = this.__availableRows - this.__visibleRows - rowsOnTop;
		var toMove = 0;
		if(this.__selectedIndex > selectedIndex)
		{
			minTopRows--;
		}
		else if(this.__selectedIndex < selectedIndex)
		{
			minBottomRows--;
		}
		while(rowsOnBottom < minBottomRows)
		{
			toMove = this.__listContainer.children[0];
			this.__listContainer.removeChild(toMove);
			this.__listContainer.appendChild(toMove);
			rowsOnBottom++;
			rowsOnTop--;
		}
		
		while(rowsOnTop < minTopRows) 
		{
			toMove = this.__listContainer.children[this.__listContainer.children.length - 1];
			this.__listContainer.removeChild(toMove);
			this.__listContainer.insertBefore(toMove,this.__listContainer.children[0]);
			rowsOnTop++;
			rowsOnBottom--;
		}
		rowsOnTop = this.__availableRows - this.__visibleRows - rowsOnBottom; 
		topOffset = Math.max(0,Math.floor(this.__selectedIndex - rowsOnTop));
       	var start = Math.ceil(this.__selectedIndex) - Math.ceil(rowsOnTop);
		if(start != this.__startArrayElement)
		{
			var end = start + this.__availableRows;
			var visibleData = this.__dataProvider.slice(start, end);
			var domElement = null;
			var dataItem = null;
			for(var count = 0; count < visibleData.length; count++) 
			{
				if(this.__listContainer.children[count].data != visibleData[count]) 
				{
					dataItem = visibleData[count];
					domElement = this.__listContainer.children[count];
					domElement.data = dataItem;
					if(this.util.isFunction(this.__setDataCallBack))
		            {
		            	if(this.util.isString(this.__setDataCallBack))
		            	{
		            		this.util.callFunctionFromString(this.__setDataCallBack + "(domElement,dataItem,labelField)",function(paramValue){
		        				if(paramValue === "domElement")
		        				{
		        					return domElement;
		        				}
		        				if(paramValue === "dataItem")
		        				{
		        					return dataItem;
		        				}
		        				if(paramValue === "labelField")
		        				{
		        					return this.__labelField;
		        				}
		        				return paramValue;
		        			});
		            	}
		            	else
		            	{
		            		this.__setDataCallBack(domElement,dataItem,this.__labelField);
		            	}
		            }
				}
			}
			this.__startArrayElement = start;
		}
		this.__listContainer.style.top = Math.max(0, this.__scrollOffset - ((this.__selectedIndex - topOffset) * this.__listItemHeight));
		console.log("this.__scrollOffset::" + this.__scrollOffset + ",this.__selectedIndex::" + this.__selectedIndex + 
				",topOffset::" + topOffset + ",this.__listItemHeight::" + this.__listItemHeight);
	}
};

nsList.__setPosition= function(posX,posY)
{
	this.__positionX = posX;
	this.__positionY = posY;
};

nsList.__setChange= function(changeX,changeY)
{
	this.__changeX = this.__positionX - changeX;
	this.__changeY = this.__positionY - changeY;
};

nsList.__scrollHandler = function(event)
{
	if(this.__outerContainer.scrollTop == this.__scrollOffset) 
	{
		return;
	}
	if(!this.__dataProvider || !this.__dataProvider.length) 
	{
		return;
	}
	console.log("In Scroll");
	this.__scrollOffset = Math.max(0,this.__outerContainer.scrollTop);
	this.__scrollOffset = Math.min(this.__scrollOffset, this.__scrollHeight);
	
	this.__setChange(this.__outerContainer.scrollLeft, this.__scrollOffset);
	this.__renderList(this.__selectedIndex - this.__changeY / this.__listItemHeight, false);
	this.__setPosition(this.__outerContainer.scrollLeft, this.__scrollOffset);
};

nsList.__bindRenderers = function() 
{
	var listItem = null;
	for(var count = 0; count < this.__listContainer.children.length; count++) 
	{
		listItem = this.__listContainer.children[count];
		this.util.removeAllChildren(listItem);
		listItem.appendChild(this.__itemRenderer.cloneNode(true));
		this.__setRendererProperties(listItem);
	}
};

nsList.__setRendererProperties = function(listItem)
{
	if(listItem)
	{
		var compChild = null;
		for(var count = 0; count < listItem.children.length; count++) 
		{
			compChild = listItem.children[count];
			if(compChild && compChild.hasAttribute("accessor-name"))
			{
				listItem[compChild.getAttribute("accessor-name")] = compChild;
			}
			this.__setRendererProperties(compChild);
		}
	}
};

nsList.propertyChange = function(attrName, oldVal, newVal, setProperty) 
{
	this.base.propertyChange(attrName, oldVal, newVal, setProperty);
};


document.registerElement("ns-list", {prototype: nsList});
