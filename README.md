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
	this.__hasCallBackCalled = false;
	this.__initialise();
	
};

NSImport.prototype.onload = function (callback)
{
	this.__callback = callback;
	//__callback fired from here only when not fired from readImport
	if(this.__hasInitialized && this.__callback && !this.__hasCallBackCalled)
	{
		this.__hasCallBackCalled = true;
		this.__callback();
	}
};

NSImport.prototype.__initialise = function ()
{
	this.__dicPath = new Array();
	this.__dicPath["component.css"] = this.__baseCSSURL + "/component.css";
	//copied webcomponent.js as IE does not allow to download from cdn site 
	this.__dicPath["webComponent.js"] = this.__extJSURL + "/webcomponents.min.js";
	this.__dicPath["document-register-element.js"] = this.__extJSURL + "document-register-element.js";
	
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
	this.__dicPath["nsList.js"] = this.__baseJSURL + "/containers/nsList.js";
	
	this.NSMODAL_JS = this.__baseJSURL + "/containers/nsModal.js";
	this.NSMODAL_CSS = this.__baseCSSURL + "/nsModal.css";
	this.NSPROGRESSBAR_CSS = this.__baseCSSURL + "/nsProgressBar.css";
	this.NSGRIDCOLUMN_JS = this.__baseJSURL + "/containers/nsGridColumn.js";
	this.NSDATAGRID_CSS = this.__baseCSSURL + "/nsGrid.css";
	this.NSSCROLLER_JS = this.__baseJSURL + "/util/nsScroller.js";
	this.NSLIST_CSS = this.__baseCSSURL + "/nsList.css";
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
	var basicScriptLoadComplete = function(filePath)
	{
		nsimport.__baseScriptCount--;
		if(nsimport.__baseScriptCount === 0)
		{
			nsimport.loadBaseComponents();
		}
	};
	//if (!this.supportRegisterElement() && !this.supportShadowDOM() && !this.supportImportLink() && !this.supportTemplate())
	//{
		this.__baseScriptCount = 1;
		this.loadScript("webComponent.js",basicScriptLoadComplete);
	//}
	var flag = (this.__baseScriptCount === 0);
	if(flag)
	{
		this.loadBaseComponents();
	}
};

NSImport.prototype.supportRegisterElement = function()
{
	return "registerElement" in document;
};

NSImport.prototype.supportShadowDOM = function()
{
	return "createShadowRoot" in HTMLElement.prototype;
};

NSImport.prototype.supportImportLink = function()
{
	return "import" in document.createElement("link");
};

NSImport.prototype.supportTemplate = function()
{
	return "content" in document.createElement("template");
};


NSImport.prototype.loadBaseComponents = function ()
{
	var nsimport = this;
	nsimport.__baseFileCount = 5;
	var baseLoadComplete = function(filePath)
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
		var arrFiles = [];
		for(var count = 0;count < list.length;count++)
	    {
	         var fileName = list[count].getAttribute("file");
	         arrFiles.push(fileName);
	         this.getRelatedFiles(arrFiles,fileName);
	    }
		nsimport.__baseFileCount = arrFiles.length;
		var loadComplete = function(filePath)
		{
			nsimport.__baseFileCount--;
			if(nsimport.__baseFileCount === 0)
			{
				nsimport.__hasInitialized = true;
				if(nsimport.__callback && !nsimport.__hasCallBackCalled)
				{
					nsimport.__hasCallBackCalled = true;
					nsimport.__callback();
				}
			}			
		};
		for(var count = 0;count < arrFiles.length;count++)
	    {
	         var fileName = arrFiles[count];
	         this.loadScript(fileName,loadComplete);
	    }
	}
	else
	{
		this.__hasInitialized = true;
		if(this.__callback && !this.__hasCallBackCalled)
		{
			this.__hasCallBackCalled = true;
			this.__callback(event);
		}
	}
		
};

NSImport.prototype.getRelatedFiles = function(arrFiles,fileName)
{
	if(fileName === "nsProgressBar.js")
	{
		arrFiles.push(this.NSMODAL_JS);
		arrFiles.push(this.NSMODAL_CSS);
		arrFiles.push(this.NSPROGRESSBAR_CSS);
	}
	else if(fileName === "nsGrid.js")
	{
		arrFiles.push(this.NSDATAGRID_CSS);
		arrFiles.push(this.NSGRIDCOLUMN_JS);
		arrFiles.push(this.NSSCROLLER_JS);
	}
	else if(fileName === "nsList.js")
	{
		arrFiles.push(this.NSLIST_CSS);
		arrFiles.push(this.NSSCROLLER_JS);
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
            /*script.onreadystatechange= function ()
            {
                if (this.readyState == "complete")
                {
                    callback();
                }
            };*/
            script.onload = function()
            {
            	callback(filePath);
            }; 
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
            /*cssFile.onreadystatechange= function ()
            {
                if (this.readyState == "complete")
                {
                    callback();
                }
            };*/
            cssFile.onload = function()
            {
            	callback(filePath);
            };
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
