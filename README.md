var nsList = Object.create(nsContainerBase);

nsList.initializeComponent = function() 
{
	this.base.initializeComponent();
	this.ITEM_SELECTED = "itemSelected";
	this.ITEM_UNSELECTED = "itemUnselected";
	
	this.__resuableRenderRequired = false;
	this.__dataProvider = null;
	this.__labelField = "label";
	this.__labelFunction = null;
	this.__templateID = null;
	this.__itemRenderer = null;
	this.__setDataCallBack = null;
	this.__clearDataCallBack = null;
	this.__currentIndex = -1;
	this.__selectedIndex = -1;
	this.__selectedItem = null;
	this.__enableMultipleSelection = false;
	this.__customScrollerRequired = false;
	this.__selectedRows = new Array();
	this.__selectedItems = new Array();	
	this.__selectedIndexes = new Array();
	
	this.__arrWrapper = null;
	
	this.__outerContainer = null;
	this.__parentContainer = null;
	this.__childContainer = null;
	this.__listContainer = null;
	this.__scroller = null;
	
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
	this.__targetDimensionOffset = 140;
	this.__pageSize = 0;
	
	this.__positionX = 0;
	this.__positionY = 0;
	this.__changeX = 0;
	this.__changeY = 0;
};

nsList.setComponentProperties = function() 
{
	if(this.hasAttribute("resuableRenderRequired"))
	{
		this.__resuableRenderRequired =  Boolean.parse(this.getAttribute("resuableRenderRequired"));
	}
	if(this.hasAttribute("labelField"))
	{
		this.__labelField = this.getAttribute("labelField");
	}
	if(this.hasAttribute("labelFunction"))
	{
		this.__labelFunction = this.getAttribute("labelFunction");
	}
	if(this.hasAttribute("template"))
	{
		this.__templateID = this.getAttribute("template");
	}
	if(this.hasAttribute("setDataCallBack"))
	{
		this.__setDataCallBack = this.getAttribute("setDataCallBack");
	}
	if(this.hasAttribute("clearDataCallBack"))
	{
		this.__clearDataCallBack  = this.getAttribute("clearDataCallBack");
	}
	if(this.hasAttribute("enableMultipleSelection"))
	{
		this.__enableMultipleSelection =  Boolean.parse(this.getAttribute("enableMultipleSelection"));
	}
	if(this.hasAttribute("customScrollerRequired"))
	{
		this.__customScrollerRequired =  Boolean.parse(this.getAttribute("customScrollerRequired"));
	}
	this.__setTemplate();
	this.__addListenerForBody();
	this.base.setComponentProperties();
};

nsList.setDataProvider = function(dataProvider)
{
	this.__dataProvider = dataProvider;
	if(this.__dataProvider && this.__dataProvider.length > 0)
	{
		this.__calculateComponentParameters();
		this.__createComponents();
		if(this.__resuableRenderRequired)
		{
			this.__createWrapperObject();
			this.__createReusableRendererComponents();
			this.__calculateDimensions();
			this.__renderList(0);
			this.__setPosition(0,0);
		}
		else
		{
			this.__createNonreusableRendererComponents();
		}
		if(this.__customScrollerRequired && !this.__scroller)
		{
			this.__outerContainer.style.overflow = "hidden";
			this.__scroller = new NSScroller(this.__parentContainer);
		}
	}
};

nsList.setSelectedIndex = function(selectedIndex,animationRequired)
{
	//console.log(this.__outerContainer.clientHeight + "," + this.__listContainer.children[0].offsetHeight + "," + this.__outerContainer.clientHeight/this.__listContainer.children[0].offsetHeight);
	if(selectedIndex > -1 && this.__arrWrapper && selectedIndex < this.__arrWrapper.length)
	{
		var target = this.__outerContainer;
		if(this.__customScrollerRequired)
		{
			target = this.__scroller.getChildContainer();
		}
		//if(this.__resuableRenderRequired)
		//{
			var targetDimension = (parseInt(selectedIndex) * this.__listItemHeight) + this.__targetDimensionOffset;
			if(animationRequired)
			{
				var animation = new this.util.animation(target,[
	       	  	    {
	       	  	      time: 1,
	       	  	      property:"scrollTop",
	       	  	      target: targetDimension,
	       	  	    }
	       	  	]);
       	  	  	animation.animate();
			}
			else
			{
				target.scrollTop = targetDimension;
			}
		//}
	}
};

