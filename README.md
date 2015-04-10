
.tooltip {
position:relative; /* make span relative to anchor */
text-decoration:none; /* no underline */
cursor:pointer; /* make cursor point */
}

.tooltip span { /* main body of tooltip */
	position:absolute; /* AP it */
	bottom:66px; /* FADE IN/OUT BEGIN */
	left:50%; /* CENTER TOOLTIP */
	margin-left:-72px; /* CENTER TOOLTIP */
	width:130px; /* tootip width */
	opacity:0; /* HIDE TOOLTIP in modern browsers */
	visibility:hidden; /* HIDE TOOLTIP in IE */
	padding:10px 5px; /* padding */
	color:#fff; /* text color */
	font:bold 75%/1.5 Arial, Helvetica, sans-serif; /* font */
	text-align:center; /* center text */
	pointer-events:none; /* no unintended tooltip popup for modern browsers */
	border-radius:6px; /* round corners */
	text-shadow:1px 1px 2px rgba(0, 0, 0, 0.6); /* text shadow */
	background:rgb(46,182,238); /* IE6/7/8 */
	background:rgba(46,182,238,.8); /* modern browsers */
	border:2px solid rgb(255,255,255); /* IE6/7/8 */
	border:2px solid rgba(255,255,255,.8); /* modern browsers */
	box-shadow:0px 2px 4px rgba(0,0,0,0.5); /* shadow */
	-webkit-transition:all 0.3s ease-in-out; /* animate tooltip */
	-moz-transition:all 0.3s ease-in-out; /* animate tooltip */
	-o-transition:all 0.3s ease-in-out; /* animate tooltip */
	-ms-transition:all 0.3s ease-in-out; /* animate tooltip */
	transition:all 0.3s ease-in-out; /* animate tooltip */
}

.tooltip span.dif { /* different width tooltip */
	width:190px; /* width */
	margin-left:-102px; /* center it */
}

.tooltip span:before, .tooltip span:after { /* bottom triangle - the white border */
content:''; /* add html content */
position:absolute; /* AP bottom triangle */
bottom:-13px; /* position bottom triangle */
left:50%; /* center bottom triangle */
margin-left:-12px; /* center bottom triangle */
border-left:12px solid transparent; /* build bottom triangle */
border-right:12px solid transparent; /* build bottom triangle */
border-top:12px solid rgb(255,255,255); /* build bottom triangle IE6/7/8 */
border-top:12px solid rgba(255,255,255,.8); /* build bottom triangle modern browsers */
}

.tooltip span:after { /* top triangle - the blue background */
bottom:-10px; /* position top triangle */
margin-left:-10px; /* center top triangle */
border-width:10px; /* build top triangle */
border-top:10px solid rgb(46,182,238); /* build top triangle IE6/7/8 */
border-top:10px solid rgba(46,182,238,.8); /* build top triangle modern browsers */
}

.tooltip:hover span { /* reveal tooltip */
opacity:1; /* REVEAL TOOLTIP in modern browsers */
bottom:44px; /* FADE IN/OUT END */
visibility:visible; /* REVEAL TOOLTIP in IE */
}

.tooltip span:hover {
visibility:hidden; /* hide tooltip when moving from link to span in IE */
}
---------------------------------------------------------------------------------------

function Modal()
{
	this.divFade = null;
	this.divOverlay = null;
	this.divTitleBar = null;
	this.btnClose = null;
	this.isCloseAllowed = true;
	this.isTitleAllowed = true;
	this.titleStyle = "titleBar";
	this.closeButtonStyle = "closeButton";
};

Modal.prototype.showModal = function (childComponent,title,isTitleRequired,isCloseRequired)
{
	this.isCloseAllowed = isCloseRequired;
	this.isTitleAllowed = isTitleRequired;
	if(!this.divFade)
	{
		this.createFade();
	}
	if(!this.divOverlay)
	{
		this.createOverlay(title,childComponent);
	}
	if(this.isCloseAllowed)
	{
		//To detect escape button
		document.onkeydown = this.onkeydown.bind(this); 
	}
	
	this.setModalVisibility(true);
};

