DividerBoxDemo.html


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>CSS3 tooltip</title>
	
	<style type="text/css">
	

	#sidebar {
		position: absolute;
		overflow: hidden;
	}
	#content {
		position: absolute;
		top: 35px;
		bottom: 0;
		left: 206px /* 200 + 6*/;
		right: 0;
		overflow: hidden;
		color: #FFF;
		
	}
	#top-content {
		position: absolute;
		top: 0;
		bottom: 136px; /* 130 + 6 */
		left: 0;
		right: 0;
		background-color: #444;
		overflow: auto;
	}
	#bottom-content {
		position: absolute;
		height: 130px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: auto;
		background-color: #777;
	}

	#sidebar-resizer {
		background-color: #666;
		position: absolute;
		top: 35px;
		bottom: 0;
		left: 200px;
		width: 6px;
		cursor: e-resize;
	}
	#content-resizer {
		position: absolute;
		height: 6px;
		bottom: 130px;
		left: 0;
		right: 0;
		background-color: #666;
		cursor: n-resize;
	}

	#sidebar-resizer:hover, #preview-resizer:hover {
		background-color: #AAA;
	}
		
	</style>
	
	
</head>
<body onload = "initialise()">
  
  	<div id="sidebar">
  		<h3>Side navbar</h3>
  	</div>
  
  	<div id="content">

  		<div id="top-content">Top content <p>I am here</p></div>
  
  		<div id="bottom-content">Bottom content</div>
  
  		<div id="content-resizer" 
  			resizer="horizontal" 
  			resizer-height="6" 
  			resizer-top="#top-content" 
  			resizer-bottom="#bottom-content">
  		</div>
  
  	</div>
  
  	<div id="sidebar-resizer" 
  		resizer="vertical" 
  		resizer-width="6" 
  		resizer-left="#sidebar" 
  		resizer-right="#content"
  		resizer-max="600">
  	</div>
	
	<script>
		function initialise() 
		{
			var contentResizer = document.getElementById("content-resizer");
			var sidebarResizer = document.getElementById("sidebar-resizer");
			contentResizer.onmousedown = function(event)
			{
				event.preventDefault();

				document.onmousemove = horizontalMousemove;
				document.onmouseup =  mouseup;
			};
			
			sidebarResizer.onmousedown = function(event)
			{
				event.preventDefault();

				document.onmousemove = verticalMousemove;
				document.onmouseup =  mouseup;
			};
		}

		function horizontalMousemove(event) 
		{
			var element = document.getElementById("content-resizer");
			commonMouseMove(element);
		}
		
		function verticalMousemove(event) 
		{
			var element = document.getElementById("sidebar-resizer");
			commonMouseMove(element);
		}
		
		function commonMouseMove(element)
		{
			var resizerTop = document.getElementById("top-content");
			var resizerBottom = document.getElementById("bottom-content");
			var resizerLeft = document.getElementById("sidebar");
			var resizerRight = document.getElementById("content");
		
			var resizer = element.getAttribute("resizer");
			var resizerHeight = element.getAttribute("resizer-height");
			var resizerWidth = element.getAttribute("resizer-width");
			var resizerMax = element.getAttribute("resizer-max");
			
			if (resizer == 'vertical') 
			{
				// Handle vertical resizer
				var x = event.pageX;

				if (resizerMax && x > resizerMax) 
				{
					x = parseInt(resizerMax);
				}
				
				element.style.left = x + "px";
				resizerLeft.style.width = x + "px";
				resizerRight.style.left = (x + parseInt(resizerWidth)) + "px";
			} 
			else 
			{
				// Handle horizontal resizer
				var y = window.innerHeight - event.pageY;
				element.style.bottom = y + "px";
				resizerTop.style.bottom = (y + parseInt(resizerHeight)) + "px";
				resizerBottom.style.height = y + "px";
			}
		}

		function mouseup() 
		{
			document.onmousemove = null;
			document.onmouseup =  null;
		}
	</script>


</body>
</html>