nsList.getSelectedIndex = function()
{
	return this.__selectedIndex;
};

nsList.getSelectedItem = function()
{
	return this.__selectedItem;
};

nsList.getSelectedIndexes = function()
{
	return this.__selectedIndexes;
};

nsList.getSelectedItems = function()
{
	return this.__selectedItems;
};

nsList.deselectAll = function()
{
	this.__clearAllRowSelection();
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
		this.__clearDataCallBack = renderer.clearData;
	}
};

nsList.__createWrapperObject = function()
{
	this.__arrWrapper = new Array();
	if(this.__dataProvider)
	{
		var dataItem = null;
		for(var count = 0; count < this.__dataProvider.length; count++) 
		{
			dataItem = this.__dataProvider[count];
			this.__createWrapperItem(dataItem,count);
		}
	}
};

nsList.__createWrapperItem = function(dataItem,count)
{
	var item = new Object();
	item.data = dataItem;
	item.selected = false;
	this.__arrWrapper[count] = item;
};

nsList.__createComponents = function()
{
	if(!this.__outerContainer)
	{
		this.__outerContainer = this.util.createDiv(this.getID() + "#container","nsListOuterContainer");
		this.__outerContainer.style.height = this.__availableHeight + "px";
		this.addChild(this.__outerContainer);
		this.__parentContainer = this.util.createDiv(this.getID() + "#parentContainer","nsListParentContainer");
		this.__outerContainer.appendChild(this.__parentContainer);
		this.__childContainer = this.util.createDiv(this.getID() + "#childContainer",null);
		this.__parentContainer.appendChild(this.__childContainer);
		this.__listContainer = document.createElement("ul");
		this.util.addStyleClass(this.__listContainer,"nsListContainer");
		//this.__parentContainer.appendChild(this.__listContainer);
		this.__childContainer.appendChild(this.__listContainer);
	}
};

nsList.__createNonreusableRendererComponents = function()
{
	this.__arrWrapper = new Array();
	if(this.__outerContainer && this.__dataProvider.length > 0)
	{
		var dataItem = null;
		for(var count = 0; count < this.__dataProvider.length; count++) 
		{
			var listItem = this.__createItem();
			dataItem = this.__dataProvider[count];
			listItem.index = count;
			this.__setDataInItem(listItem,dataItem);
			this.__createWrapperItem(dataItem,count);
		}
		//5 is offset for number of rows
		this.__pageSize = 29;//(this.__outerContainer.clientHeight/this.__listContainer.children[0].offsetHeight) - 5;
	}
};

nsList.__createReusableRendererComponents = function()
{
	if(this.__outerContainer)
	{
		var target = null;
		if(this.__customScrollerRequired)
		{
			target = this.__parentContainer;
			this.__childContainer.style.maxHeight = this.__scrollHeight + "px";
			this.__childContainer.style.height = this.__scrollHeight + "px";
		}
		else
		{
			target = this.__outerContainer;
			var divHeight = this.util.createDiv(null,"nsListScrollerCause");
			divHeight.style.maxHeight = this.__scrollHeight + "px";
			divHeight.style.height = this.__scrollHeight + "px";
			this.__outerContainer.appendChild(divHeight);
		}
		for(var count = 0; count <= this.__rowCount; count++) 
		{
			var listItem = this.__createItem();
		}
		this.util.addEvent(target,"scroll",this.__scrollHandler.reference(this));
	}
};