Modal.prototype.onkeydown = function (event)
{
	event = event || window.event;
	if (event.keyCode == 27) 
	{
		this.closeModal();
	}
}

Modal.prototype.hideModal = function ()
{
	this.setModalVisibility(false);
	if(isVariable("OVERLAY_CLOSE_EVENT"))
	{
		new Event().dispatch(OVERLAY_CLOSE_EVENT);
	}
};

Modal.prototype.closeModal = function ()
{
	this.removeModal.bind(this);
	this.removeModal();
};

Modal.prototype.removeModal = function ()
{
	this.removeFade();
	this.removeOverlay();
};

Modal.prototype.setModalVisibility = function (isVisible)
{
	this.setFadeVisibility(isVisible);
	this.setOverlayVisibility(isVisible);
};

Modal.prototype.createFade = function ()
{
	this.divFade = createDiv("divFade");
	this.divFade.style.display = "none";
	this.divFade.style.position = "absolute";
	this.divFade.style.left = "0%";
	this.divFade.style.top = "0%";
	this.divFade.style.backgroundColor = "#000000"; 
	this.divFade.style.opacity = "0.7";
	this.divFade.style.filter = "alpha(opacity=70)"; // For Internet Explorer
	this.divFade.style.width = "100%";
	this.divFade.style.height = "100%";
	this.divFade.style.zIndex = "90";
	
	document.body.appendChild(this.divFade);  
};

Modal.prototype.setFadeVisibility = function (isVisible)
{
	if(this.divFade)
	{
		setDivVisibility("divFade",isVisible);
	}
};

Modal.prototype.removeFade = function ()
{
	removeDiv("divFade");
	this.divFade = null;
};

Modal.prototype.createCloseButton = function ()
{
	var closeStyle = null;
	if(this.closeButtonStyle)
	{
		closeStyle = this.closeButtonStyle;
	}
	else
	{
		closeStyle = "closeButton";
	}
	closeStyle = closeStyle + " " + "tooltip";
	this.btnClose = document.createElement("a");
	this.btnClose.setAttribute("href","javascript:void(0)");
	
	this.btnClose.className = closeStyle;
	/*this.btnClose.onmouseover = function() 
	{ 
		this.className = "closeButton_hover"; 
	};
	this.btnClose.onmouseout = function() 
    { 
    	this.className = "closeButton"; 
    };*/
    this.btnClose.style.textDecoration="none";
	//btnClose.style.color = "#FFFFFF"; 
	if(isBrowserIE())
	{
		this.btnClose.style.styleFloat = "right";
	}
	else
	{
		this.btnClose.style.cssFloat = "right";
	}
	this.btnClose.style.clear = "both"; 
	//this.btnClose.style.paddingRight = "10px";
	this.btnClose.innerHTML = "X";
	var toolTip = document.createElement("SPAN");
	var toolTipText = document.createTextNode("Click here to Close");
	toolTip.appendChild(toolTipText);
	this.btnClose.appendChild(toolTip);
	this.btnClose.onclick = this.removeModal.bind(this);
};

Modal.prototype.createTitleBar = function (title)
{
	var titleBarStyle = null;
	if(this.titleStyle)
	{
		titleBarStyle = this.titleStyle;
	}
	else
	{
		titleBarStyle = "titleBar";
	}
	this.divTitleBar = createDiv("divTitleBar",titleBarStyle);
	this.divTitleBar.style.width = "99%";
	//divTitleBar.style.backgroundColor = "#3D72C0"; 
	//divTitleBar.style.color = "#FFFFFF"; 
	//divTitleBar.style.padding = "5px";
	this.divTitleBar.innerHTML = title;
	if(this.isCloseAllowed)
	{
		this.createCloseButton();
		this.divTitleBar.appendChild(this.btnClose);  
	}
};


