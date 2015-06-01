<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>CSS3 tooltip</title>
	
	<style type="text/css">
		
	.content-resizer 
	{
		position: absolute;
		height: 6px;
		width:100%;
		left: 0;
		right: 0;
		background-color: #666;
		cursor: n-resize;
	}
			
	.top-content 
	{
		position: absolute;
		top: 0;
		height:150px;
		left: 0;
		right: 0;
		overflow: auto;
		padding : 5px;
	}
	
	.bottom-content 
	{
		/*position: absolute;*/
		left: 0;
		right: 0;
		bottom: 0;
		overflow: auto;
		padding : 5px;
	}
	
		
	</style>
	
	
</head>
<body onload="initialise();">
	<div>
            <div id="divUpper" class="top-content">
	            With a Census-estimated population of nearly 8.5 million in 2014,[8][9] <br/>
	            New York City is the most populous city in the United States. The city is the nucleus of the premier gateway for legal immigration to the <br/> 
	            United States[10][11][12]—the New York City Metropolitan Area, one of the most populous urban agglomerations in the world.[13] New York City  <br/>
	            is also known for being the location of Ellis Island, the largest historical gateway for immigration in the history of the United States. <br/>
	            A global power city,[14] New York City exerts a significant impact upon commerce, finance, media, art, fashion, research, technology, education,<br/> 
	            and entertainment. The home of the United Nations Headquarters,[15] New York City is an important center for international diplomacy[16] and <br/>
	            has been described as the cultural and financial capital of the world,[17][18][19][20][21] as well as the world's most economically powerful city.<br/>
	            [22][21][23] New York City alone makes up over 40 percent of the population of New York State. Two-thirds of the state's population live in <br/>
	            the New York City Metropolitan Area, and nearly 40% live on Long Island.[9] Both the state and New York City were named for the 17th century <br/>
	            Duke of York, future King James II of England. The next four most populous cities in the state are Buffalo, Rochester, Yonkers, and Syracuse, <br/>
	            while the state capital is Albany.<br/>
            </div>
            <div id="divVerticalResizer" class="content-resizer"></div>
            <div class="bottom-content">
            	With a Census-estimated population of nearly 8.5 million in 2014,[8][9] <br/>
	            New York City is the most populous city in the United States. The city is the nucleus of the premier gateway for legal immigration to the <br/> 
	            United States[10][11][12]—the New York City Metropolitan Area, one of the most populous urban agglomerations in the world.[13] New York City  <br/>
	            is also known for being the location of Ellis Island, the largest historical gateway for immigration in the history of the United States. <br/>
	            A global power city,[14] New York City exerts a significant impact upon commerce, finance, media, art, fashion, research, technology, education,<br/> 
	            and entertainment. The home of the United Nations Headquarters,[15] New York City is an important center for international diplomacy[16] and <br/>
	            has been described as the cultural and financial capital of the world,[17][18][19][20][21] as well as the world's most economically powerful city.<br/>
	            [22][21][23] New York City alone makes up over 40 percent of the population of New York State. Two-thirds of the state's population live in <br/>
	            the New York City Metropolitan Area, and nearly 40% live on Long Island.[9] Both the state and New York City were named for the 17th century <br/>
	            Duke of York, future King James II of England. The next four most populous cities in the state are Buffalo, Rochester, Yonkers, and Syracuse, <br/>
	            while the state capital is Albany.<br/>
	           With a Census-estimated population of nearly 8.5 million in 2014,[8][9] <br/>
	            New York City is the most populous city in the United States. The city is the nucleus of the premier gateway for legal immigration to the <br/> 
	            United States[10][11][12]—the New York City Metropolitan Area, one of the most populous urban agglomerations in the world.[13] New York City  <br/>
	            is also known for being the location of Ellis Island, the largest historical gateway for immigration in the history of the United States. <br/>
	            A global power city,[14] New York City exerts a significant impact upon commerce, finance, media, art, fashion, research, technology, education,<br/> 
	            and entertainment. The home of the United Nations Headquarters,[15] New York City is an important center for international diplomacy[16] and <br/>
	            has been described as the cultural and financial capital of the world,[17][18][19][20][21] as well as the world's most economically powerful city.<br/>
	            [22][21][23] New York City alone makes up over 40 percent of the population of New York State. Two-thirds of the state's population live in <br/>
	            the New York City Metropolitan Area, and nearly 40% live on Long Island.[9] Both the state and New York City were named for the 17th century <br/>
	            Duke of York, future King James II of England. The next four most populous cities in the state are Buffalo, Rochester, Yonkers, and Syracuse, <br/>
	            while the state capital is Albany.<br/>
	            With a Census-estimated population of nearly 8.5 million in 2014,[8][9] <br/>
	            New York City is the most populous city in the United States. The city is the nucleus of the premier gateway for legal immigration to the <br/> 
	            United States[10][11][12]—the New York City Metropolitan Area, one of the most populous urban agglomerations in the world.[13] New York City  <br/>
	            is also known for being the location of Ellis Island, the largest historical gateway for immigration in the history of the United States. <br/>
	            A global power city,[14] New York City exerts a significant impact upon commerce, finance, media, art, fashion, research, technology, education,<br/> 
	            and entertainment. The home of the United Nations Headquarters,[15] New York City is an important center for international diplomacy[16] and <br/>
	            has been described as the cultural and financial capital of the world,[17][18][19][20][21] as well as the world's most economically powerful city.<br/>
	            [22][21][23] New York City alone makes up over 40 percent of the population of New York State. Two-thirds of the state's population live in <br/>
	            the New York City Metropolitan Area, and nearly 40% live on Long Island.[9] Both the state and New York City were named for the 17th century <br/>
	            Duke of York, future King James II of England. The next four most populous cities in the state are Buffalo, Rochester, Yonkers, and Syracuse, <br/>
	            while the state capital is Albany.<br/>
            </div>
     </div>
  
  <script>
  var beforeElement = null;
  var afterElement = null;
  var upperMinHeight = 50;
  var lowerMinHeight = 50;
  
  
    function initialise() 
	{
		var divVerticalResizer = getElement("divVerticalResizer");
		beforeElement = divVerticalResizer.previousElementSibling;
		afterElement = divVerticalResizer.nextElementSibling;
		setPosition();
		addEventInElement(divVerticalResizer,"mousedown",verticalResizerMouseDown);
		//divVerticalResizer.onmousedown = verticalResizerMouseDown;
		
		
	}
    
    function setPosition()
    {
    	var divVerticalResizer = getElement("divVerticalResizer");
    	var beforeElementHeight = getAbsoluteHeight(beforeElement);
    	divVerticalResizer.style.top = beforeElementHeight + "px";
    	var resizerHeight = getAbsoluteHeight(divVerticalResizer);
    	afterElement.style.top = (beforeElementHeight + resizerHeight) + "px";
    	var parent = divVerticalResizer.parentElement;
    	if(parent.offsetHeight <= 0)
    	{
    		var afterElementHeight = getAbsoluteHeight(afterElement);
    		parent.style.height = (beforeElementHeight + resizerHeight +  afterElementHeight) + "px";
    	}
    }
    
    function verticalResizerMouseDown(event)
    {
    	var divVerticalResizer = event.target;
    	console.log('In Mouse Down');
		event.preventDefault();
		
		document.onmousemove = verticalMousemove;
		document.onmouseup =  mouseup;
    }
	
	function verticalMousemove(event) 
	{
		var divVerticalResizer = getElement("divVerticalResizer");
		var parent = divVerticalResizer.parentElement;
		var y = event.clientY;
		var upperCalculatedHeight = y - divVerticalResizer.offsetHeight;
		var lowerCalculatedHeight = parent.offsetHeight - y;
		//if(upperCalculatedHeight >= upperMinHeight && lowerCalculatedHeight >=lowerMinHeight)
		//{
			beforeElement.style.height = upperCalculatedHeight + "px";
			divVerticalResizer.style.top = y + "px";
			afterElement.style.top = y + "px";
			afterElement.style.height = lowerCalculatedHeight + "px";
		//}
	}

	function mouseup() 
	{
		document.onmousemove = null;
		document.onmouseup =  null;
	}
	
	function getElement(id)
	{
		return document.getElementById(id);
	}
	
	function addEventInElement(element,eventType,eventListener)
	{
		if (element.addEventListener)
		{
			element.addEventListener(eventType, eventListener, true);
		}
		else if (element.attachEvent)
		{
			element.attachEvent(eventType, eventListener, true);
		}
	        
	}
	
	function getAbsoluteHeight(element) 
	{
		  // Get the DOM Node if you pass in a string
		  element = (typeof element === 'string') ? document.querySelector(element) : element; 

		  var styles = window.getComputedStyle(element);
		  var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

		  return element.offsetHeight + margin;
    }

	
   </script>


