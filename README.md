//dashBoard.js
function DashBoard(parentID,dataSource) 
{
	this.portletMouseOverHandler = null;
	this.portletMouseOutHandler = null;
	this.navigationHandler = null;
	
	this.__parentID = parentID;
	this.__dataSource = dataSource;
	this.__parent = null;
	this.__outerContainer = null;
	this.__footerTitle = "View Details";
	this.__objSubMenuSource = [];
	this.__objFooterSource = [];
	
	/*CSS Class Names*/
	this.__containerClass = "row";
	this.__panelParentContainerClass = "col-sm-4";
	this.__panelContainerClass = "panel panel-default";
	this.__panelHeaderClass = "panel-heading";
	this.__panelTitleClass = "fa fa-comments fa-fw";
	this.__dropDownParentContainerClass = "btn-group pull-right";
	this.__dropDownButtonClass = "btn btn-default btn-xs dropdown-toggle";
	this.__dropDownSeparatorClass = "divider";
	this.__dropDownButtonIconClass = "fa fa-chevron-down";
	this.__dropDownOptionsContainerClass = "dropdown-menu slidedown";
	this.__dropDownOptionsClass = "fa fa-fw";
	
	this.__panelBodyClass = "panel-body";
	
	this.__panelFooterClass = "panel-footer";
	this.__panelFooterTitleClass = "pull-left";
	this.__panelFooterArrowContainerClass = "pull-right";
	this.__panelFooterArrowClass = "fa fa-arrow-circle-right";
	this.__panelFooterClearClass = "clearfix";
	/*End of CSS Class Names*/
	
	this.initialize();
}

DashBoard.prototype.initialize = function () 
{
	 this.__parent = getElement(this.__parentID);
	 if(this.__parent)
	 {
		 this.__outerContainer = createDiv(this.__parentID + "#container",this.__containerClass);
		 this.createPanels();
		 this.__parent.appendChild(this.__outerContainer);
	 }
	 else
	 {
		 throw "Parent for NomuraMenu is not defined or does not exist";
	 }
	
};

DashBoard.prototype.createPanels = function () 
{
	if(this.__dataSource)
	{
		var menuLength = this.__dataSource.length;
		for(var count =  0 ; count < menuLength ; count++)
		{
			var item =  this.__dataSource[count];
			if(item)
			{
				var panelParentID = this.__parentID + "#panelParent" + count;
				var divPanelParentContainer = createDiv(panelParentID,this.__panelParentContainerClass);
				this.__outerContainer.appendChild(divPanelParentContainer);
				var panelID = this.__parentID + "#panel" + count;
				var divPanelContainer = createDiv(panelID,this.__panelContainerClass);
				divPanelParentContainer.appendChild(divPanelContainer);
				var title = item["title"];
				var arrSubmenus = item["subNav"];
				var templateID =  item["templateID"];
				var menuCount =  item["menuCount"];
				if(menuCount > -1)
				{
					divPanelContainer.setAttribute("menuCount",menuCount);
				}
				var divHeader = this.createPanelHeader(panelID,count,title,arrSubmenus,menuCount);
				if(divHeader)
				{
					divPanelContainer.appendChild(divHeader);
				}
				var divBody = this.createPanelBody(panelID,count,templateID);
				if(divBody)
				{
					divPanelContainer.appendChild(divBody);
				}
				var compFooter = this.createPanelFooter(panelID,count,item);
				if(compFooter)
				{
					divPanelContainer.appendChild(compFooter);
				}
				divPanelContainer.onmouseover = this.panelItemOverHandler.bind(this);
				divPanelContainer.onmouseout = this.panelItemOutHandler.bind(this);
			}
		}
	}
};

DashBoard.prototype.createPanelHeader = function (panelID,count,title,menuProvider,menuCount) 
{
	var headerID = panelID + "#header" + count;
	var divHeader = createDiv(headerID,this.__panelHeaderClass);
	if(title)
	{
		var compTitle = document.createElement("i");
		addStyleClass(compTitle,this.__panelTitleClass);
		divHeader.appendChild(compTitle);
		var compTitleContent = document.createTextNode(title);
		divHeader.appendChild(compTitleContent);
	}
	if(menuProvider && menuProvider.length > 0)
	{
		var divDropDownParent = createDiv(null,this.__dropDownParentContainerClass);
		divHeader.appendChild(divDropDownParent);
		var btnDropDown = document.createElement("BUTTON");
		addStyleClass(btnDropDown,this.__dropDownButtonClass);
		btnDropDown.setAttribute("type","button");
		btnDropDown.setAttribute("data-toggle","dropdown");
		btnDropDown.setAttribute("aria-expanded",false);
		
		var compDropDownButtonIcon = document.createElement("i");
		addStyleClass(compDropDownButtonIcon,this.__dropDownButtonIconClass);
		btnDropDown.appendChild(compDropDownButtonIcon);
		divDropDownParent.appendChild(btnDropDown);
		
		var compDropDownContainer = document.createElement("ul");
		addStyleClass(compDropDownContainer,this.__dropDownOptionsContainerClass);
		divDropDownParent.appendChild(compDropDownContainer);
		var menuProviderLength = menuProvider.length;
		for(var innerCount = 0;innerCount < menuProviderLength;innerCount++)
		{
			var item = menuProvider[innerCount];
			if(item)
			{
				if(innerCount > 0 && item["beforeSeparator"])
				{
					var menuItem = document.createElement("li");
					addStyleClass(menuItem,this.__dropDownSeparatorClass);
		            compDropDownContainer.appendChild(menuItem);
				}
				item.menuCount = menuCount;
				var subMenuID = panelID + "#subMenu" + count + "##" + innerCount;
				this.__objSubMenuSource[subMenuID] = item;
				var anchor = document.createElement("a");
				anchor.setAttribute("id",subMenuID);
				anchor.setAttribute("href","#");
				anchor.setAttribute("source",item.source);
				var compIcon = document.createElement("i");
				addStyleClass(compIcon,this.__dropDownOptionsClass);
				anchor.appendChild(compIcon);
				var compSubMenuTitle = document.createTextNode(item.menuName);
				anchor.appendChild(compSubMenuTitle);
				anchor.onclick = this.subMenuClickHandler.bind(this);
			    
				
				var menuItem = document.createElement("li");
	            menuItem.appendChild(anchor);
	            compDropDownContainer.appendChild(menuItem);
			}
		}
	}
	
	return divHeader;
};

