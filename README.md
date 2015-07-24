function NSImport()
{
	this.__extJSURL = "lib/com/ext";
	this.__baseJSURL = "lib/com/org";
	this.__baseCSSURL = "lib/css/com/org";
	this.__dicPath = null;
	this.__baseScriptCount = 0;
	this.__baseFileCount = 0;
	this.__callback = null;
	this.__hasInitialized = false; 
	this.__initialise();
	
};

NSImport.prototype.onload = function (callback)
{
	this.__callback = callback;
	//__callback fired from here only when not fired from readImport
	if(this.__hasInitialized && this.__callback)
	{
		this.__callback();
	}
};

NSImport.prototype.__initialise = function ()
{
	this.__dicPath = new Array();
	this.__dicPath["component.css"] = this.__baseCSSURL + "/component.css";
	//copied webcomponent.js as IE does not allow to download from cdn site 
	this.__dicPath["webComponent.js"] = this.__extJSURL + "/webcomponents.min.js";
	this.__dicPath["nsUtil.js"] = this.__baseJSURL + "/util/nsUtil.js";
	this.__dicPath["nsTip.js"] = this.__baseJSURL + "/util/nsTip.js";
	this.__dicPath["nsUIComponent.js"] = this.__baseJSURL + "/base/nsUIComponent.js";
	this.__dicPath["nsContainerBase.js"] = this.__baseJSURL + "/base/nsContainerBase.js";
	this.__dicPath["nsCheckBox.js"] = this.__baseJSURL + "/components/nsCheckBox.js";
	this.__dicPath["nsGroup.js"] = this.__baseJSURL + "/containers/nsGroup.js";
	this.__dicPath["nsDividerBox.js"] = this.__baseJSURL + "/containers/nsDividerBox.js";
	this.__dicPath["nsBanner.js"] = this.__baseJSURL + "/containers/nsBanner.js";
	this.__dicPath["nsProgressBar.js"] = this.__baseJSURL + "/containers/nsProgressBar.js";
	this.__dicPath["nsGrid.js"] = this.__baseJSURL + "/containers/nsGrid.js";
	
	this.NSMODAL_JS = this.__baseJSURL + "/containers/nsModal.js";
	this.NSMODAL_CSS = this.__baseCSSURL + "/nsModal.css";
	this.NSPROGRESSBAR_CSS = this.__baseCSSURL + "/nsProgressBar.css";
	this.NSGRIDCOLUMN_JS = this.__baseJSURL + "/containers/nsGridColumn.js";
	this.NSDATAGRID_CSS = this.__baseCSSURL + "/nsGrid.css";
};

NSImport.prototype.__initialiseImport = function ()
{
	var loadFunction = function()
	{
		this.loadBasicScripts();
	};
	
	if (document.addEventListener) 
	{ 
	    document.addEventListener("DOMContentLoaded", loadFunction.bind(this), false);
	} 
	else if (window.addEventListener) 
	{
	    window.addEventListener("load", loadFunction.bind(this), false);
	} 
	else if (document.attachEvent) 
	{
	    window.attachEvent("onload", loadFunction.bind(this));
	}
	else // very old browser, copy old onload
	{
		window.onload = function() 
		{ 
			loadFunction().bind(this);
		};
	}
};

NSImport.prototype.loadBasicScripts = function ()
{
	var nsimport = this;
	nsimport.__baseScriptCount = 1;
	var basicScriptLoadComplete = function()
	{
		nsimport.__baseScriptCount--;
		if(nsimport.__baseScriptCount === 0)
		{
			nsimport.loadBaseComponents();
		}
	};
	this.loadScript("webComponent.js",basicScriptLoadComplete);
};

NSImport.prototype.loadBaseComponents = function ()
{
	var nsimport = this;
	nsimport.__baseFileCount = 5;
	var baseLoadComplete = function()
	{
		nsimport.__baseFileCount--;
		if(nsimport.__baseFileCount === 0)
		{
			nsimport.readImport();
		}
	};
	this.loadScript("component.css",baseLoadComplete);
	this.loadScript("nsUtil.js",baseLoadComplete);
	this.loadScript("nsTip.js",baseLoadComplete);
	this.loadScript("nsUIComponent.js",baseLoadComplete);
	this.loadScript("nsContainerBase.js",baseLoadComplete);
};

