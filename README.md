var nsTextBox = Object.create(nsUIComponent);

nsTextBox.initializeComponent = function() 
{
	this.base.initializeComponent();
	this.ITEM_SELECTED = "itemSelected";
	this.ITEM_UNSELECTED = "itemUnselected";
	
	this.__outerContainer = null;
	this.__textBox = null;
	this.__list = null;
	this.__renderer =  null;
	this.__itemRenderer = null;
	
	this.__dataProvider = null;
	this.__enableAutoComplete = false;
	this.__matchStartsWith = false;
	this.__minChars = 1;
	this.__caseSensitive = true;
	this.__required = false;
	this.__placeholder = null;
	this.__delay = 150;
	this.__listWidth = -1;
	this.__maxListHeight = 300;
	this.__noRecordsFoundMessage = "No Records Found";
	
	this.__labelField = "label";
	this.__labelFunction = null;
	this.__templateID = null;
	this.__setDataCallBack = null;
	this.__clearDataCallBack = null;
	this.__enableKeyboardNavigation = false;
	this.__enableMultipleSelection = false;
	this.__customScrollerRequired = false;
	
	this.__selectedItem = null;
	this.__timerInstance = null;
	this.__componentMeasurement = {};
	
	this.__createComponents();
	this.__coreElement = this.__textBox;
};