DashBoard.prototype.createPanelBody = function (panelID,count,templateID) 
{
	var bodyID = panelID + "#body" + count;
	var divBody = createDiv(bodyID,this.__panelBodyClass);
	if(templateID)
	{
		if(supportsTemplate())
		{
			var template = document.querySelector(templateID);
			if(template)
			{
				var templateClone = document.importNode(template.content, true);
				divBody.appendChild(templateClone);
			}
		}
		else
		{
			var template = document.querySelector(templateID);
			if(template)
			{
				var compBodySpan = document.createElement("span");
				compBodySpan.innerHTML = template.innerHTML;
				divBody.appendChild(compBodySpan);
				template.style.display = "none";
				//template.parentNode.removeChild(template);
			}
		}
	}
	
	return divBody;
};

DashBoard.prototype.createPanelFooter = function (panelID,count,item) 
{	
	var footerID = panelID + "#footer" + count;
	this.__objFooterSource[footerID] = item;
	var anchor = document.createElement("a");
	anchor.setAttribute("href","#");
	var divFooter = createDiv(footerID,this.__panelFooterClass);
	anchor.appendChild(divFooter);
	var compFooterTitle = document.createElement("span");
	addStyleClass(compFooterTitle,this.__panelFooterTitleClass);
	var compFooterText = document.createTextNode(this.__footerTitle);
	compFooterTitle.appendChild(compFooterText);
	compFooterTitle.onclick = this.footerClickHandler.bind(this); 
	divFooter.appendChild(compFooterTitle);
	var compFooterArrowContainer = document.createElement("span");
	addStyleClass(compFooterArrowContainer,this.__panelFooterArrowContainerClass);
	var compArrow = document.createElement("i");
	addStyleClass(compArrow,this.__panelFooterArrowClass);
	compFooterArrowContainer.appendChild(compArrow);
	compFooterArrowContainer.onclick = this.footerClickHandler.bind(this); 
	divFooter.appendChild(compFooterArrowContainer);
	var divClear = createDiv(footerID,this.__panelFooterClearClass);
	divFooter.appendChild(divClear);
	
	return anchor;
};

DashBoard.prototype.panelItemOverHandler = function (event) 
{
	if(this.portletMouseOverHandler)
	{
		var panel = getTarget(event);
	    while(panel && !hasStyleClass(panel,this.__panelContainerClass))
	    {
	    	panel = panel.parentNode;
	    }
		if(panel && panel.hasAttribute("menuCount"))
		{
			var menuCount = parseInt(panel.getAttribute("menuCount"));
			this.portletMouseOverHandler(event,menuCount);
		}
	}
};

DashBoard.prototype.panelItemOutHandler = function (event) 
{
	if(this.portletMouseOutHandler)
	{
		var panel = getTarget(event);
	    while(panel && !hasStyleClass(panel,this.__panelContainerClass))
	    {
	    	panel = panel.parentNode;
	    }
		if(panel && panel.hasAttribute("menuCount"))
		{
			var menuCount = parseInt(panel.getAttribute("menuCount"));
			this.portletMouseOutHandler(event,menuCount);
		}
	}
};

DashBoard.prototype.subMenuClickHandler = function (event) 
{
	if(this.navigationHandler)
	{
		var subMenu = getTarget(event);
	    while(subMenu && !getParentByType(subMenu,"A"))
	    {
	    	subMenu = subMenu.parentNode;
	    }
		if(subMenu)
		{
			var item = this.__objSubMenuSource[subMenu.id];
			this.navigationHandler(event,item);
		}
	}
};

DashBoard.prototype.footerClickHandler = function (event) 
{
	if(this.navigationHandler)
	{
		var compFooter = getTarget(event);
	    while(compFooter && !hasStyleClass(compFooter,this.__panelFooterClass))
	    {
	    	compFooter = compFooter.parentNode;
	    }
		if(compFooter)
		{
			var item = this.__objFooterSource[compFooter.id];
			this.navigationHandler(event,item);
		}
	}
};


function createDiv(id,styleClass)
{
	var div = document.createElement("div");
	if(id)
	{
		div.setAttribute("id",id);
	}
	if(styleClass)
	{
		addStyleClass(div,styleClass);
	}
	
	return div;
}

function supportsTemplate() 
{
    return ("content" in document.createElement('template'));
}