nsList.__setDataInItem = function(listItem,data)
{
	if(listItem)
	{
		this.__setRendererInData(listItem,data);
		//IE bug
		listItem.data = data;
		if(this.util.isFunction(this.__setDataCallBack))
	    {
			var list = this;
	    	if(this.util.isString(this.__setDataCallBack))
	    	{
	    		this.util.callFunctionFromString(this.__setDataCallBack + "(listItem,data,labelField)",function(paramValue){
					if(paramValue === "listItem")
					{
						return listItem;
					}
					if(paramValue === "data")
					{
						return data;
					}
					if(paramValue === "labelField")
					{
						return list.__labelField;
					}
					return paramValue;
				});
	    	}
	    	else
	    	{
	    		this.__setDataCallBack(listItem,data,this.__labelField);
	    	}
	    }
	}
};

nsList.__createItem = function()
{
	 var listItem = document.createElement("li");
	 this.util.addStyleClass(listItem,"nsListItem");
	 listItem.style.height = this.__listItemHeight + "px";
	 this.util.addEvent(listItem,"click",this.__itemClickHandler.reference(this));
	 this.util.addEvent(listItem,"mouseover",this.__itemMouseOverHandler.reference(this));
	 this.util.addEvent(listItem,"mouseout",this.__itemMouseOutHandler.reference(this));
	 listItem.appendChild(this.__itemRenderer.cloneNode(true));
	 this.__setRendererProperties(listItem);
	 this.__listContainer.appendChild(listItem);
	 
	 return listItem;
};

nsList.__itemClickHandler = function(event)
{
	event = this.util.getEvent(event);
    var target = this.util.getTarget(event);
    target = this.util.findParent(target,"li");
    //Multiselection Check
    if (event.shiftKey && this.__enableMultipleSelection)
    {
    	this.__multiSectionHandler(target);
    }
    else if(event.ctrlKey && this.__enableMultipleSelection)
    {
      if(this.__isRowSelected(target))
      {
    	  this.__markRowUnselected(target);
      }
      else
      {
    	  this.__markRowSelected(target);
      }
    }
    else
    {
    	this.__clearAllRowSelection();
    	this.__markRowSelected(target);
    } 
};

nsList.__itemMouseOverHandler = function(event)
{
	console.log("In __itemMouseOverHandler");
	 var target = this.util.getTarget(event);
     target = this.util.findParent(target,"li");
     if(target && target.index > -1)
     {
    	 this.util.addStyleClass(target,"itemHover");
     }
};

nsList.__itemMouseOutHandler = function(event)
{
	console.log("In __itemMouseOutHandler");
	 var target = this.util.getTarget(event);
     target = this.util.findParent(target,"li");
     if(target)
     {
    	 this.util.removeStyleClass(target,"itemHover");
     }
};

nsList.__isRowSelected= function(row)
{
    if(row)
    {
        return this.util.hasStyleClass(row,"selected");
    }   
    return false;
};

nsList.__markRowSelected= function(row)
{
    if(row)
    {
        if(!this.__isRowSelected(row))
        {
        	this.util.addStyleClass(row,"selected"); 
            this.__setMultiSelectedVars(row,true);
            this.__arrWrapper[row.index].selected = true;
            this.__selectedIndex = row.index;
            this.util.dispatchEvent(this,this.ITEM_SELECTED,row.data,{index:row.index});
        }
    }
};

nsList.__markRowUnselected= function(row)
{
    if(this.__isRowSelected(row))
    {
    	this.util.removeStyleClass(row,"selected");
    	var isUnselected = this.__setMultiSelectedVars(row,false);
        if(isUnselected)
        {
        	this.__arrWrapper[row.index].selected = false;
        	this.util.dispatchEvent(this,this.ITEM_UNSELECTED,row.data,{index:row.index});
        }
    }
};

