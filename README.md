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

-----------------------------------------------------------------------------------------------------------

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
               #content-resizer {
		height: 6px;
		bottom: 100%;
		background-color: #666;
		cursor: n-resize;
	}
            
        </style>
    </head>
    <body>
        <div class="vbox">
            <div>Hello 2.1</div>
            <div id="content-resizer"></div>
            <div>Hello 2.2</div>
            <div id="content-resizer"></div>
            <div>Hello 2.3</div>
        </div>
    </body>
</html>

https://gist.github.com/Munawwar/7926618

---------------------------------------------------------------------------------------------------------------------------------------

<!-- http://cdn.tutsplus.com/net/uploads/legacy/015_Accordion/accordion-final.html -->

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<style>

.panel
{
	background: #eee;
	/*margin: 5px;*/
	padding: 0px 0px 0px;
	border: 1px solid #999;	
}

.accordion-toggle
{
	display: flex;
	position: relative; /* required for effect */
	z-index: 10;		/* required for effect */
	background: #fefffa;
	background-position: bottom;
	color: #000000;   
	cursor: pointer;
	/*margin-bottom: 1px;*/
	padding: 9px 14px 6px 14px;
    
	/*border-top: 1px solid #5d5852;	*/
}

.accordion-toggle:hover
{
	background-color: #0000FF;
	border-top: 1px solid #a06b55;
}

.accordion-toggle-active
{
	background-color: #0000FF;
}

.accordion-title
{
	  -webkit-transform: translateZ(0);
	  transform: translateZ(0);
	  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
	  -webkit-backface-visibility: hidden;
	  backface-visibility: hidden;
	  -moz-osx-font-smoothing: grayscale;
	  -webkit-transition-duration: 0.3s;
	  transition-duration: 0.3s;
	  -webkit-transition-property: transform;
	  transition-property: transform;
}

.accordion-title:hover,.accordion-title:focus,.accordion-title:active
{
	webkit-transform: scale(1.1);
}

.accordion-content
{
	overflow: auto;	/* required for effect */
	background: #fefffa;
	padding: 0;
	color: #000000;
}

.accordion-content p
{
	margin: 9px 24px 6px 24px;
}

.arrow-up 
{
	width:0;
    height:0;
	border-bottom:9px solid #ff0000;
    border-left:5px solid transparent;
    border-right:5px solid transparent;
}

.arrow-down 
{
	width: 0; 
	height: 0; 
	border-top: 9px solid #ff0000;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
}

.arrow-right 
{
	width: 0; 
	height: 0; 
	border-left: 9px solid #ff0000;
	border-top: 5px solid transparent;
	border-bottom: 5px solid transparent;
}

.arrow-left 
{
	width: 0; 
	height: 0; 
	border-right:9px solid #ff0000;
	border-top: 5px solid transparent;
	border-bottom: 5px solid transparent;
}

