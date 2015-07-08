NSUtil.prototype.addEvent = function(element, eventType, listener)
{
	 var retValue = false;
	 if (element.addEventListener)
	 {
		 element.addEventListener(eventType, listener);
		 retValue = true;
	 } 
	 else if (element.attachEvent)
	 {
	    retValue = element.attachEvent("on" + eventType, listener);
	 } 
	 else 
	 {
	    console.log("Handler could not be attached");
	    retValue = false;
	 }
	 
	 return retValue;
};

NSUtil.prototype.removeEvent = function(element, eventType, listener)
{
	 var retValue = false;
	 if (element.removeEventListener)
	 {
		 element.removeEventListener(eventType, listener);
		 retValue = true;
	 } 
	 else if (element.detachEvent)
	 {
	    retValue = element.detachEvent("on" + eventType, listener);
	 } 
	 else 
	 {
	    console.log("Handler could not be attached");
	    retValue = false;
	 }
	 
	 return retValue;
};

-----------------------------------------------------------------------------------------------------------------------------

var nsBanner = Object.create(nsContainerBase);

nsBanner.initializeComponent = function() 
{
	this.base.initializeComponent();
	this.INFO_TITLE = "info";
	this.WARNING_TITLE = "warning";
	this.ERROR_TITLE = "error";
	
	this.__arrOpenDiv = new Array();
};

nsBanner.setComponentProperties = function() 
{
	this.util.addEvent(window,"scroll",this.__scrollHandler);
	
	this.base.setComponentProperties();
};

nsBanner.propertyChange = function(attrName, oldVal, newVal, setProperty) 
{
	this.base.propertyChange(attrName, oldVal, newVal, setProperty);
};

nsBanner.showInfo = function(message)
{
	this.__createDialog(this.INFO_TITLE,"nsInfoBanner",message);
};

nsBanner.showWarning = function(message)
{
	this.__createDialog(this.WARNING_TITLE,"nsWarningBanner",message);
};

nsBanner.showError = function(message)
{
	this.__createDialog(this.ERROR_TITLE,"nsErrorBanner",message);
};

nsBanner.__createDialog = function(bannerType,styleClass,message) 
{
	var id = this.__getBannerId(bannerType);
	var divBanner=document.getElementById(id);
    if(!divBanner)
    {
       divBanner=document.createElement("div");
       divBanner.id = id;
       document.body.insertBefore(divBanner,document.body.childNodes[0]);
    }
    if(styleClass && styleClass.length > 0)
    {
       divBanner.className=styleClass;
    }   
    divBanner.style.width = "100%";
    divBanner.innerHTML = message;
    //since innerHTML has been overridden hence we need to the button again(every time)
    var btnClose = this.__createBannerCloseButton();
    divBanner.appendChild(btnClose);
    
	this.__updateOpenBanner(id,"insert");
    return divBanner;
};

nsBanner.__createBannerCloseButton = function()
{
    var btnClose = document.createElement("a");
    btnClose.setAttribute("href","javascript:void(0)");
    btnClose.className = "nsCloseBannerButton";
    btnClose.onmouseover = function() { this.className = "nsCloseBannerButton_hover"; };
    btnClose.onmouseout = function() { this.className = "nsCloseBannerButton"; };
    btnClose.style.textDecoration="none";
    if(this.util.isBrowserIE())
    {
        btnClose.style.styleFloat = "right";
    }
    else
    {
        btnClose.style.cssFloat = "right";
    }
    btnClose.style.clear = "both";
    btnClose.style.paddingRight = "10px";
    btnClose.innerHTML = "X";
    btnClose.onclick = this.__closeBanner.bind(this);
    return btnClose;
};

//operation value can be "insert","remove"
nsBanner.__updateOpenBanner = function(id,operation)
{
	if(!this.__arrOpenDiv)
	{
		this.__arrOpenDiv = new Array();
	}
	if(operation === "insert" && this.__arrOpenDiv.indexOf(id) === -1)
	{
		this.__arrOpenDiv.splice(0,0,id);
	}
	else if(operation === "remove" && this.__arrOpenDiv.indexOf(id) > -1)
	{
		this.__arrOpenDiv.splice(this.__arrOpenDiv.indexOf(id),1);
	}
};

nsBanner.__closeBanner = function(event)
{
    var target = this.util.getTarget(event);
    if(target && target.parentNode)
    {
		var divBannerId = target.parentNode.id;
		this.util.removeDiv(divBannerId);
        this.util.__updateOpenBanner(divBannerId,"remove");
    }
};

nsBanner.__scrollHandler = function(event)
{  
   this.__positionBanner(document.getElementById(this.__getBannerId(this.INFO_TITLE)),"nsFixedElement");
   this.__positionBanner(document.getElementById(this.__getBannerId(this.WARNING_TITLE )),"nsFixedElement");
   this.__positionBanner(document.getElementById(this.__getBannerId(this.ERROR_TITLE)),"nsFixedElement");
   
   for(var count = 0; count < this.__arrOpenDiv.length ;count++)
   {
		var divBanner = document.getElementById(this__arrOpenDiv[count]);
		divBanner.style.top = ((count * divBanner.offsetHeight)) + "px";
   }
};

nsBanner.__positionBanner = function(divBanner,styleName)
{
   if(divBanner)
   {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop > divBanner.offsetHeight)
        {
        	this.util.addStyleClass(divBanner,styleName);
        }
        else
        {
        	this.util.removeStyleClass(divBanner,styleName);
        }
   }
};

//bannerType can be "info","warning","error"
nsBanner.__getBannerId = function(bannerType) 
{
	return (this.getID() + bannerType);
};



document.registerElement("ns-banner", {prototype: nsBanner});