</body>
</html>

-------------------------------------------------------------------nsDividerBox.js-------------------------------------------------

var nsDividerBox = Object.create(nsUIComponent);

nsDividerBox.DIRECTION_VERTICAL = "vertical";
nsDividerBox.DIRECTION_HORIZONTAL = "horizontal";
nsDividerBox.DIVIDER_DIMENSION = 6;

nsDividerBox.__childContainer = null;
nsDividerBox.__direction = null;
nsDividerBox.__parentDimension = 0;
nsDividerBox.__arrDivider = [];
nsDividerBox.__expectedDimension = 0;

nsDividerBox.__currentDivider = null;
nsDividerBox.__currentBeforeElement = null;
nsDividerBox.__currentAfterElement = null;
nsDividerBox.__currentBeforeElementMinDimension = 0;
nsDividerBox.__currentAfterElementMinDimension = 0;
nsDividerBox.__currentBeforeElementOffset = 0;
nsDividerBox.__currentAfterElementOffset = 0;
nsDividerBox.__lastPosition = 0;


nsDividerBox.initializeComponent = function() 
{
	this.base.initializeComponent();
};

nsDividerBox.setComponentProperties = function() 
{
	console.log("In child setComponentProperties");
	if(this.hasAttribute("direction")) 
	{
		this.__direction = this.getAttribute("direction");
		if(!this.__direction)
		{
			this.util.throwNSError("NSDividerBox","Direction is not initialized");
			return;
		}
		if(this.__direction == this.DIRECTION_VERTICAL)
		{
			
		}
		else if(this.__direction == this.DIRECTION_HORIZONTAL)
		{
			this.setHorizontalComponents();
		}
	}
	if(this.hasAttribute("labelClass"))
	{
		this.util.addStyleClass(this.label,this.getAttribute("labelClass"));
	}
	this.base.setComponentProperties();
};