Modal.prototype.createOverlay = function (title,childComponent)
{
	this.divOverlay = createDiv("divOverlay","popUp");
	this.divOverlay.style.display = "none";
	this.divOverlay.style.position = "absolute";
	//stops children from overflowing
	//this.divOverlay.style.overflow = "hidden";
	//divOverlay.style.left = "25%";
	//divOverlay.style.top = "25%";
	this.divOverlay.style.padding = "0px";
	//divOverlay.style.border="1px solid #000000";
	//divOverlay.style.backgroundColor = "#ffffff"; 
	//divOverlay.style.width = "50%";
	//divOverlay.style.height = "50%";
	this.divOverlay.style.zIndex = "99999";
	if(this.isTitleAllowed)
	{
		this.createTitleBar(title);
		this.divOverlay.appendChild(this.divTitleBar);
	}
	if(childComponent)
	{
		this.divOverlay.appendChild(childComponent);
	}
	
	document.body.appendChild(this.divOverlay); 
};

Modal.prototype.setOverlayVisibility = function (isVisible)
{
	if(this.divOverlay)
	{
		setDivVisibility("divOverlay",isVisible);
	}
};

Modal.prototype.removeOverlay = function ()
{
	removeDiv("divOverlay");
	this.divOverlay = null;
};

//Helper functions
function createElement(type,id,value,styleName,clickHandler) 
{
	 var element = document.createElement("input");
	 element.type = type;
	 element.id = id;
	 if(value)
	 {
		 element.value = value;
	 }
	 if(styleName)
	 {
		 element.className = styleName;   
	 }
	 if(clickHandler)
	 {
		 element.onclick = clickHandler;
	 }
	 
	 return element;
}


function createDiv(id,styleName)
{
    var div = document.createElement("div");  
    div.id = id;  
    if(styleName)
    {
        div.className = styleName;   
    }
    return div;
}

function createButton(id,value,styleName,clickHandler)
{
	return createElement("button",id,value,styleName,clickHandler);
}

function setDivVisibility(id,isVisible)
{
    var div = document.getElementById(id);
    if(div)
    {
        if(isVisible)
        {
            div.style.display = "block";
        }
        else
        {
            div.style.display = "none";
        }
    }
}

function removeDiv(id)
{
    var div = document.getElementById(id);
    if (div)
    {
        var parent = div.parentNode;
        if(parent)
        {
            parent.removeChild(div);
        }
    }
}

function isElement(refElement)
{
    return !!(refElement && refElement.nodeType == 1);
}

function isArray(refArr) 
{
    return refArr != null && typeof refArr == "object" &&
      "splice" in refArr && "join" in refArr;
}

function isVariable(variableName) 
{
	return !isUndefined(window[variableName]); 
}

function callFunction(functionName) 
{
	if (typeof window[functionName] === "function") 
	{
	    window[functionName](); 
	}
}

function isFunction(refFunction) 
{
    if(refFunction && typeof refFunction == "function")
    {
    	return true;
    }
    return false;
}

function isString(object) 
{
    return typeof object == "string";
}

function isNumber(object) 
{
    return typeof object == "number";
}
  
function isUndefined(object) 
{
    return typeof object == "undefined";
}

function isBrowserIE()
{
    if(navigator && navigator.appName && navigator.appName == "Microsoft Internet Explorer")
    {
        return true;
    }
    return false;
}

function getElementHeight(objElement)
{
	var elementHeight = 0;
    if (objElement)
    {
		if(objElement.offsetHeight)          
		{
			elementHeight = objElement.offsetHeight;
		}    
		else if(objElement.style.pixelHeight)
		{
			elementHeight = objElement.style.pixelHeight;
		}  
	}
	return elementHeight;
}

