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