nsDividerBox.setHorizontalComponents = function() 
{
	if(this.hasAttribute("nsHeight"))
	{
		this.__expectedDimension = this.__getDimensionAsNumber(this,this.getAttribute("nsHeight"));
		this.style.height = this.__expectedDimension + "px";
		if(!this.style.width)
		{
			this.style.width = "100%";
		}
		if(!this.style.position != "absolute")
		{
			this.style.position = "absolute";
		}
	}
	else if(this.style.height != "")
	{
		this.__expectedDimension  = this.__getDimensionAsNumber(this,this.style.height);
	}
	else
	{
		this.__expectedDimension  = this.offsetHeight;
	}
		
	this.__childContainer = this.util.createDiv(this.getID() + "#container","nsHorizontalResizerContainer");
	var children = this.childNodes;
	var arrChildElement = [];
	var childCount = -1;
	for (var count = 0; count < children.length; count++) 
	{
		var child =  children[count];
		if(child && this.util.isElement(child) && child.nodeName != "SCRIPT")
	    {
			arrChildElement[++childCount] = child;
			this.removeChild(child);
	    }
	}
	var totalHeightAllocated = 0;
	for (var count = 0; count < arrChildElement.length; count++) 
	{
		var child =  arrChildElement[count];
		var expectedChildHeight = 0;
		this.util.addStyleClass(child,"nsHorizontalResizerChild");
		if(child.style.height)
		{
			expectedChildHeight = this.__getDimensionAsNumber(child,child.style.height);
		}
		else
		{
			expectedChildHeight = this.__expectedDimension  / arrChildElement.length;
		}
		var childTop = expectedChildHeight;
		child.style.top = totalHeightAllocated + "px";
		child.style.height = childTop + "px";
		this.__childContainer.appendChild(child);
		var minDimension = 0;
		var offsetDimension = 0;
		if(child.style.minHeight)
		{
			minDimension = this.__getDimensionAsNumber(child,child.style.minHeight);
			offsetDimension = totalHeightAllocated;
		}
		totalHeightAllocated += childTop;
		if(count < arrChildElement.length - 1)
		{
			var divider = this.__getHorizontalDivider(count);
			var dividerHeight = this.DIVIDER_DIMENSION;
			divider.style.height = dividerHeight + "px";
			divider.style.top = totalHeightAllocated + "px";
			totalHeightAllocated += dividerHeight;
			this.util.addEvent(divider,"mousedown",this.dividerMouseDownHandler.bind(this));
			this.__childContainer.appendChild(divider);
			//setting the global Divider Array
			var objDivider = {beforeElement:child, afterElement:null, beforeElementMinDimension:minDimension, afterElementMinDimension:0,
							  beforeElementOffset:offsetDimension,afterElementOffset:totalHeightAllocated};
			this.__arrDivider[divider.id] = objDivider;
		}
		if(count != 0)
		{
			//setting the next element for previous Divider for global Divider Array
			var prevDividerID = this.__getDividerID(count - 1);
			var objPrevDivider = this.__arrDivider[prevDividerID];
			objPrevDivider.afterElement = child;
			objPrevDivider.afterElementMinDimension = minDimension;
			this.__arrDivider[prevDividerID] = objPrevDivider;
		}
	}
	this.appendChild(this.__childContainer);
};