NSImport.prototype.readImport = function ()
{
	var list = document.getElementsByTagName("nsimport");
	if(list && list.length > 0)
	{
		var nsimport = this;
		nsimport.__baseFileCount = list.length;
		var loadComplete = function()
		{
			nsimport.__baseFileCount--;
			if(nsimport.__baseFileCount === 0)
			{
				nsimport.__hasInitialized = true;
				if(nsimport.__callback)
				{
					nsimport.__callback();
				}
			}			
		};
		for(var count = 0;count < list.length;count++)
	    {
	         var fileName = list[count].getAttribute("file");
	         this.loadRelatedFiles(fileName,loadComplete);
	         this.loadScript(fileName,loadComplete);
	    }
	}
	else
	{
		this.__hasInitialized = true;
		if(this.__callback)
		{
			this.__callback(event);
		}
	}
		
};

NSImport.prototype.loadRelatedFiles = function(fileName,loadComplete)
{
	if(fileName === "nsProgressBar.js")
	{
		this.loadScript(this.NSMODAL_JS,loadComplete);
		this.loadScript(this.NSMODAL_CSS,loadComplete);
		this.loadScript(this.NSPROGRESSBAR_CSS,loadComplete);
		this.__baseFileCount += 3;
	}
	else if(fileName === "nsGrid.js")
	{
		this.loadScript(this.NSDATAGRID_CSS,loadComplete);
		this.loadScript(this.NSGRIDCOLUMN_JS,loadComplete);
		this.__baseFileCount += 2;
	}
};

NSImport.prototype.loadScript = function (fileName,callback)
{
	if(fileName)
    {
	   	var filePath = null;
	   	var fileType = null;
	   	if(fileName.indexOf("/") > 0)
	   	{
	   		filePath =  fileName;
	   	}
	   	else
	   	{
	   		 filePath = this.__dicPath[fileName];
	   	}
	   	if(filePath)
		{
			if (document.getElementById(filePath) == null) 
			{
				if(filePath.indexOf(".") > 0)
				{
					fileType = filePath.substring(filePath.lastIndexOf(".") + 1,filePath.length);
					if(fileType === "js")
					{
						this.includeJavaScriptFile(filePath,callback,"body");
					}
					else if(fileType === "css")
					{
						this.includeCssFile(filePath,callback);
					}
				}
			}
			else if(callback)
			{
				
				callback();
			}
		}
    }
	
};

//Position can be "head" or "body"
NSImport.prototype.includeJavaScriptFile = function (filePath,callback,position)
{
    if(filePath)
    {
        if(!position)
        {
            position = "body";
        }
        var domPosition = document.getElementsByTagName(position)[0];
        var script = document.createElement("script");
        script.setAttribute("id", filePath);
        script.setAttribute("type","text/javascript");
        script.setAttribute("src",filePath);
        if(callback)
        {
            script.onreadystatechange= function ()
            {
                if (this.readyState == "complete")
                {
                    callback();
                }
            };
            script.onload = callback;
        }
        domPosition.appendChild(script);
    }
};

NSImport.prototype.includeCssFile = function (filePath,callback)
{
    if(filePath)
    {
        var domPosition = document.getElementsByTagName("head")[0];
        var cssFile = document.createElement("link");
        cssFile.setAttribute("id", filePath);
        cssFile.setAttribute("rel", "stylesheet");
        cssFile.setAttribute("type", "text/css");
        cssFile.setAttribute("href", filePath);
        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        if(callback)
        {
            cssFile.onreadystatechange= function ()
            {
                if (this.readyState == "complete")
                {
                    callback();
                }
            };
            cssFile.onload = callback;
        }
        domPosition.appendChild(cssFile);
    }
};

if (!Function.prototype.bind) 
{
	Function.prototype.bind = function (oThis) 
	{
	    if (typeof this !== "function") 
	    {
	      // closest thing possible to the ECMAScript 5 internal IsCallable function
	      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	    }

	    var aArgs = Array.prototype.slice.call(arguments, 1),
	        fToBind = this,
	        fNOP = function () {},
	        fBound = function () {
	          return fToBind.apply(this instanceof fNOP && oThis
	                                 ? this
	                                 : oThis,
	                               aArgs.concat(Array.prototype.slice.call(arguments)));
	        };

	    fNOP.prototype = this.prototype;
	    fBound.prototype = new fNOP();

	    return fBound;
	};
}

var ns = new NSImport();
ns.__initialiseImport();
---------------------------------------------------------------------------------------------------------------------------------