nsTextBox.setComponentProperties = function() 
{
	if(this.hasAttribute("enableAutoComplete"))
	{
		this.__enableAutoComplete =  Boolean.parse(this.getAttribute("enableAutoComplete"));
	}
	if(this.hasAttribute("matchStartsWith"))
	{
		this.__matchStartsWith =  Boolean.parse(this.getAttribute("matchStartsWith"));
	}
	if(this.hasAttribute("minChars"))
	{
		this.__minChars =  parseInt(this.getAttribute("minChars"));
	}
	if(this.hasAttribute("caseSensitive"))
	{
		this.__caseSensitive = Boolean.parse(this.getAttribute("caseSensitive"));
	}
	if(this.hasAttribute("required"))
	{
		this.__required = Boolean.parse(this.getAttribute("required"));
	}
	if(this.hasAttribute("placeholder"))
	{
		this.__placeholder = this.getAttribute("placeholder");
	}
	if(this.hasAttribute("delay"))
	{
		this.__delay =  parseInt(this.getAttribute("delay"));
	}
	if(this.hasAttribute("maxListHeight"))
	{
		this.__maxListHeight =  parseInt(this.getAttribute("maxListHeight"));
	}
	if(this.hasAttribute("listWidth"))
	{
		this.__listWidth =  parseInt(this.getAttribute("listWidth"));
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
	if(this.hasAttribute("enableKeyboardNavigation"))
	{
		this.__enableKeyboardNavigation =  Boolean.parse(this.getAttribute("enableKeyboardNavigation"));
	}
	this.__setTextBoxProperty();
	this.base.setComponentProperties();
};

nsTextBox.propertyChange = function(attrName, oldVal, newVal, setProperty)
{
	var attributeName = attrName.toLowerCase();
	if(attributeName === "enableAutoComplete")
	{
		this.__enableAutoComplete =  Boolean.parse(this.getAttribute("enableAutoComplete"));
	}
	if(attributeName === "matchStartsWith")
	{
		this.__matchStartsWith =  Boolean.parse(this.getAttribute("matchStartsWith"));
	}
	if(attributeName === "minChars")
	{
		this.__minChars =  parseInt(this.getAttribute("minChars"));
	}
	if(attributeName === "caseSensitive")
	{
		this.__caseSensitive = Boolean.parse(this.getAttribute("caseSensitive"));
	}
	if(attributeName === "required")
	{
		this.__required = Boolean.parse(this.getAttribute("required"));
	}
	if(attributeName === "placeholder")
	{
		this.__placeholder = this.getAttribute("placeholder");
	}
	if(attributeName === "delay")
	{
		this.__delay =  parseInt(this.getAttribute("delay"));
	}
	if(attributeName === "maxListHeight")
	{
		this.__maxListHeight =  parseInt(this.getAttribute("maxListHeight"));
	}
	if(attributeName === "listWidth")
	{
		this.__listWidth =  parseInt(this.getAttribute("listWidth"));
	}
	if(attributeName === "labelField")
	{
		this.__labelField = this.getAttribute("labelField");
	}
	if(attributeName === "labelFunction")
	{
		this.__labelFunction = this.getAttribute("labelFunction");
	}
	if(attributeName === "enableMultipleSelection")
	{
		this.__enableMultipleSelection =  Boolean.parse(this.getAttribute("enableMultipleSelection"));
	}
	if(attributeName === "enableKeyboardNavigation")
	{
		this.__enableKeyboardNavigation =  Boolean.parse(this.getAttribute("enableKeyboardNavigation"));
	}
	this.__setTextBoxProperty();
};

nsTextBox.setDataProvider = function(dataProvider)
{
	this.__dataProvider = dataProvider;
	if(this.__enableAutoComplete && this.__dataProvider && this.__dataProvider.length > 0 && this.__isCreationCompleted)
	{
		this.__renderer = new this.defaultSearchRenderer();
		this.__itemRenderer = this.__renderer.getRenderer();
		var rect = this.getBoundingClientRect();
		this.__componentMeasurement.top = rect.top + this.__textBox.offsetHeight + 5;
		this.__componentMeasurement.left = rect.left;
		this.__componentMeasurement.width = this.__textBox.offsetWidth;
		this.util.addEvent(this.__textBox,"keyup",this.__keyUpHandler.reference(this));
	}
};

nsTextBox.__createComponents = function() 
{
	if(!this.__outerContainer)
	{
		this.__outerContainer = this.util.createDiv(this.getID() + "#container","nsTextBoxContainer");
		this.addChild(this.__outerContainer);
		this.__textBox = document.createElement("INPUT");
		this.__textBox.style.width = "100%";
		//this.util.addStyleClass(this.__textBox,"nsTextBox");
		this.__textBox.setAttribute("type", "text");
		this.__outerContainer.appendChild(this.__textBox);
	}
};

nsTextBox.__setTextBoxProperty = function() 
{
	if(this.__textBox)
	{
		if(this.__required)
		{
			this.__textBox.setAttribute("required", "");
		}
		else
		{
			this.__textBox.removeAttribute("required");   
		}
		if(this.__placeholder && this.__placeholder.length > 0)
		{
			this.__textBox.setAttribute("placeholder", this.__placeholder);
		}
		else
		{
			this.__textBox.removeAttribute("placeholder");
		}
	}
};

nsTextBox.__keyUpHandler = function(event)
{
	event = this.util.getEvent(event);
	var keyCode = this.util.getKeyUnicode(event);
	if (!(keyCode == this.util.KEYCODE.UP || keyCode == this.util.KEYCODE.DOWN || keyCode == this.util.KEYCODE.ENTER)) 
	{
		if(!this.__textBox.value || this.__textBox.value == "" || this.__textBox.value.length < this.__minChars)
		{
			this.__removeListControl();
		}
		else
		{
			if(this.__timerInstance)
			{
				clearTimeout(this.__timerInstance);
			}
			var compRef = this;
			this.__timerInstance = setTimeout(
			function()
			{ 
				compRef.__searchText(compRef.__textBox.value);
			},this.__delay);
		}
	}
	else
	{
		event.preventDefault();
	}
};

nsTextBox.__searchText = function(searchString)
{
	this.__removeListControl();
	this.__createListControl(searchString);
	var compRef = this;
	var dataSource = this.__dataProvider.filter(
	function (item)
	{
		var compareString = searchString;
		if(item)
		{
			if(compRef.__matchStartsWith)
			{
				return compRef.util.startsWith(item[compRef.__labelField],compareString,compRef.__caseSensitive);
			}
			else
			{
				return compRef.util.contains(item[compRef.__labelField],compareString,0,compRef.__caseSensitive);
			}
		}
		return false;
	});
	if(dataSource.length === 0)
	{
		var item = {};
		item[compRef.__labelField] = compRef.__noRecordsFoundMessage;
		dataSource[0] = item;
	}
	compRef.__list.setDataProvider(dataSource);
	var suggestedHeight = (dataSource.length * compRef.__list.__listItemHeight) + 5;
	suggestedHeight = (compRef.__maxListHeight > suggestedHeight) ? suggestedHeight:compRef.__maxListHeight;
	compRef.__list.style.height = suggestedHeight + "px";
};

nsTextBox.__createListControl = function(searchString)
{
	if(!this.__list)
	{
		this.__list = document.createElement("ns-List");
		this.util.addStyleClass(this.__list,"nsTextBoxList");
		this.__list.style.top = this.__componentMeasurement.top + "px";
		this.__list.style.left = this.__componentMeasurement.left + "px";
		if(this.__listWidth > 0)
		{
			this.__list.style.width =this.__listWidth + "px";
		}
		else
		{
			this.__list.style.width =this.__componentMeasurement.width + "px";
		}
		this.__list.style.height = this.__maxListHeight + "px";
		this.__list.setAttribute("labelField",this.__labelField);
		//this.__list.setAttribute("template",__itemRenderer);
		this.__list.__itemRenderer = this.__itemRenderer;
		//this.__list.setAttribute("setDataCallBack",__renderer.setData);
		this.__list.__setDataCallBack = this.__renderer.setData.bind(this.__renderer);
		//this.__list.setAttribute("clearDataCallBack",__renderer.clearData);
		this.__list.__clearDataCallBack = this.__renderer.clearData.bind(this.__renderer);
		this.__renderer.searchString = searchString;
		this.__list.setAttribute("resuableRenderRequired",false);
		this.__list.setAttribute("enableMultipleSelection",this.__enableMultipleSelection);
		this.__list.setAttribute("enableKeyboardNavigation",this.__enableKeyboardNavigation);
		this.__list.setAttribute("customScrollerRequired",this.__customScrollerRequired);
		this.util.addEvent(this.__list,this.__list.ITEM_SELECTED,this.__itemSelectHandler.reference(this));
		this.util.addEvent(this.__list,this.__list.ITEM_UNSELECTED,this.__itemUnSelectHandler.reference(this));
		this.__outerContainer.appendChild(this.__list);
	}
};

nsTextBox.__removeListControl = function()
{
	if(this.__list)
	{
		this.__outerContainer.removeChild(this.__list);
		this.__list = null;
	}
};

nsTextBox.__itemSelectHandler = function(event)
{
	if(event && event.detail)
	{
		this.__selectedItem = event.detail;
		this.__textBox.value = this.__selectedItem[this.__labelField];
		this.__removeListControl();
		this.util.dispatchEvent(this,this.ITEM_SELECTED,event.detail,{index:event.index});
	}
};

nsTextBox.__itemUnSelectHandler = function(event)
{
	console.log("Item Unselected with details::" + event.detail  + " with index " + event.index);
	this.util.dispatchEvent(this,this.ITEM_UNSELECTED,event.detail,{index:event.index});
}

nsTextBox.defaultSearchRenderer = function()
{
	this.searchString = null;
	this.util = new NSUtil();
	this.divItemRenderer = null;
	
	this.getRenderer = function()
	{
		if(!this.divItemRenderer)
		{
			this.__createComponents();
		}
		return this.divItemRenderer;
	};
	
	this.setData = function(renderer,item,labelField)
	{
		if(renderer)
		{
			if(item && item[labelField])
			{
				var txtDemo = document.querySelector("#txtDemo"); 
				this.searchString = txtDemo.value;
				var htmlText = item[labelField];
				if (this.searchString) 
				{
				      var words = '(' +
				      		this.searchString.split(/\ /).join(' |').split(/\(/).join('\\(').split(/\)/).join('\\)') + '|' +
				      		this.searchString.split(/\ /).join('|').split(/\(/).join('\\(').split(/\)/).join('\\)') +
				          ')',
				          exp = new RegExp(words, 'gi');
				      if (words.length) 
				      {
				    	  htmlText = htmlText.replace(exp, "<span class=\"highlight\">$1</span>");
				      }
				}
				renderer.rendererBody.rendererLabel.innerHTML = htmlText;
				//renderer.rendererBody.rendererLabel.appendChild(document.createTextNode(item[labelField]));
			}
			else
			{
				this.clearData(renderer);
			}
		}
		
	};
	
	this.clearData = function(renderer)
	{
		if(renderer)
		{
			renderer.rendererBody.rendererLabel.innerHTML = "";
		}
	};
	
	this.__createComponents = function()
	{
		this.divItemRenderer = this.util.createDiv(null,"imageHolder"); 
		this.divItemRenderer.style.height = 20 + "px";
		this.divItemRenderer.style.padding = 4 + "px";
		this.divItemRenderer.setAttribute("accessor-name","rendererBody"); 
		var lblItemRenderer = document.createElement("LABEL");
		lblItemRenderer.setAttribute("accessor-name","rendererLabel");
		this.divItemRenderer.appendChild(lblItemRenderer);
	};
};

document.registerElement("ns-textBox", {prototype: nsTextBox});
