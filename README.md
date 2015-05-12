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
<style>

div.accordion-toggle
{
	position: relative; /* required for effect */
	z-index: 10;		/* required for effect */
	background: #3f3c38 url(../img/off.jpg) repeat-x;
	background-position: bottom;
	color: #fff;   
	cursor: pointer;
	margin-bottom: 1px;
	padding: 9px 14px 6px 14px;
	border-top: 1px solid #5d5852;	
}

div.accordion-toggle:hover, div.accordion-toggle-active
{
	background-image: url(../img/on.jpg);
	background-color: #6d493a;
	border-top: 1px solid #a06b55;
}

div.accordion-content
{
	overflow: hidden;	/* required for effect */
	background: #302e2c;
	padding: 0;
	color: #c4bab1;
}

div.accordion-content p
{
	margin: 9px 24px 6px 24px;
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
		
		
		var objAc = new Object() ;
		objAc.accordionFields = objAccordion ;
		objAc.visible
		
		var parentContainer = null;
	
		var toggleClass = "accordion-toggle";
        var toggleActive = "accordion-toggle-active";
        var contentClass = "accordion-content";
        
        function initialise(parentContainerID)
        {
        	if(parentContainerID && objAccordion && objAccordion.length > 0)
        	{
        		parentContainer = getElement(parentContainerID);
        		if(parentContainer)
        		{
        			for(var count = 0;count < objAccordion.length;count++)
            		{
            			var item = 	objAccordion[count];
            			if(item && item["title"] && item["content"])
            			{
            				createContainer(item["title"],item["content"]);
            			}
            		}
            		closeAllContainers();        			
        		}
        	}
        }
        
        function createContainer(title,contentID)
        {
        	var divTitle = document.createElement("div");
        	addClass(divTitle,toggleClass);
        	divTitle.innerHTML = title;
        	divTitle.addEventListener("click", titleClickHandler);
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
        	parentContainer.appendChild(divTitle);
        	parentContainer.appendChild(divContent);
        }
        
        function titleClickHandler(event)
        {
        	if(event && event.target && hasClass(event.target,toggleClass))
        	{
        		var divTitle = event.target;
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
   			         		closeAllContainers();
	   		        		if(hasClass(divTitle, toggleActive)) 
	   			   			{
	   			   				 closeContainer(divTitle,divContent);
	   			   		    }
	   			   			else
	   			   			{
	   			   				 openContainer(divTitle,divContent);
	   			   			}
	   		        	}
   			         	break;
   			        }
   			    }
        	}
        }
		
		function closeAllContainers()
		{
			if(parentContainer)
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
		
		function getAllTitles()
		{
			var titles = null;
			if(parentContainer)
			{
				titles = parentContainer.getElementsByClassName(toggleClass);
			}
			return titles;
		}
		
		function getAllContents()
		{
			var contents = null;
			if(parentContainer)
			{
				contents = parentContainer.getElementsByClassName(contentClass);
			}
			return contents;
		}
		
		function openContainer(divTitle,divContent)
		{
			 addClass(divTitle, toggleActive);
			 divContent.style.display = 'block';
			 divContent.style.height = '276px';
		}
		
		function closeContainer(divTitle,divContent)
		{
			removeClass(divTitle, toggleActive);
			divContent.style.display = 'none';
			divContent.style.height = '0px';
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
	<div id="divAccordion">
	</div>
	<div id="divContent1">
		<p>
			Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse malesuada mi vel risus. Nulla ipsum risus, malesuada gravida, dapibus et, dapibus rhoncus, orci. Quisque suscipit. Praesent sed tellus facilisis lectus ultrices laoreet. Donec eu orci in metus egestas hendrerit. In hac habitasse platea dictumst. Integer blandit ultricies erat. Nunc viverra blandit velit. Maecenas tristique tortor non ante. In pharetra mi quis metus. Cras urna dolor, volutpat et, tincidunt quis, accumsan a, erat. Donec et dolor at elit congue molestie. In mi sapien, porta ut, cursus placerat, sodales in, libero. Aliquam tempus vestibulum ipsum. Suspendisse ligula orci, dignissim eu, laoreet ut, interdum sit amet, tortor. Vestibulum est lacus, sagittis faucibus, sollicitudin fringilla, pretium non, ipsum. Quisque enim. Nullam tortor mi, posuere et, pellentesque ut, laoreet quis, lectus. Mauris euismod aliquet mi. Pellentesque eu pede vitae nibh imperdiet convallis.
		</p>
		<p>	
			Mauris dictum congue lectus. Fusce erat elit, imperdiet non, aliquam sed, lobortis id, libero. Donec dui erat, sollicitudin sed, blandit eget, aliquam non, mauris. Mauris lobortis. Suspendisse orci metus, lobortis ut, sollicitudin et, laoreet eu, ligula. Pellentesque at tellus sed nunc volutpat convallis. Suspendisse tincidunt, erat ac pretium luctus, dolor purus tincidunt justo, eu semper massa massa ac dui. Morbi vel arcu ut elit placerat consequat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas est dui, luctus id, tempor a, dapibus lacinia, nunc. In vulputate, ipsum eget tempor aliquam, mauris enim ornare risus, vitae rhoncus purus ligula ut urna. In eu arcu. Aliquam erat volutpat. Donec purus enim, malesuada quis, aliquet vel, dapibus eu, lacus. In laoreet nulla id mi. Cras bibendum semper lacus. Nunc id sapien in ligula consectetuer semper. Nunc enim elit, interdum id, tincidunt et, ultrices eu, arcu.  
		</p>
	</div>
	<div id="divContent2">
		<b>Test123</b>
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
	<!--  <div id="test-accordion">
	<div id="divTitle1" class="accordion-toggle accordion-toggle-active" onclick="onClick('divTitle1','divContent1')">Main</div>
	<div id="divContent1" class="accordion-content" style="height: 276px;">
		<p>
			Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse malesuada mi vel risus. Nulla ipsum risus, malesuada gravida, dapibus et, dapibus rhoncus, orci. Quisque suscipit. Praesent sed tellus facilisis lectus ultrices laoreet. Donec eu orci in metus egestas hendrerit. In hac habitasse platea dictumst. Integer blandit ultricies erat. Nunc viverra blandit velit. Maecenas tristique tortor non ante. In pharetra mi quis metus. Cras urna dolor, volutpat et, tincidunt quis, accumsan a, erat. Donec et dolor at elit congue molestie. In mi sapien, porta ut, cursus placerat, sodales in, libero. Aliquam tempus vestibulum ipsum. Suspendisse ligula orci, dignissim eu, laoreet ut, interdum sit amet, tortor. Vestibulum est lacus, sagittis faucibus, sollicitudin fringilla, pretium non, ipsum. Quisque enim. Nullam tortor mi, posuere et, pellentesque ut, laoreet quis, lectus. Mauris euismod aliquet mi. Pellentesque eu pede vitae nibh imperdiet convallis.
		</p>
		<p>	
			Mauris dictum congue lectus. Fusce erat elit, imperdiet non, aliquam sed, lobortis id, libero. Donec dui erat, sollicitudin sed, blandit eget, aliquam non, mauris. Mauris lobortis. Suspendisse orci metus, lobortis ut, sollicitudin et, laoreet eu, ligula. Pellentesque at tellus sed nunc volutpat convallis. Suspendisse tincidunt, erat ac pretium luctus, dolor purus tincidunt justo, eu semper massa massa ac dui. Morbi vel arcu ut elit placerat consequat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas est dui, luctus id, tempor a, dapibus lacinia, nunc. In vulputate, ipsum eget tempor aliquam, mauris enim ornare risus, vitae rhoncus purus ligula ut urna. In eu arcu. Aliquam erat volutpat. Donec purus enim, malesuada quis, aliquet vel, dapibus eu, lacus. In laoreet nulla id mi. Cras bibendum semper lacus. Nunc id sapien in ligula consectetuer semper. Nunc enim elit, interdum id, tincidunt et, ultrices eu, arcu.  
		</p>
	</div>
	<div id="divTitle2" class="accordion-toggle" onclick="onClick('divTitle2','divContent2')">Why Use Us</div>
	<div id="divContent2"  class="accordion-content" style="height: 0px; display: none;">
		<p>
			Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec vel justo. Integer ornare dignissim lectus. Nunc tellus. Donec pharetra aliquam neque. Vestibulum ornare tincidunt mauris. Duis ut felis et ipsum feugiat faucibus. Phasellus enim magna, sodales id, mollis vel, fringilla et, felis. Integer placerat, tortor eu blandit eleifend, elit leo fringilla orci, quis tristique leo justo ut quam. Aenean dolor. Donec tempus. Ut dapibus odio vitae ligula.
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec vel justo. Integer ornare dignissim lectus. Nunc tellus. Donec pharetra aliquam neque. Vestibulum ornare tincidunt mauris. Duis ut felis et ipsum feugiat faucibus. Phasellus enim magna, sodales id, mollis vel, fringilla et, felis. Integer placerat, tortor eu blandit eleifend, elit leo fringilla orci, quis tristique leo justo ut quam. Aenean dolor. Donec tempus. Ut dapibus odio vitae ligula.                            
		</p>
	</div>
	<div id="divTitle3" class="accordion-toggle" onclick="onClick('divTitle3','divContent3')">Our Prices</div>
	<div id="divContent3"  class="accordion-content" style="display: none; height: 0px;">
		<p>
		In posuere velit sit amet tortor. Donec elementum ipsum at ante luctus elementum. Duis varius dolor a tortor. Donec mi. Phasellus posuere. Mauris enim erat, commodo et, porta quis, consequat quis, nibh. Maecenas convallis eleifend ante. Phasellus metus metus, tempor sed, rhoncus ac, feugiat a, ante. Morbi sit amet ipsum. Cras eu leo quis pede condimentum tempor. Curabitur dictum elit sed lacus. Sed tortor magna, euismod non, mollis a, egestas nec, quam. Fusce porttitor porttitor nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce faucibus, ipsum vel consequat sodales, odio nulla pretium elit, sit amet tempor magna dolor vitae tellus. Quisque odio.
		</p>
	</div>
	<div id="divTitle4" class="accordion-toggle" onclick="onClick('divTitle4','divContent4')">Contact Us</div>
	<div id="divContent4"  class="accordion-content" style="display: none; height: 0px;">
		<p>
		Nulla eget ante. In luctus nunc eu nisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse lectus sem, commodo vitae, scelerisque eget, varius vitae, neque. Maecenas sed risus. Pellentesque erat. Morbi varius elit id augue. In ultrices vulputate mauris. Vivamus libero ligula, viverra eget, placerat at, adipiscing at, elit. Quisque sapien eros, fermentum a, cursus vel, dignissim id, massa. Donec hendrerit neque sit amet arcu. Cras adipiscing tincidunt elit. Praesent at enim ac lacus malesuada porttitor. Nullam nec diam eu erat posuere mollis. Cras eget urna. Pellentesque sed arcu. Vestibulum lacinia mattis lacus. Curabitur ornare felis ac eros. Fusce convallis est id nisi.
		</p>
	</div>
</div>-->

</body>
</html>