nsList.__clearAllRowSelection= function()
{
	var size = this.__selectedIndexes.length;
    for (var count = size - 1; count >= 0 ; count--)
    {
    	this.__arrWrapper[this.__selectedIndexes[count]].selected = false;
    	var row = this.__selectedRows[count];
        if (row)
        {
        	this.__markRowUnselected(row);
        }
    }
    this.__selectedIndex = -1;
    this.__setMultiSelectedVars(null,true);
};

nsList.__multiSectionHandler= function(lastRow)
{
	 if(!lastRow)
	 {
		 return;
	 }
	 if (this.__selectedRows.length === 0)
	 {
		 this.__isRowSelected(lastRow);
	     return;
	 }
	 var firstRow = this.__selectedRows[this.__selectedRows.length - 1];
	 if(lastRow.index === firstRow.index)
	 {
		 this.__markRowUnselected(lastRow);
		 return;
	 }
	 var isDown = lastRow.index > firstRow.index;
	 var isSelection = !this.__isRowSelected(lastRow);
	 var navigateRow = firstRow;
	 do
	 {
		  navigateRow = isDown ? navigateRow.nextSibling : navigateRow.previousSibling;
		  if (isSelection)
		  {
			  this.__markRowSelected(navigateRow);
		  }
		  else
		  {
			  this.__markRowUnselected(navigateRow);
		  }
	 }
	 while(navigateRow.index != lastRow.index);
};

nsList.__setMultiSelectedVars= function(row,add)
{
	if(!row)
	{
		this.__selectedRows = new Array();
		this.__selectedItems = new Array();	
		this.__selectedIndexes = new Array();	
	}
	else if(add)
	{
		this.__selectedRows.push(row);
		this.__selectedItems.push(row.data);
		this.__selectedIndexes.push(row.index);
	}
	else
	{
		var isUnselected = false;
		for (var count= 0; count < this.__selectedRows.length ; count++)
        {
            if (this.__selectedRows[count].index === row.index)
            {
                this.__selectedRows.splice(count,1);
                this.__selectedItems.splice(count,1);
                this.__selectedIndexes.splice(count,1);
                isUnselected = true;
                break;
            }
        }
		return isUnselected;
	}
	
	return true;
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
	tempRenderer.removeAttribute("id");
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
		this.__maxCount = Math.max(0,this.__arrWrapper.length - this.__visibleRows);
		for(var count = 0; count < this.__listContainer.children.length; count++) 
		{
			this.__listContainer.children[count].originalOrder = count;
		}
	}
};

