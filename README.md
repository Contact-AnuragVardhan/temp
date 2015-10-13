<!--https://github.com/720kb/angular-tooltips -->
<!doctype html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html">
  <title>Full CSS3 Tooltips - Design Shack Demo</title>
    <link rel="stylesheet" type="text/css" href="http:cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css"/>
  <link rel="stylesheet" type="text/css" media="all" href="styles.css">
</head>

<body>
	<div class="col5">
		<div class="line-compress">
		 <a class="btn btn-medium center-content radius3 bg-purple color-white ng-isolate-scope" tooltips="" tooltip-size="medium" title="Top tooltip" tooltip-side="top">
		  Top
		</a>
	  </div>
	</div>
	<!--<div class="_720kb-tooltip _720kb-tooltip-medium _720kb-tooltip-right _720kb-tooltip-open" style="top: 282px; left: 156px;">
		<div class="_720kb-tooltip-title"> Left tooltip</div> 
		<span class="_720kb-tooltip-caret"></span>
	</div>
	<div class="_720kb-tooltip _720kb-tooltip-medium _720kb-tooltip-top _720kb-tooltip-open" style="top: 238px; left: 168.5px;">
		<div class="_720kb-tooltip-title"> Top tooltip</div> 
		<span class="_720kb-tooltip-caret"></span>
	</div>
	<div class="_720kb-tooltip _720kb-tooltip-medium _720kb-tooltip-bottom _720kb-tooltip-open" style="top: 326px; left: 295px;">
		<div class="_720kb-tooltip-title"> Bottom tooltip</div> 
		<span class="_720kb-tooltip-caret"></span>
	</div>
	<div class="_720kb-tooltip _720kb-tooltip-medium _720kb-tooltip-right _720kb-tooltip-open" style="top: 273px; left: 572px;">
		<div class="_720kb-tooltip-title"> Right tooltip</div> 
		<span class="_720kb-tooltip-caret"></span>
	</div> -->
	<button onclick="showToolTip()">Add Tip</button>
	<button id="btnRemove" onclick="hideTip()">Remove Tip</button>
	<input id="txtTest" type="text" onmouseover="showToolTip()" onmouseleave="hideTip()">
	</input>
	<script>
		function showToolTip()
		{
			var btnRemove = document.querySelector("#btnRemove");
			var txtTest = document.querySelector("#txtTest");
			showTip(txtTest,'This is a tip','bottom');
		}
		var divTipContainer = null;
		var divTip = null;
		function showTip(component,tipText,position)
		{
			if(!divTipContainer)
			{
				createTip(component,tipText,position);
			}
			removeAllChildren(divTip);
			divTip.appendChild(document.createTextNode(tipText));
			addStyleClass(divTipContainer,"_720kb-tooltip-open");
		}
		
		function removeTip()
		{
			if(divTipContainer)
			{
				document.body.removeChild(divTipContainer);
				divTipContainer = null;
			}
		}
		
		function hideTip()
		{
			if(divTipContainer)
			{
				removeStyleClass(divTipContainer,"_720kb-tooltip-open");
			}
		}
		
		function createTip(component,tipText,position)
		{
			if(!divTipContainer)
			{
				divTipContainer = document.createElement("div");
				addStyleClass(divTipContainer,"_720kb-tooltip");
				addStyleClass(divTipContainer,"_720kb-tooltip-medium");
				var posStyle = "_720kb-tooltip-top";
				switch (position.toLowerCase())
				{
					case "top":
						posStyle = "_720kb-tooltip-top";
						break;
					case "bottom":
						posStyle = "_720kb-tooltip-bottom";
						break;
					case "left":
						posStyle = "_720kb-tooltip-left";
						break;
					case "right":
						posStyle = "_720kb-tooltip-right";
						break;
				}
				addStyleClass(divTipContainer,posStyle);
				document.body.appendChild(divTipContainer);
				divTip = document.createElement("div");
				addStyleClass(divTip,"_720kb-tooltip-title");
				divTipContainer.appendChild(divTip);
				var span = document.createElement("span");
				addStyleClass(span,"_720kb-tooltip-caret");
				divTipContainer.appendChild(span);
				placeToolTip(component,position);
			}
		}
		
		function placeToolTip(component,position)
		{
			var offsetTop = getOffsetTop(component);
			var offsetLeft = getOffsetLeft(component);
			var height = component.offsetHeight;
			var width = component.offsetWidth;
			var theTooltipHeight = divTipContainer.offsetHeight;
			var theTooltipWidth = divTipContainer.offsetWidth;
			var theTooltipMargin = 9;
			var topValue = 0;
            var leftValue = 0;

			switch (position.toLowerCase())
			{
				case "top":
					topValue = offsetTop - theTooltipMargin - theTooltipHeight;
					leftValue = offsetLeft + width / 2 - theTooltipWidth / 2;

					divTipContainer.style.top = topValue + "px";
					divTipContainer.style.left = leftValue + "px";
					break;
				case "bottom":
					topValue = offsetTop + height + theTooltipMargin;
					leftValue = offsetLeft + width / 2 - theTooltipWidth / 2;
					divTipContainer.style.top = topValue + 'px';
					divTipContainer.style.left = leftValue + 'px';
					break;
				case "left":
					topValue = offsetTop + height / 2 - theTooltipHeight / 2;
					leftValue = offsetLeft - (theTooltipWidth + theTooltipMargin);

					divTipContainer.style.top = topValue + 'px';
					divTipContainer.style.left = leftValue + 'px';
					break;
				case "right":
					topValue = offsetTop + height / 2 - theTooltipHeight / 2;
					leftValue = offsetLeft + width + theTooltipMargin;

					divTipContainer.style.top = topValue + 'px';
					divTipContainer.style.left = leftValue + 'px';
					break;
			}
		}
		
		function getOffsetTop(elem) 
		{
          var offtop = elem.getBoundingClientRect().top + window.scrollY;
          //ie8 - 11 fix - window.scrollY is undefied, and offtop is NaN.
          if (isNaN(offtop)) 
		  {
            //get the offset on old properties
            offtop = elem.getBoundingClientRect().top + window.pageYOffset;
          }
          return offtop;
        }

        function getOffsetLeft(elem) 
		{
          var offleft = elem.getBoundingClientRect().left + window.scrollX;
          //ie8 - 11 fix - window.scrollX is undefied, and offtop is NaN.
          if (isNaN(offleft)) 
		  {
            //get the offset on old properties
            offleft = elem.getBoundingClientRect().left + window.pageXOffset;
          }
          return offleft;
        }
		
		function addStyleClass(divAlert,styleClass)
		{
			if(divAlert && styleClass && styleClass.length > 0)
			{
				if(document.body.classList)
				{
					if(!hasStyleClass(divAlert,styleClass))
					{
						divAlert.className += " " + styleClass;
					}
				}
				else
				{
					if(!hasStyleClass(divAlert,styleClass))
					{
						divAlert.classList.add(styleClass);
					}
				}
			}
		}
		
		function hasStyleClass(divAlert,styleClass)
		{
			if(divAlert && styleClass && styleClass.length > 0)
			{
				try
				{
					if(document.body.classList)
					{
						return (divAlert.className.indexOf(" " + styleClass) > -1);
					}
					else if(divAlert.classList.contains)
					{
						return divAlert.classList.contains(styleClass);
					}
				}
				catch(error)
				{
					
				}
				
			}
			return false;
		}
		
		function removeStyleClass(divAlert,styleClass)
		{
			if(divAlert && styleClass && styleClass.length > 0)
			{
				if(document.body.classList)
				{
					if(divAlert.className)
					{
						divAlert.className = divAlert.className.replace(styleClass,"");
					}
				}
				else
				{
					divAlert.classList.remove(styleClass);
				}
			}
		}
		
		function removeAllChildren(element) 
		{
			if(element)
			{
				var node = element;
				while (element.hasChildNodes()) 
				{              

					if (node.hasChildNodes()) 
					{                
						node = node.lastChild;                 
					}
					else 
					{                                     
						node = node.parentNode;                
						node.removeChild(node.lastChild);      
					}
				}
			}
		}
	</script>

</body>
</html>