</style>
</head>
<body onload="initialise('divAccordion');">
	<script>
		var objAccordion = [
		      {title:"Title 1",content:"#divContent1"},
		      {title:"Title 2",content:"#divContent2"},
		      {title:"Title 3",content:"#divContent3"},
		      {title:"Title 4",content:"#divContent4"}
		 ];
		
		var ANIMATION_INTERVAL = 10;
		var animationRequired = true;
		
		var parentClass = "panel";
		var toggleClass = "accordion-toggle";
        var toggleActive = "accordion-toggle-active";
		var titleClass = "accordion-title";
        var contentClass = "accordion-content";
		var arrowClose = "arrow-right";
		var arrowOpen = "arrow-down";
		
		var __parentContainer = null;
		var __contentMaxHeight = 0;
		
		var __currentTitleClicked = null;
		var __isAnimating = false;
		var __currentTitleHeight = 0;
		var __animationIntervalId = 0;
		
        
        function initialise(parentContainerID)
        {
        	if(parentContainerID && objAccordion && objAccordion.length > 0)
        	{
        		__parentContainer = getElement(parentContainerID);
        		if(__parentContainer)
        		{
        			for(var count = 0;count < objAccordion.length;count++)
            		{
            			var item = 	objAccordion[count];
            			if(item && item["title"] && item["content"])
            			{
            				var divParent = createContainer(item["title"],item["content"]);
							__parentContainer.appendChild(divParent);
            			}
            		}
					setContentMaxHeight();
            		closeAllContainers();        			
        		}
        	}
        }
        
        function createContainer(title,contentID)
        {
			var divParent = document.createElement("div");
			addClass(divParent,parentClass);
        	var divTitle = document.createElement("div");
        	addClass(divTitle,toggleClass);
			var divArrow = document.createElement("div");
			addClass(divArrow,arrowOpen);
			divTitle.appendChild(divArrow);
			var divText = document.createElement("div");
			addClass(divText,titleClass);
			divText.style.paddingLeft = "1.5%";
			divText.style.fontWeight = "bold";
			divText.style.width = "100%";
			divText.innerHTML = title;
			divTitle.appendChild(divText);
        	divTitle.addEventListener("click", titleClickHandler);
			divArrow.addEventListener("click", titleClickHandler);
			divText.addEventListener("click", titleClickHandler);
        	var divContent;
        	var copyContentID = "";
        	if(contentID && contentID.charAt("#"))
        	{
        		copyContentID = contentID.substring(1);
        	}
        	else
        	{
        		copyContentID = contentID;
        	}
        	var divCopyContent = getElement(copyContentID);
        	if(divCopyContent)
        	{
        		divContent = divCopyContent.cloneNode(true);
        		divCopyContent.parentNode.removeChild(divCopyContent);
        	}
        	else
        	{
        		divContent = document.createElement("div");
        		divContent.setAttribute("id",copyContentID);
        	}
        	addClass(divContent,contentClass);
        	divParent.appendChild(divTitle);
        	divParent.appendChild(divContent);
			
			return divParent;
        }
        
        function titleClickHandler(event)
        {
        	if(event && event.target)
        	{
        		var divTitle = event.target;
				if(!hasClass(divTitle,toggleClass))
				{
					divTitle = divTitle.parentNode;
				}
				if(divTitle && hasClass(divTitle,toggleClass))
				{
					event.stopImmediatePropagation();
					var titles = getAllTitles();
					var contents = getAllContents();
					var count;
					for (count = 0; count < titles.length; count++) 
					{
						var divTitleInner = titles[count];
						if(divTitleInner == divTitle)
						{
							var divContent = contents[count];
							if(divContent)
							{
								if(hasClass(divTitle, toggleActive)) 
								{
									if(animationRequired)
									{
										animate(divTitle,divContent,false);
									}
									else
									{
										closeContainer(divTitle,divContent);
									}
								}
								else
								{
									if(animationRequired)
									{
										closeAllContainers();
										animate(divTitle,divContent,true);
									}
									else
									{
										closeAllContainers();
										openContainer(divTitle,divContent);
									}
								}
								break;
							}
						}
					}
				}
        	}
        }
		
		function closeAllContainers()
		{
			if(__parentContainer)
			{
				var titles = getAllTitles();
				var contents = getAllContents();
			    var count;
			    for (count = 0; count < titles.length; count++) 
			    {
			        var divTitle = titles[count];
			        var divContent = contents[count];
			        if(divTitle && divContent)
			        {
			        	closeContainer(divTitle,divContent);
			        }
			    }
			}
		}
		
		function setContentMaxHeight() 
		{
			var contents = getAllContents();
			var count;
			for(var count = 0; count < contents.length; count++) 
			{
				if(contents[count].offsetHeight > __contentMaxHeight) 
				{
					__contentMaxHeight = contents[count].offsetHeight;
				}
			}
		}
		
		function getAllTitles()
		{
			var arrTitles = getAllTitlesOrContents("title");
			return arrTitles;
		}
		
		function getAllContents()
		{
			var arrContents = getAllTitlesOrContents("content");
			return arrContents;
		}
		
		function getAllTitlesOrContents(type)
		{
			var arrTitleContent = null;
			if(__parentContainer)
			{
				parentDivs = __parentContainer.getElementsByClassName(parentClass);
				if(parentDivs)
				{
					var count;
					arrTitleContent = new Array();
					for (count = 0; count < parentDivs.length; count++) 
					{
						 var divParent = parentDivs[count];
						 if(divParent)
						 {
							if(type === "title")
							{
								arrTitleContent.push(divParent.getElementsByClassName(toggleClass)[0]);
							}
							else
							{
								arrTitleContent.push(divParent.getElementsByClassName(contentClass)[0]);
							}
						 }
					}
				}
			}
			return arrTitleContent;
		}
		
		function openContainer(divTitle,divContent)
		{
			 if(divTitle && divContent)
			 {
				if(divTitle.getElementsByClassName(arrowClose) && divTitle.getElementsByClassName(arrowClose).length > 0)
				{
					var divArrow = divTitle.getElementsByClassName(arrowClose)[0];
					removeClass(divArrow,arrowClose);
					addClass(divArrow,arrowOpen);
				}
				addClass(divTitle, toggleActive);
				divContent.style.display = "block";
				if(__contentMaxHeight > 0)
				{
					divContent.style.height = __contentMaxHeight + "px";
				}
			 }
		}
		
		function closeContainer(divTitle,divContent)
		{
			if(divTitle && divContent)
			{
				if(divTitle.getElementsByClassName(arrowOpen) && divTitle.getElementsByClassName(arrowOpen).length > 0)
				{
					var divArrow = divTitle.getElementsByClassName(arrowOpen)[0];
					removeClass(divArrow,arrowOpen);
					addClass(divArrow,arrowClose);
				}
				removeClass(divTitle, toggleActive);
				divContent.style.display = "none";
				divContent.style.height = "0px";
			}
		}
		
		function onClick(divTitleID,divContentID)
		{
			var divTitle = getElement(divTitleID);
			var divContent = getElement(divContentID);
			//resetAllContainers();
			 if(hasClass(divTitle, toggleActive)) 
			 {
				 closeContainer(divTitle,divContent);
		     }
			 else
			 {
				 openContainer(divTitle,divContent);
			 }
		}
		
		function animate(divTitle,divContent,isOpening)
		{
		   if(!__isAnimating)
		   {
			   __isAnimating = true;
			   if(isOpening)
			   {
					__currentTitleHeight = 0;
					divContent.style.display = "block";
					__animationIntervalId = setInterval(function(){animateOpening(divTitle,divContent)}, ANIMATION_INTERVAL);
			   }
			   else
			   {
					__currentTitleHeight = __contentMaxHeight;
					__animationIntervalId = setInterval(function(){animateClosing(divTitle,divContent)}, ANIMATION_INTERVAL);
			   }
		   }
		}
		
		function animateOpening(divTitle,divContent)
		{
		   if(__currentTitleHeight >= __contentMaxHeight)
		   {
			  __isAnimating = false;
			  __currentTitleHeight = 0;
			  openContainer(divTitle,divContent);
			  clearInterval(__animationIntervalId);
		   }
		   else
		   {
			  __currentTitleHeight += ANIMATION_INTERVAL;
			  if(__currentTitleHeight > __contentMaxHeight)
			  {
				 __currentTitleHeight = __contentMaxHeight;
			  }
			  divContent.style.height = __currentTitleHeight + "px";
		   }
		}

		function animateClosing(divTitle,divContent)
		{
		   if(__currentTitleHeight <= 0)
		   {
			  __isAnimating = false;
			  __currentTitleHeight = 0;
			  closeContainer(divTitle,divContent);
			  clearInterval(__animationIntervalId);
		   }
		   else
		   {
			  __currentTitleHeight -= ANIMATION_INTERVAL;
			  if(__currentTitleHeight < 0)
			  {
				 __currentTitleHeight = 0;
			  }
			  divContent.style.height = __currentTitleHeight + 'px';
		   }
		}
		
		function resetAllContainers()
		{
			var divTitle1 = getElement('divTitle1');
			var divContent1 = getElement('divContent1');
			var divTitle2 = getElement('divTitle2');
			var divContent2 = getElement('divContent2');
			var divTitle3 = getElement('divTitle3');
			var divContent3 = getElement('divContent3');
			var divTitle4 = getElement('divTitle4');
			var divContent4 = getElement('divContent4');
			closeContainer(divTitle1,divContent1);
			closeContainer(divTitle2,divContent2);
			closeContainer(divTitle3,divContent3);
			closeContainer(divTitle4,divContent4);
		}
		
		
		
		function getElement(i)
		{
			return document.getElementById(i);
		}
		
		function hasClass(ele, cls) 
		{
		    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
		}
		function addClass(ele, cls) 
		{
		    if (!hasClass(ele, cls)) ele.className += " " + cls;
		}
		function removeClass(ele, cls) 
		{
		    if (hasClass(ele, cls)) 
		    {
		        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		        ele.className = ele.className.replace(reg, ' ');
		    }
		}
	
	</script>
	
	  <script type="text/javascript">
	  /*https://developers.google.com/chart/interactive/docs/gallery/linechart#Examples*/
			google.load('visualization', '1.1', {packages: ['line']});
    google.setOnLoadCallback(drawChart);

    function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Day');
      data.addColumn('number', 'Guardians of the Galaxy');
      data.addColumn('number', 'The Avengers');
      data.addColumn('number', 'Transformers: Age of Extinction');

      data.addRows([
        [1,  37.8, 80.8, 41.8],
        [2,  30.9, 69.5, 32.4],
        [3,  25.4,   57, 25.7],
        [4,  11.7, 18.8, 10.5],
        [5,  11.9, 17.6, 10.4],
        [6,   8.8, 13.6,  7.7],
        [7,   7.6, 12.3,  9.6],
        [8,  12.3, 29.2, 10.6],
        [9,  16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11,  5.3,  7.9,  4.7],
        [12,  6.6,  8.4,  5.2],
        [13,  4.8,  6.3,  3.6],
        [14,  4.2,  6.2,  3.4]
      ]);

      var options = {
        chart: {
          title: 'Box Office Earnings in First Two Weeks of Opening',
          subtitle: 'in millions of dollars (USD)'
        },
        width: 700,
        height: 300,
        axes: {
          x: {
            0: {side: 'top'}
          }
        }
      };

      var chart = new google.charts.Line(document.getElementById('divContent1Child'));

      chart.draw(data, options);
    }
      
		</script>
	<div id="divAccordion">
	</div>
	<div id="divContent1" style="width: 100%; height: 400px; display: block;">
		<div id="divContent1Child" style="width: 100%; height: 100%;">
		</div>
	</div>
	<div id="divContent2">
		<p>
			Lorem ipsum dolor sit amet, &asdfasdfsadf;  &lt;asdfasdf&gt; consectetuer adipiscing elit. Donec vel justo. Integer ornare dignissim lectus. Nunc tellus. Donec pharetra aliquam neque. Vestibulum ornare tincidunt mauris. Duis ut felis et ipsum feugiat faucibus. Phasellus enim magna, sodales id, mollis vel, fringilla et, felis. Integer placerat, tortor eu blandit eleifend, elit leo fringilla orci, quis tristique leo justo ut quam. Aenean dolor. Donec tempus. Ut dapibus odio vitae ligula.
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec vel justo. Integer ornare dignissim lectus. Nunc tellus. Donec pharetra aliquam neque. Vestibulum ornare tincidunt mauris. Duis ut felis et ipsum feugiat faucibus. Phasellus enim magna, sodales id, mollis vel, fringilla et, felis. Integer placerat, tortor eu blandit eleifend, elit leo fringilla orci, quis tristique leo justo ut quam. Aenean dolor. Donec tempus. Ut dapibus odio vitae ligula.                            
		</p>
	</div>
	<div id="divContent3">
		<p>
		In posuere velit sit amet tortor. Donec elementum ipsum at ante luctus elementum. Duis varius dolor a tortor. Donec mi. Phasellus posuere. Mauris enim erat, commodo et, porta quis, consequat quis, nibh. Maecenas convallis eleifend ante. Phasellus metus metus, tempor sed, rhoncus ac, feugiat a, ante. Morbi sit amet ipsum. Cras eu leo quis pede condimentum tempor. Curabitur dictum elit sed lacus. Sed tortor magna, euismod non, mollis a, egestas nec, quam. Fusce porttitor porttitor nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce faucibus, ipsum vel consequat sodales, odio nulla pretium elit, sit amet tempor magna dolor vitae tellus. Quisque odio.
		</p>
	</div>
	<div id="divContent4">
		<p>
		Nulla eget ante. In luctus nunc eu nisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse lectus sem, commodo vitae, scelerisque eget, varius vitae, neque. Maecenas sed risus. Pellentesque erat. Morbi varius elit id augue. In ultrices vulputate mauris. Vivamus libero ligula, viverra eget, placerat at, adipiscing at, elit. Quisque sapien eros, fermentum a, cursus vel, dignissim id, massa. Donec hendrerit neque sit amet arcu. Cras adipiscing tincidunt elit. Praesent at enim ac lacus malesuada porttitor. Nullam nec diam eu erat posuere mollis. Cras eget urna. Pellentesque sed arcu. Vestibulum lacinia mattis lacus. Curabitur ornare felis ac eros. Fusce convallis est id nisi.
		</p>
	</div>
	
	  <!--<div id="test-accordion">
	 <div class="panel">
		<div id="divTitle1" class="accordion-toggle accordion-toggle-active" onclick="onClick('divTitle1','divContent1')">Main</div>
		<div id="divContent1" class="accordion-content" style="height: 276px;">
			<p>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse malesuada mi vel risus. Nulla ipsum risus, malesuada gravida, dapibus et, dapibus rhoncus, orci. Quisque suscipit. Praesent sed tellus facilisis lectus ultrices laoreet. Donec eu orci in metus egestas hendrerit. In hac habitasse platea dictumst. Integer blandit ultricies erat. Nunc viverra blandit velit. Maecenas tristique tortor non ante. In pharetra mi quis metus. Cras urna dolor, volutpat et, tincidunt quis, accumsan a, erat. Donec et dolor at elit congue molestie. In mi sapien, porta ut, cursus placerat, sodales in, libero. Aliquam tempus vestibulum ipsum. Suspendisse ligula orci, dignissim eu, laoreet ut, interdum sit amet, tortor. Vestibulum est lacus, sagittis faucibus, sollicitudin fringilla, pretium non, ipsum. Quisque enim. Nullam tortor mi, posuere et, pellentesque ut, laoreet quis, lectus. Mauris euismod aliquet mi. Pellentesque eu pede vitae nibh imperdiet convallis.
				<br/><br/>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse malesuada mi vel risus. Nulla ipsum risus, malesuada gravida, dapibus et, dapibus rhoncus, orci. Quisque suscipit. Praesent sed tellus facilisis lectus ultrices laoreet. Donec eu orci in metus egestas hendrerit. In hac habitasse platea dictumst. Integer blandit ultricies erat. Nunc viverra blandit velit. Maecenas tristique tortor non ante. In pharetra mi quis metus. Cras urna dolor, volutpat et, tincidunt quis, accumsan a, erat. Donec et dolor at elit congue molestie. In mi sapien, porta ut, cursus placerat, sodales in, libero. Aliquam tempus vestibulum ipsum. Suspendisse ligula orci, dignissim eu, laoreet ut, interdum sit amet, tortor. Vestibulum est lacus, sagittis faucibus, sollicitudin fringilla, pretium non, ipsum. Quisque enim. Nullam tortor mi, posuere et, pellentesque ut, laoreet quis, lectus. Mauris euismod aliquet mi. Pellentesque eu pede vitae nibh imperdiet convallis.
			</p>
			<p>	
				Mauris dictum congue lectus. Fusce erat elit, imperdiet non, aliquam sed, lobortis id, libero. Donec dui erat, sollicitudin sed, blandit eget, aliquam non, mauris. Mauris lobortis. Suspendisse orci metus, lobortis ut, sollicitudin et, laoreet eu, ligula. Pellentesque at tellus sed nunc volutpat convallis. Suspendisse tincidunt, erat ac pretium luctus, dolor purus tincidunt justo, eu semper massa massa ac dui. Morbi vel arcu ut elit placerat consequat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas est dui, luctus id, tempor a, dapibus lacinia, nunc. In vulputate, ipsum eget tempor aliquam, mauris enim ornare risus, vitae rhoncus purus ligula ut urna. In eu arcu. Aliquam erat volutpat. Donec purus enim, malesuada quis, aliquet vel, dapibus eu, lacus. In laoreet nulla id mi. Cras bibendum semper lacus. Nunc id sapien in ligula consectetuer semper. Nunc enim elit, interdum id, tincidunt et, ultrices eu, arcu.  
			</p>
		</div>
	</div>
	<div class="panel">
	<div id="divTitle2" class="accordion-toggle" onclick="onClick('divTitle2','divContent2')">Why Use Us</div>
	<div id="divContent2"  class="accordion-content" style="height: 0px; display: none;">
		<p>
			Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec vel justo. Integer ornare dignissim lectus. Nunc tellus. Donec pharetra aliquam neque. Vestibulum ornare tincidunt mauris. Duis ut felis et ipsum feugiat faucibus. Phasellus enim magna, sodales id, mollis vel, fringilla et, felis. Integer placerat, tortor eu blandit eleifend, elit leo fringilla orci, quis tristique leo justo ut quam. Aenean dolor. Donec tempus. Ut dapibus odio vitae ligula.
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec vel justo. Integer ornare dignissim lectus. Nunc tellus. Donec pharetra aliquam neque. Vestibulum ornare tincidunt mauris. Duis ut felis et ipsum feugiat faucibus. Phasellus enim magna, sodales id, mollis vel, fringilla et, felis. Integer placerat, tortor eu blandit eleifend, elit leo fringilla orci, quis tristique leo justo ut quam. Aenean dolor. Donec tempus. Ut dapibus odio vitae ligula.                            
		</p>
	</div>
	</div>
	<div class="panel">
	<div id="divTitle3" class="accordion-toggle" onclick="onClick('divTitle3','divContent3')">Our Prices</div>
	<div id="divContent3"  class="accordion-content" style="display: none; height: 0px;">
		<p>
		In posuere velit sit amet tortor. Donec elementum ipsum at ante luctus elementum. Duis varius dolor a tortor. Donec mi. Phasellus posuere. Mauris enim erat, commodo et, porta quis, consequat quis, nibh. Maecenas convallis eleifend ante. Phasellus metus metus, tempor sed, rhoncus ac, feugiat a, ante. Morbi sit amet ipsum. Cras eu leo quis pede condimentum tempor. Curabitur dictum elit sed lacus. Sed tortor magna, euismod non, mollis a, egestas nec, quam. Fusce porttitor porttitor nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce faucibus, ipsum vel consequat sodales, odio nulla pretium elit, sit amet tempor magna dolor vitae tellus. Quisque odio.
		</p>
	</div>
	</div>
	<div class="panel">
	<div id="divTitle4" class="accordion-toggle" onclick="onClick('divTitle4','divContent4')">Contact Us</div>
	<div id="divContent4"  class="accordion-content" style="display: none; height: 0px;">
		<p>
		Nulla eget ante. In luctus nunc eu nisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse lectus sem, commodo vitae, scelerisque eget, varius vitae, neque. Maecenas sed risus. Pellentesque erat. Morbi varius elit id augue. In ultrices vulputate mauris. Vivamus libero ligula, viverra eget, placerat at, adipiscing at, elit. Quisque sapien eros, fermentum a, cursus vel, dignissim id, massa. Donec hendrerit neque sit amet arcu. Cras adipiscing tincidunt elit. Praesent at enim ac lacus malesuada porttitor. Nullam nec diam eu erat posuere mollis. Cras eget urna. Pellentesque sed arcu. Vestibulum lacinia mattis lacus. Curabitur ornare felis ac eros. Fusce convallis est id nisi.
		</p>
	</div>
	</div>
</div>-->

<!--<div class=" panel">
	<div class=" accordion-toggle accordion-toggle-active">
		<div class=" arrow-down"></div>
		<div class=" accordion-title" style="padding-left: 1.5%; font-weight: bold; width: 100%;">Title 1</div>
	</div>
	<div id="divContent1" style="width: 900px; height: 700px; display: block;" class=" accordion-content">
		<div id="divContent1Child" style="width: 100%; height: 100%;margin:100px">
			
		</div>
	</div>
</div>-->
<!--<div class=" panel">
	<div class=" accordion-toggle accordion-toggle-active">
		<div class=" arrow-down"></div>
		<div class=" accordion-title" style="padding-left: 1.5%; font-weight: bold; width: 100%;">Title 1</div>
	</div>
	<div id="divContent1" class=" accordion-content">
		<div id="divContent1Child" style="width: 100%; height: 100%;margin:100px">
			<div id="line_top_x">
			</div>
		</div>
	</div>
</div>-->

</body>
</html>
