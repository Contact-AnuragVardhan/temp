function Event () 
{
	this.eventName = null;
	this.callback = null;
	this.addListener = addEventListener;
	this.dispatch = dispatchEvent;
	this.removeListener = removeEventListener;
}

function addEventListener(eventName, callback, useCapture) 
{
	this.eventName = eventName;
	this.callback = callback;
	if(isUndefined(useCapture))
	{
		useCapture =  false;
	}
    if(document.addEventListener) // all browsers except IE before version 9
	{
        document.addEventListener(eventName, callback, useCapture);
    }
	else if(document.documentElement.attachEvent)
	{    
        //document.documentElement.attachEvent("onpropertychange", propertyChangeHandler);
		document.documentElement.attachEvent("onpropertychange", function(event)
		{
			if(event.propertyName == eventName) 
			{
		         callback();
		    }   
		});
    }
}

function dispatchEvent(eventName) 
{
    if(document.createEvent) 
	{
        var event = document.createEvent("Event");
        event.initEvent(eventName, true, true);
        document.dispatchEvent(event);
    } 
	else 
	{
        eval("document.documentElement." + eventName + "++");
    }
}

function removeEventListener(eventName, callback, useCapture)
{
	if(isUndefined(useCapture))
	{
		useCapture =  false;
	}
	if (document.removeEventListener) 
	{ 
		document.removeEventListener(eventName,callback, useCapture);
	} 
	else if (document.documentElement)
    {
		document.documentElement.detachEvent("onreadystatechange", propertyChangeHandler);
    }
}

function propertyChangeHandler(event)
{
	 if(event.propertyName == this.eventName) 
	 {
         this.callback();
     }   
}


//Event.listen('myevent', function () 
//{
//    alert('myevent triggered!');
//});
//
//Event.trigger('myevent');
