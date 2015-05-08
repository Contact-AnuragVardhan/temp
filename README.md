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

---------------------------------------------------------------------------------------------------------------------------------------------------------------

<!DOCTYPE HTML>
<html>
    <head>
        <!-- HBox and VBox layouts have been implementated with many libraries/toolkits on
            different platforms and languages (like ExtJS,QT,GTK,.NET...).
            This tries to achieve the same but with CSS only.

            Supported browsers: IE 10+, Safari 6.1, Latest FF, Chrome -->
        <style type="text/css">
            html, body {
                margin: 0;
                height: 100%;
            }
        </style>
        <style>
            /*Stack child items vertically*/
            .vbox {
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
            
                /*Align children vetically*/
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
            
                -webkit-align-content: flex-start;
                -ms-flex-line-pack: start;
                align-content: flex-start;
            }
            /*Stack child items horizontally*/
            .hbox {
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
            
                /*Align children horizontally*/
                -webkit-flex-direction: row;
                -ms-flex-direction: row;
                flex-direction: row;
            
                -webkit-align-content: flex-start;
                -ms-flex-line-pack: start;
                align-content: flex-start;
            }
            /*Stretch item along parent's main-axis*/
            .flex {
                -webkit-flex: 1;
                -ms-flex: 1;
                flex: 1;
            }
            /*Stretch item along parent's cross-axis*/
            .stretch {
                align-self: stretch;
            }
            
            /*Stack child items to the main-axis start*/
            .main-start {
                -webkit-justify-content: flex-start;
                -ms-flex-pack: flex-start;
                justify-content: flex-start;
            }
            /*Stack child items to the cross-axis start*/
            .cross-start {
                -webkit-align-items: flex-start;
                -ms-flex-align: flex-start;
                align-items: flex-start;
            }
            /*Stack child items to the main-axis center*/
            .main-center {
                -webkit-justify-content: center;
                -ms-flex-pack: center;
                justify-content: center;
            }
            /*Stack child items to the cross-axis center*/
            .cross-center {
                -webkit-align-items: center;
                -ms-flex-align: center;
                align-items: center;
            }
            /*Stack child items to the main-axis end.*/
            .main-end {
                -webkit-justify-content: flex-end;
                -ms-flex-pack: end;
                justify-content: flex-end;
            }
            /*Stack child items to the cross-axis end.*/
            .cross-end {
                -webkit-align-items: end;
                -ms-flex-align: end;
                align-items: end;
            }
            /*Stretch child items along the cross-axis*/
            .cross-stretch {
                -webkit-align-items: stretch;
                -ms-flex-align: stretch;
                align-items: stretch;
            }
            
            /*Wrap items to next line on main-axis*/
            .wrap {
                -webkit-flex-wrap: wrap;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
            }
        </style>
    </head>
    <body class="vbox" style="height: 100%; width: 100%;">
        <div>Hello 1</div>
        <div class="flex hbox main-center cross-center wrap">
            <div>Hello 2.1</div>
            <div>Hello 2.2</div>
            <div>Hello 2.3</div>
        </div>
        <div>Hello 3</div>
    </body>
</html>