var nsContainerBase = Object.create(HTMLDivElement.prototype);

nsContainerBase.INITIALIZE = "initialize";
nsContainerBase.CREATION_COMPLETE = "creationComplete";
nsContainerBase.PROPERTY_CHANGE = "propertyChange";
nsContainerBase.REMOVE = "remove";

/*start of private variables */
nsContainerBase.base = null;
nsContainerBase.__setProperty = true; 
nsContainerBase.__id = null;
nsContainerBase.__shadow = null;
/*end of private variables */

/*start of functions */
nsContainerBase.__setBase = function() 
{
	if(this.__proto__ && this.__proto__.__proto__)
	{
		this.base = this.__proto__.__proto__;
	}
};

nsContainerBase.__setID = function()
{
	if(this.hasAttribute("id"))
	{
		this.__id = this.getAttribute("id");
	}
	else if(this.hasAttribute("name"))
	{
		this.__id = this.getAttribute("name");
	}
	else
	{
		this.__id = "comp" + this.util.getUniqueId();
	}
};

nsContainerBase.createdCallback = function() 
{
	console.log("In Parent createdCallback");
	this.util = new NSUtil();
	this.__setBase();
	this.__setID();
	this.initializeComponent();
	this.dispatchCustomEvent(this.INITIALIZE);
};
nsContainerBase.attachedCallback = function()
{
	console.log("In attachedCallback");
	this.setComponentProperties();
	this.dispatchCustomEvent(this.CREATION_COMPLETE);
};
nsContainerBase.attributeChangedCallback = function(attrName, oldVal, newVal)
{
	console.log("attrName::" + attrName + " oldVal::" + oldVal + " newVal::" + newVal);
	var data = {};
	data.propertyName = attrName;
	data.oldValue = oldVal;
	data.newValue = newVal;
	this.dispatchCustomEvent(this.PROPERTY_CHANGE,data);
	this.propertyChange(attrName, oldVal, newVal, this.__setProperty);
	this.__setProperty = true;
};
nsContainerBase.detachedCallback = function()
{
	console.log("In detachedCallback");
	this.dispatchCustomEvent(this.REMOVE);
};

nsContainerBase.initializeComponent = function() 
{
	console.log("In Parent initializeComponent");
};
nsContainerBase.setComponentProperties = function() 
{
	console.log("In Parent setComponentProperties");
};
nsContainerBase.propertyChange = function(attrName, oldVal, newVal, setProperty) 
{
	console.log("In Parent setComponentProperties");
};

nsContainerBase.getID = function() 
{
	return this.__id;
};

nsContainerBase.addChild = function(element)
{
	if(element)
	{
		if(document.head.createShadowRoot) 
		{
		    if(!this.__shadow)
		    {
		    	this.__shadow = new WebKitShadowRoot(this);
		    	//this.__shadow = this.createShadowRoot();
		    	//this.__shadow.applyAuthorStyles  = true;
		    }
		    this.__shadow.appendChild(element);
		} 
		else 
		{
		    this.appendChild(element);
		}
	}
};

nsContainerBase.getElement = function(elementId)
{
	if(this.__shadow) 
	{
		if(elementId && elementId.length > 0)
		{
			return this.__shadow.getElementById(elementId);
		}
	} 
    return this.util.getElement(elementId);
};

nsContainerBase.dispatchCustomEvent = function(eventType,data,bubbles,cancelable) 
{
	console.log("In Parent dispatchCustomEvent");
	if(this.util.isUndefined(data))
	{
		data = null;
	}
	if(typeof bubbles == "undefined")
	{
		bubbles = true;
	}
	if(typeof cancelable == "undefined")
	{
		cancelable = true;
	}
	var event = new CustomEvent(eventType, 
	{
		detail: data,
		bubbles: bubbles,
		cancelable: cancelable
	});
	if (this.hasAttribute(eventType)) 
	{
		var attributeValue = this.getAttribute(eventType);
		if(attributeValue)
		{
			this.util.callFunctionFromString(attributeValue,function(paramValue){
				if(paramValue === 'true' || paramValue === 'false')
				{
					return Boolean.parse(paramValue);
				}
				else if(paramValue === 'this')
				{
					return this;
				}
				else if(paramValue === 'event')
				{
					return event;
				}
				return paramValue;
			});
		}
	}
	this.dispatchEvent(event);
};
/*end of functions */

document.registerElement('ns-containerbase', {prototype: nsContainerBase});