nsList.__renderList = function(value)
{
	var currentIndex = this.__currentIndex;
	if(value < 0)
	{
		value = 0;
	}
	else if(value > this.__maxCount)
	{
		value = this.__maxCount;
	}
	
	if(this.__currentIndex != value)
	{
		this.__currentIndex = value;
		currentIndex = value;
		var topOffset = 0;
		var minBottomRows = Math.min(this.__bottomHiddenRows,this.__maxCount - this.__currentIndex);
		var minTopRows = Math.min(this.__currentIndex,this.__topHiddenRows);
		topOffset = this.__listContainer.children[0].originalOrder;
		var rowsOnTop = (this.__currentIndex - topOffset % this.__availableRows) % this.__availableRows;
		var rowsOnBottom = this.__availableRows - this.__visibleRows - rowsOnTop;
		var toMove = 0;
		if(this.__currentIndex > currentIndex)
		{
			minTopRows--;
		}
		else if(this.__currentIndex < currentIndex)
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
		if(rowsOnTop < 0)
		{
			rowsOnTop = 0;
		}
		topOffset = Math.max(0,Math.floor(this.__currentIndex - rowsOnTop));
       	var start = Math.ceil(this.__currentIndex) - Math.ceil(rowsOnTop);
		if(start != this.__startArrayElement)
		{
			var end = start + this.__availableRows;
			if(start < 0)
			{
				start = 0;
			}
			
			if(end > this.__arrWrapper.length)
			{
				end = this.__arrWrapper.length;
			}
			var visibleData = this.__arrWrapper.slice(start, end);
			var listItem = null;
			var dataItem = null;
			for(var count = 0; count < visibleData.length; count++) 
			{
				if(this.__listContainer.children[count].data != visibleData[count].data) 
				{
					dataItem = visibleData[count].data;
					listItem = this.__listContainer.children[count];
					listItem.index = start + count;
					if(visibleData[count].selected)
					{
						//DONOT REPLACE WITH __markRowSelected
						this.util.addStyleClass(listItem,"selected"); 
					}
					else
					{
						//DONOT REPLACE WITH __markRowUnselected
						this.util.removeStyleClass(listItem,"selected");
					}
					this.__setDataInItem(listItem,dataItem);
				}
			}
			if(this.__listContainer.children.length > visibleData.length)
			{
				var childCount = this.__listContainer.children.length;
				var visibleCount = visibleData.length;
				for(var count = childCount - 1;count > visibleCount - 1;count--)
				{
					listItem = this.__listContainer.children[count];
					listItem.index = -1;
					if(this.util.isFunction(this.__clearDataCallBack))
		            {
		            	if(this.util.isString(this.__clearDataCallBack))
		            	{
		            		this.util.callFunctionFromString(this.__clearDataCallBack + "(listItem)",function(paramValue){
		        				if(paramValue === "listItem")
		        				{
		        					return listItem;
		        				}
		        				return paramValue;
		        			});
		            	}
		            	else
		            	{
		            		this.__clearDataCallBack(listItem);
		            	}
		            }
				}
			}
			this.__startArrayElement = start;
		}
		var listTop = this.__scrollOffset - ((this.__currentIndex - topOffset) * this.__listItemHeight);
		this.__listContainer.style.top = Math.max(0,listTop) + "px";
		
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
	var targetScrollTop = this.__outerContainer.scrollTop;
	var targetScrollLeft = this.__outerContainer.scrollLeft;
	if(this.__customScrollerRequired)
	{
		targetScrollTop = event.scrollTop;
		targetScrollLeft = event.scrollLeft;
	}
	if(targetScrollTop == this.__scrollOffset) 
	{
		return;
	}
	if(!this.__arrWrapper || !this.__arrWrapper.length) 
	{
		return;
	}
	this.__scrollOffset = Math.max(0,targetScrollTop);
	this.__scrollOffset = Math.min(this.__scrollOffset, this.__scrollHeight);
	
	
	this.__setChange(targetScrollLeft, this.__scrollOffset);
	this.__renderList(this.__currentIndex - this.__changeY / this.__listItemHeight, false);
	this.__setPosition(targetScrollLeft, this.__scrollOffset);
};

nsList.__setRendererProperties = function(listItem)
{
	if(listItem)
	{
		var compChild = null;
		for(var count = 0; count < listItem.children.length; count++) 
		{
			compChild = listItem.children[count];
			var list = this;
			Array.prototype.slice.call(compChild.attributes).forEach(function(attribute) 
			{
		        if(list.util.isFunction(attribute.value))
		        {
		        	var newValue = attribute.value + "(this)";
		        	compChild.removeAttribute(attribute.name);
					compChild.setAttribute(attribute.name,newValue);
		        }
			});
			if(compChild)
			{
				if(compChild.hasAttribute("accessor-name"))
				{
					listItem[compChild.getAttribute("accessor-name")] = compChild;
				}
			}
			this.__setRendererProperties(compChild);
		}
	}
};

nsList.__setRendererInData = function(listItem,item)
{
	if(listItem)
	{
		var compChild = null;
		for(var count = 0; count < listItem.children.length; count++) 
		{
			compChild = listItem.children[count];
			if(compChild)
			{
				compChild.data = item;
			}
			//IE 9 Bug,you got to assign it back
			//listItem.children[count] = compChild;
			this.__setRendererInData(compChild,item);
		}
	}
};

nsList.__addListenerForBody = function()
{
	if(this.__enableMultipleSelection)
	{
		this.util.addEvent(document.body,"keydown",this.__keyDownHandler.reference(this));
		this.util.addEvent(document.body,"keyup",this.__keyUpHandler.reference(this));
	}
	
};

nsList.__keyDownHandler = function(event)
{
	event = this.util.getEvent(event);
	var isShiftCtrlPressed = event.shiftKey || event.ctrlKey;
	var keyCode = this.util.getKeyUnicode(event);
	//key Up
	if(keyCode === 38 && isShiftCtrlPressed)
	{
		console.log("keyCode === 38 && isShiftCtrlPressed");
		if(this.__selectedIndex > 0)
		{
			this.__selectedIndex--;
			return this.__keyBoardNavigationHandler(event,"up");
		}
	}
	//key down
	else if(keyCode === 40 && isShiftCtrlPressed)
	{
		console.log("keyCode === 40 && isShiftCtrlPressed");
		if(this.__selectedIndex < this.__listContainer.children.length - 1)
		{
			this.__selectedIndex++;
			return this.__keyBoardNavigationHandler(event,"down");
		}
	}
	else if(keyCode === 38)
	{
		console.log("keyCode === 38");
		if(this.__selectedIndex > 0)
		{
			var row = this.__listContainer.children[this.__selectedIndex];
			this.util.removeStyleClass(row,"itemHover");
			console.log("before::" + this.__selectedIndex);
			this.__selectedIndex--;
			console.log("after::" + this.__selectedIndex + "," + Math.floor(this.__selectedIndex % this.__pageSize));
			row = this.__listContainer.children[this.__selectedIndex];
			this.util.addStyleClass(row,"itemHover");
			if(Math.floor(this.__selectedIndex % this.__pageSize) === 0)
			{
				this.setSelectedIndex(this.__selectedIndex,false);
			}
			event.preventDefault();
			return false;
		}
	}
	else if(keyCode === 40)
	{
		console.log("keyCode === 40");
		if(this.__selectedIndex < this.__listContainer.children.length - 1)
		{
			var row = this.__listContainer.children[this.__selectedIndex];
			this.util.removeStyleClass(row,"itemHover");
			console.log("before::" + this.__selectedIndex);
			this.__selectedIndex++;
			console.log("after::" + this.__selectedIndex + "," + Math.floor(this.__selectedIndex % this.__pageSize));
			row = this.__listContainer.children[this.__selectedIndex];
			this.util.addStyleClass(row,"itemHover");
			if(Math.floor(this.__selectedIndex % this.__pageSize) === 0)
			{
				this.setSelectedIndex(this.__selectedIndex,false);
			}
			event.preventDefault();
			return false;
		}
	}
	//unicode for shift key is 16
	else if(keyCode === 16)
	{
		this.util.addStyleClass(document.body,"nsUnselectable");
	}
};

nsList.__keyUpHandler = function(event)
{
	//unicode for shift key is 16
	if(this.util.getKeyUnicode(event) === 16)
	{
		this.util.removeStyleClass(document.body,"nsUnselectable");
	}
};

nsList.__keyBoardNavigationHandler = function(event,direction)
{
	var row = this.__listContainer.children[this.__selectedIndex];
	if(this.__isRowSelected(row))
	{
		this.__markRowUnselected(row);
	}
	else
	{
		this.__markRowSelected(row);
	}
	if(this.__selectedIndex > this.__pageSize)
	{
		this.setSelectedIndex(this.__selectedIndex - this.__pageSize,false);
	}
	event.preventDefault();
	return false;
};

nsList.propertyChange = function(attrName, oldVal, newVal, setProperty) 
{
	this.base.propertyChange(attrName, oldVal, newVal, setProperty);
};


document.registerElement("ns-list", {prototype: nsList});
