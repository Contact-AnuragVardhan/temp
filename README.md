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
