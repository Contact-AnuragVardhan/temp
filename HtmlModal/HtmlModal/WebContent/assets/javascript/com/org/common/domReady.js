//from http://javascript.info/tutorial/onload-ondomcontentloaded
var hasDomLoaded = false;
detectDomLoad();

function detectDomLoad()
{
	if (document.addEventListener) 
	{ 
		// native event
		document.addEventListener("DOMContentLoaded", domLoadHandler, false);
	} 
	else if(document.attachEvent) 
	{  
		var isFrame = false;
		// IE
		try 
		{
			isFrame = (window.frameElement != null);
		} 
		catch(e) 
		{
		}
		// IE, the document is not inside a frame
		//The document is being scrolled using document.documentElement.doScroll call. The browser throws exception until the DOM is complete. So //basically the scoll is called every 10 ms or so until no exception is thrown. Then the DOM ready handler is activated.
		if (document.documentElement.doScroll && !isFrame) 
		{	
			ieNotIframeDomHandler();
		}
		// IE, the document is inside a frame
		document.attachEvent("onreadystatechange", ieInIframeDomHandler);
	}
	// Old browsers && a fallback to window.onload in case above solutions does not work
    if (window.addEventListener)
    {
        window.addEventListener("load", domLoadHandler, false);
    }
    else if (window.attachEvent)
    {
        window.attachEvent("onload", domLoadHandler);
    }
    else 
    {
		var orignalPageLoadHandler = window.onload; // very old browser, copy old onload
		window.onload = function() 
		{ 
			// replace by new onload and call the old one
			domLoadHandler();
			isFunction(orignalPageLoadHandler) && orignalPageLoadHandler();
		};
    }
}

function ieNotIframeDomHandler()
{
	if (hasDomLoaded)
	{
		 return;
	}
	try 
	{
		document.documentElement.doScroll("left");
		domLoadHandler();
	} 
	catch(e) 
	{
		setTimeout(ieNotIframeDomHandler, 10);
	}
}

function ieInIframeDomHandler()
{
	if(document.readyState === "complete") 
	{
		domLoadHandler();
	}
}

function domLoadHandler() 
{ 
	if (hasDomLoaded) 
	{
		return;
	}
	hasDomLoaded = true;
	if (document.removeEventListener) 
	{ 
		// native event
		document.removeEventListener("DOMContentLoaded", domLoadHandler, false);
		window.removeEventListener("load", domLoadHandler, false);
	} 
	else if (document.detachEvent)
    {
		document.detachEvent("onreadystatechange", ieInIframeDomHandler);
        window.detachEvent("onload",domLoadHandler);
    }
	callFunction("apiReadyHandler");
}