function getRenderedStyleValue(objElement, cssProperty)
{
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle)
	{
		strValue = document.defaultView.getComputedStyle(objElement, "").getPropertyValue(cssProperty);
	}
	else if(objElement.currentStyle)
	{
		cssProperty = cssProperty.replace(/\-(\w)/g, function (strMatch, p1)
		{
			return p1.toUpperCase();
		});
		strValue = objElement.currentStyle[cssProperty];
	}
	return strValue;
}

if (!Function.prototype.bind) 
{
    Function.prototype.bind = function (oThis) 
    {
        if (typeof this !== "function") 
        {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError ("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call (arguments, 1),
                fToBind = this,
                fNOP = function () 
                {
                },
                fBound = function () 
                {
                    return fToBind.apply (this instanceof fNOP && oThis
                    		? this
                            : oThis,
                            aArgs.concat (Array.prototype.slice.call (arguments)));
                };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP ();
        return fBound;
    };
}

-----------------------------------------------------------------------------------------------------


<!DOCTYPE HTML><html><head><meta charset="UTF-8">
<title>CSS3 Animated Tooltip Cross Browser Demo</title>
<style type="text/css">
body {
background:#E1FFE1;
text-align:center;
}
h1 {
margin:50px 0 20px;
}
h2 {
margin:0 0 70px;
}
#box {
margin:auto;
width:430px;
height:200px;
}
/* ------------------ Tooltip ------------------- */
.tooltip {
position:relative; /* make span relative to anchor */
text-decoration:none; /* no underline */
cursor:pointer; /* make cursor point */
}
.tooltip span { /* main body of tooltip */
position:absolute; /* AP it */
bottom:66px; /* FADE IN/OUT BEGIN */
left:50%; /* CENTER TOOLTIP */
margin-left:-72px; /* CENTER TOOLTIP */
width:130px; /* tootip width */
opacity:0; /* HIDE TOOLTIP in modern browsers */
visibility:hidden; /* HIDE TOOLTIP in IE */
padding:10px 5px; /* padding */
color:#fff; /* text color */
font:bold 75%/1.5 Arial, Helvetica, sans-serif; /* font */
text-align:center; /* center text */
pointer-events:none; /* no unintended tooltip popup for modern browsers */
border-radius:6px; /* round corners */
text-shadow:1px 1px 2px rgba(0, 0, 0, 0.6); /* text shadow */
background:rgb(46,182,238); /* IE6/7/8 */
background:rgba(46,182,238,.8); /* modern browsers */
border:2px solid rgb(255,255,255); /* IE6/7/8 */
border:2px solid rgba(255,255,255,.8); /* modern browsers */
box-shadow:0px 2px 4px rgba(0,0,0,0.5); /* shadow */
-webkit-transition:all 0.3s ease-in-out; /* animate tooltip */
-moz-transition:all 0.3s ease-in-out; /* animate tooltip */
-o-transition:all 0.3s ease-in-out; /* animate tooltip */
-ms-transition:all 0.3s ease-in-out; /* animate tooltip */
transition:all 0.3s ease-in-out; /* animate tooltip */
}
.tooltip span.dif { /* different width tooltip */
width:190px; /* width */
margin-left:-102px; /* center it */
}
.tooltip span:before, .tooltip span:after { /* bottom triangle - the white border */
content:''; /* add html content */
position:absolute; /* AP bottom triangle */
bottom:-13px; /* position bottom triangle */
left:50%; /* center bottom triangle */
margin-left:-12px; /* center bottom triangle */
border-left:12px solid transparent; /* build bottom triangle */
border-right:12px solid transparent; /* build bottom triangle */
/* border-top:12px solid rgb(255,255,255); /* build bottom triangle IE6/7/8 */ */
/* border-top:12px solid rgba(255,255,255,.8); /* build bottom triangle modern browsers */ */
}
.tooltip span:after { /* top triangle - the blue background */
bottom:-10px; /* position top triangle */
margin-left:-10px; /* center top triangle */
border-width:10px; /* build top triangle */
 border-top:10px solid rgb(46,182,238); /* build top triangle IE6/7/8 */ 
 border-top:10px solid rgba(46,182,238,.8); /* build top triangle modern browsers */ 
}
.tooltip:hover span { /* reveal tooltip */
opacity:1; /* REVEAL TOOLTIP in modern browsers */
bottom:44px; /* FADE IN/OUT END */
visibility:visible; /* REVEAL TOOLTIP in IE */
}
.tooltip span:hover {
visibility:hidden; /* hide tooltip when moving from link to span in IE */
}
@media (min-device-width:320px) and (max-device-width:768px) {.tooltip span{display:none;}.tooltip:hover span{display:block;} } /* iPad & iPhone simulate :hover */
</style>
<link rel="stylesheet" type="text/css" href="C:/Users/avardhan/Desktop/HTMLTemplate/ModalDemo/assets/css/modal.css"></link>	
<link rel="stylesheet" type="text/css" href="C:/Users/avardhan/Desktop/HTMLTemplate/ModalDemo/assets/css/alert.css"></link>	 
</head>
<body>
<h1>CSS3 Animated Tooltip Cross Browser Demo</h1>
<p><a href="css3-animated-tooltip-cross-browser.php">&laquo; Back To Tutorial</a></p>

<div>
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Quisque tempor. Nam in libero vel nisi accumsan euismod. Quisque quis neque. Donec condimentum, enim convallis vestibulum varius, quam mi accumsan diam, sollicitudin ultricies odio ante vitae purus.</p>
<a class="tooltip"><img src="/code/images/facebook.png" width="28" height="28" alt="Share On Facebook"><span>Share On Facebook</span></a>
<a class="tooltip"><img src="/code/images/twitter.png" width="28" height="28" alt="Share On Twitter"><span>Share On Twitter</span></a>
<a class="tooltip"><img src="/code/images/googleplus.png" width="28" height="28" alt="Share On Google+"><span>Share On Google+</span></a>
<a class="tooltip"><img src="/code/images/pinterest.png" width="28" height="28" alt="Share On Pinterest"><span>Share On Pinterest</span></a>
<a class="tooltip"><img src="/code/images/linkedin.png" width="28" height="28" alt="Share On Lindedin"><span>Share On Linkedin</span></a>
<a class="tooltip"><img src="/code/images/email.png" width="28" height="28" alt="Share With Email"><span>Share With Email</span></a>
<a class="tooltip"><img src="/code/images/addtoany.png" width="28" height="28" alt="Share On Any Social Network"><span class="dif">Share On Any Social Network</span></a>
</div>

<div id="divOverlay" class="popUp alert" style="display: block; position: absolute; padding: 0px; z-index: 99999;">
	<div id="divTitleBar" class="titleBarRed alertTitle" style="width: 99%;">
		<a href="javascript:void(0)" class="closeButtonError tooltip" style="text-decoration: none; float: right; clear: both;">
					Xaaaaaaaaaaaaaaaaaa<span>Click here to Close</span>
		</a>
	</div>
</div>


<!-- <div id="divOverlay" class="popUp alert" style="display: block; position: absolute; overflow: hidden; padding: 0px; z-index: 99999;"> -->
<!-- 	<div id="divTitleBar" class="titleBarRed alertTitle" style="width: 99%;"> -->
<!-- 		Error -->
<!-- 		<a href="javascript:void(0)" class="closeButtonError tooltip" style="text-decoration: none; float: right; clear: both;"> -->
<!-- 			X<span>Click here to Close</span> -->
<!-- 		</a> -->
<!-- 	</div> -->
<!-- 	<div id="divContainer" class="alertNonTitleContainer"> -->
<!-- 		<div id="divBody" class="alertBody">I am Error</div> -->
<!-- 		<div id="divFooter" class="alertFooter"> -->
<!-- 			<input type="button" id="btnClose" value="Close" class="alertButton alertButtonDefault"> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- </div> -->


</body>
</html>
