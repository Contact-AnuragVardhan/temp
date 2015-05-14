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
}

.accordion-toggle:hover
{
	/*background-color: #0000FF;*/
	border-top: 1px solid #a06b55;
}

.accordion-toggle-active
{
	/*background-color: #0000FF;*/
	border-bottom: 1px solid #5d5852;
}

.accordion-title
{
	  
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
		      {title:'You are on track to receive <span style="color:red;font-weight:bold;">2000</span>$ per year during retirement. It is <span style="color:red;font-weight:bold;">below</span> than your peers',content:"#divContent1"},
		      {title:'Your 401k ROI which is <span style="color:red;font-weight:bold;">below</span> than your peers',content:"#divContent2"},
		      {title:'Your current 401k balance which is <span style="color:red;font-weight:bold;">below</span> than your peers',content:"#divContent3"},
		      {title:'Your contributions which is <span style="color:red;font-weight:bold;">more</span> than your peers',content:"#divContent4"}
		 ];
		
		var ANIMATION_INTERVAL = 10;
		var animationRequired = false;
		
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
				var parentDivs = __parentContainer.getElementsByClassName(parentClass);
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
				renderChart(divTitle,divContent);
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
	google.load('visualization', '1.1', {packages: ['corechart']});
    google.setOnLoadCallback(drawChart);
	
    var dataRecieve;
    var optionsRecieve;
    var hasRecieveChartRendered = false;
    
    var viewRateOfInterest;
    var optionsRateOfInterest;
    var hasRateOfInterestChartRendered = false;
    function drawChart() 
    {
      dataRecieve = new google.visualization.DataTable();
      dataRecieve.addColumn('number', 'Age');
      dataRecieve.addColumn('number', '7% Annual Return');
      dataRecieve.addColumn('number', '5% Orignal Return');
      dataRecieve.addColumn('number', '2% Annual Fees');

      var arrData = getAmount(30,67,100000,7,5,2);
      dataRecieve.addRows(arrData);

      optionsRecieve = 
      {
           title: 'The Power of Compounding - How fees eat away at your retirement',
           height:350,
           width:'70%',
           series: 
           {
               0: { color: 'blue' },
               1: { color: 'yellow' },
               2: { color: 'red' }
           },
           hAxis: 
           {
              title: 'Age'
           },
           vAxis: 
           {
              title: 'Amount (in USD)'
           }
      };
      
      //*************************************************************************************************//
       var dataRateOfInterest = google.visualization.arrayToDataTable([
                            ["Owner", "Rate Of Interest", { role: "style" } ],
                            ["You", 7, "blue"],
                            ["Average", 9, "Red"]
                          ]);

         viewRateOfInterest = new google.visualization.DataView(dataRateOfInterest);
         /*viewRateOfInterest.setColumns([0, 1,
                          { calc: "stringify",
                            sourceColumn: 1,
                            type: "string",
                            role: "annotation" },
                          2]); */

           optionsRateOfInterest = 
           {
             title: "Rate Of Interest Comparison",
             width: '100%',
             height: 350,
             bar: {groupWidth: "20%"},
             legend: { position: "right" }
           };
      
      
    }
    
    function getAmount(startAge,endAge,startingBalance,rateOfIdealReturn,rateOfActualReturn,rateOfAnnualFees)
    {
    	var retArray = new Array();
    	var yearsToBeCalculated = endAge - startAge;
    	var totalAmountIdeal = startingBalance;
    	var totalAmountActual = startingBalance;
    	var totalAmountFees = startingBalance;
    	var count;
    	for(count = 1;count <= yearsToBeCalculated;count++)
    	{
    		totalAmountIdeal += (rateOfIdealReturn/100) * totalAmountIdeal;
    		totalAmountActual += (rateOfActualReturn/100) * totalAmountActual;
    		totalAmountFees += (rateOfAnnualFees/100) * totalAmountFees;
    		retArray[count - 1] = [count + startAge,totalAmountIdeal,totalAmountActual,totalAmountFees]; 
    	}
    	return retArray;
    }
    
    
    function renderChart(divTitle,divContent)
    {
    	if(divContent)
    	{
    		if(divContent.getAttribute("id") === "divContent1")
    		{
    			if(!hasRecieveChartRendered)
    	    	{
    	    		hasRecieveChartRendered = true;
    	    		var chart = new google.visualization.LineChart(document.getElementById('divContent1Child'));
    	            chart.draw(dataRecieve, optionsRecieve);
    	    	}
    		}
    		else if(divContent.getAttribute("id") === "divContent2")
    		{
    			if(!hasRateOfInterestChartRendered)
    	    	{
    				hasRateOfInterestChartRendered = true;
    	    		var chart = new google.visualization.ColumnChart(document.getElementById("divContent2Child"));
    	    	    chart.draw(viewRateOfInterest, optionsRateOfInterest);
    	    	}
    		}
    	}
    }
      
		</script>
	<div id="divAccordion">
	</div>
	<div id="divContent1" style="width: 100%; height: 400px;">
		<div id="divContent1Child" style="padding-top: 10px;padding-left: 10px;">
		</div>
	</div>
	<div id="divContent2" style="width: 100%; height: 400px;">
		<div id="divContent2Child" style="padding-top: 10px;padding-left: 10px;">
		</div>
	</div>
	<div id="divContent3">
		<div id="divContent3Child" style="padding-top: 10px;padding-left: 10px;">
		</div>
	</div>
	<div id="divContent4">
		<div id="divContent4Child" style="padding-top: 10px;padding-left: 10px;">
		</div>
	</div>
</body>
</html>