nsDividerBox.__getHorizontalDivider = function(count)
{
	var dividerID  = this.__getDividerID(count);
	var divider = this.util.createDiv(dividerID,"nsHorizontalResizer");
	return divider;
};

nsDividerBox.__getDividerID = function(count)
{
	return this.getID() + "#resizer" + count;
};

nsDividerBox.dividerMouseDownHandler = function (event) 
{
	event = this.util.getEvent(event);
	event.preventDefault();
	
	var divider = this.util.getTarget(event);
	if(divider)
	{
		var objDivider = this.__arrDivider[divider.id];
		
		this.__currentDivider = divider;
		this.__currentBeforeElement = objDivider.beforeElement;
		this.__currentAfterElement = objDivider.afterElement;
		this.__currentBeforeElementMinDimension = objDivider.beforeElementMinDimension;
		this.__currentAfterElementMinDimension = objDivider.afterElementMinDimension;
		this.__currentBeforeElementOffset = objDivider.beforeElementOffset;
		this.__currentAfterElementOffset = objDivider.afterElementOffset;
		
		document.onmousemove = this.documentMouseMoveHandler.bind(this);
		document.onmouseup =  this.documentMouseUpHandler.bind(this);
	}
};

nsDividerBox.documentMouseMoveHandler = function (event) 
{
	if(this.__direction == this.DIRECTION_VERTICAL)
	{
		var xPos = event.pageX;
		var afterElementWidth = this.__expectedDimension - (xPos + this.__currentDivider.offsetWidth);
		if(xPos > (this.__currentBeforeElementMinDimension + this.__currentBeforeElementOffset) 
				&& afterElementWidth > (this.__currentAfterElementMinDimension + this.__currentAfterElementOffset))
		{
			this.__currentDivider.style.left = xPos + "px";
			this.__currentBeforeElement.style.width = ((xPos / this.__expectedDimension) * 100) + "%";
			this.__currentAfterElement.style.width = ((afterElementWidth / this.__expectedDimension) * 100) + "%";
		}
	}
	else if(this.__direction == this.DIRECTION_HORIZONTAL)
	{
		var beforeElementMinHeight = 0;
		var afterElementMinHeight = 0;
		var yPos = event.pageY - this.offsetTop;
		var afterElementHeight = this.__expectedDimension - (yPos + this.__currentDivider.offsetHeight);
		//mouse movement is UP
		if(event.pageY < this.__lastPosition)
		{
			beforeElementMinHeight = this.__currentBeforeElementMinDimension + this.__currentBeforeElementOffset;
			afterElementMinHeight = this.__currentAfterElementMinDimension + this.__currentAfterElementOffset;
			if(yPos > beforeElementMinHeight)
			{
				this.__currentDivider.style.top = yPos + "px";
				this.__currentBeforeElement.style.height = yPos + "px";
				this.__currentAfterElement.style.height = afterElementHeight + "px";
				this.__currentAfterElement.style.top = (yPos + this.DIVIDER_DIMENSION) + "px";
			}
		}
		//mouse movement is down
		else if (event.pageY > this.__lastPosition) 
		{
			beforeElementMinHeight = this.__currentBeforeElementMinDimension + this.__currentBeforeElementOffset;
			afterElementMinHeight = this.__currentAfterElementMinDimension;
			if(afterElementHeight > afterElementMinHeight)
			{
				this.__currentDivider.style.top = yPos + "px";
				this.__currentBeforeElement.style.height = yPos + "px";
				this.__currentAfterElement.style.height = afterElementHeight + "px";
				this.__currentAfterElement.style.top = (yPos + this.DIVIDER_DIMENSION) + "px";
			}
		}
		this.__lastPosition = event.pageY;
		
		/*if(yPos > beforeElementMinHeight && afterElementHeight > afterElementMinHeight)
		{
			this.__currentDivider.style.top = yPos + "px";
			this.__currentBeforeElement.style.height = yPos + "px";
			this.__currentAfterElement.style.height = afterElementHeight + "px";
			this.__currentAfterElement.style.top = (yPos + this.DIVIDER_DIMENSION) + "px";
		}*/
	}
};

nsDividerBox.documentMouseUpHandler = function (event) 
{
	document.onmousemove = null;
	document.onmouseup =  null;
	
	this.__currentDivider = null;
	this.__currentBeforeElement = null;
	this.__currentAfterElement = null;
	this.__currentBeforeElementMinDimension = 0;
	this.__currentAfterElementMinDimension = 0;
	this.__currentBeforeElementOffset = 0;
	this.__currentAfterElementOffset = 0;
	this.__lastPosition = 0;
};

nsDividerBox.__getDimensionAsNumber = function(element,dimension)
{
	var retValue = 0;
	if(element && dimension)
	{
		if(dimension.substring(dimension.length - 1) == "%")
		{
			dimension = dimension.substring(0,dimension.length - 1);
			retValue = (dimension / 100) * element.parent.offsetHeight;
		}
		else if(dimension.substring(dimension.length - 2) == "px")
		{
			retValue = dimension.substring(0,dimension.length - 2);
		}
		else
		{
			retValue = dimension;
		}
	}
	if(isNaN(retValue))
	{
		retValue = 0;
	}
	return parseInt(retValue);
	
};

document.registerElement("ns-dividerBox", {prototype: nsDividerBox});
