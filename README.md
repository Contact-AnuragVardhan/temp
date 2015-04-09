Modal.js
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
	this.divOverlay.style.overflow = "hidden";
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
----------------------------------------------------------------------
alert.js
var Alert =  new function()
{
	this.CONFIRM_OK_TEXT = "OK";
	this.CONFIRM_CANCEL_TEXT = "Cancel";
	this.MAX_BODY_HEIGHT = 90;
	
	this.showInfo = function (title,message) 
    {
		var modal = new Modal();
		var btnOK = createButton("btnOK","OK","alertButton alertButtonDefault",this.closePopUp.bind(modal));
		this.initialiseModal(modal,title,message,[btnOK],"titleBar","closeButton");
    };
    
    this.showError = function (title,message) 
    {
    	var modal = new Modal();
		var btnClose = createButton("btnClose","Close","alertButton alertButtonDefault",this.closePopUp.bind(modal));
    	this.initialiseModal(modal,title,message,[btnClose],"titleBarRed","closeButtonError");
    };
    
    this.showConfirmation = function (title,message,handler,okButtonText,cancelButtonText) 
    {
    	var modal = new Modal();
    	if(!okButtonText)
    	{
    		okButtonText = this.CONFIRM_OK_TEXT;
    	}
    	if(!cancelButtonText)
    	{
    		cancelButtonText = this.CONFIRM_CANCEL_TEXT;
    	}
		var btnOK = createButton("btnOK",okButtonText,"alertButton",function()
		{
			this.closePopUp(null,modal);
			if(handler)
			{
				handler(this.CONFIRM_OK_TEXT);
			}
		}.bind(this))
		var btnCancel = createButton("btnCancel",cancelButtonText,"alertButton alertButtonDefault",function()
		{
			this.closePopUp(null,modal);
			if(handler)
			{
				handler(this.CONFIRM_CANCEL_TEXT);
			}
		}.bind(this))
    	this.initialiseModal(modal,title,message,[btnOK,btnCancel],"titleBar","closeButton");
		btnCancel.focus();
    };
	
	this.initialiseModal = function(modal,title,message,arrButton,titleStyle,closeButtonStyle)
	{
		var divContainer = this.createContainer(message,arrButton);
		if(titleStyle)
		{
			modal.titleStyle = titleStyle;
		}
		if(closeButtonStyle)
		{
			modal.closeButtonStyle = closeButtonStyle;
		}
		modal.showModal(divContainer,title,true,true);
		var divOverlay = document.getElementById("divOverlay");
		var divTitleBar = document.getElementById("divTitleBar");
		var divBody = document.getElementById("divBody");
		var divFooter = document.getElementById("divFooter");
		var paddingTop = getRenderedStyleValue(divBody,"padding-top");
		divOverlay.className = divOverlay.className + " alert";
		divTitleBar.className = divTitleBar.className + " alertTitle";
		/*if(paddingTop && paddingTop.indexOf("px") > -1)
		{
			paddingTop = parseInt(paddingTop.substring(0,paddingTop.indexOf("px")));
		}
		else
		{
			paddingTop = 0;
		}
		var paddingBottom = getRenderedStyleValue(divBody,"padding-bottom");
		if(paddingBottom && paddingBottom.indexOf("px") > -1)
		{
			paddingBottom = parseInt(paddingBottom.substring(0,paddingBottom.indexOf("px")));
		}
		else
		{
			paddingBottom = 0;
		}
		var calculatedBodyHeight = ((getElementHeight(divContainer) - getElementHeight(divFooter)) + paddingTop + paddingBottom);
		if(calculatedBodyHeight > this.MAX_BODY_HEIGHT)
		{
			calculatedBodyHeight = this.MAX_BODY_HEIGHT;
		}
		divBody.style.height = calculatedBodyHeight + "px";*/
	};
	
	this.createContainer = function(message,arrButton)
	{
		var divBody = this.createBody(message);
    	var divFooter = this.createFooter(arrButton);
		
		var divContainer = createDiv("divContainer",null);
		divContainer.className = "alertNonTitleContainer";
		divContainer.appendChild(divBody);
		divContainer.appendChild(divFooter);
		
		return divContainer;
	};
	
	this.createBody = function(message)
	{
		var divBody = createDiv("divBody","alertBody");
		divBody.innerHTML = message;
		
		return divBody;
	};
	
	this.createFooter = function(arrButton)
	{
		var divFooter = createDiv("divFooter","alertFooter");
		if(arrButton && arrButton.length > 0)
		{
			for	(index = 0; index < arrButton.length; index++) 
			{
			    var btnAdd = arrButton[index];
			    divFooter.appendChild(btnAdd);
			}
		}
		return divFooter;
	};
	
	
    
    this.closePopUp = function (event,objModal)
    {
    	if(objModal)
    	{
    		objModal.closeModal();
    	}
    	else
    	{
    		this.closeModal();
    	}
    }
}
---------------------------------------------------------------------------------------------------------
modal.css
.popUp
{
    left: 25%; /* positions the div half way horizontally */
    top: 35%; /* positions the div half way vertically */
    border: 2px solid black;
    background-color: #FFFFFF;
    width: 50%;
    height: 28%;
    padding-bottom: 0px;
}

.titleBar
{
	background: #7d7e7d; /* Old browsers */
	background: -moz-linear-gradient(top,  #7d7e7d 0%, #0e0e0e 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#7d7e7d), color-stop(100%,#0e0e0e)); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top,  #7d7e7d 0%,#0e0e0e 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top,  #7d7e7d 0%,#0e0e0e 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(top,  #7d7e7d 0%,#0e0e0e 100%); /* IE10+ */
	background: linear-gradient(to bottom,  #7d7e7d 0%,#0e0e0e 100%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7d7e7d', endColorstr='#0e0e0e',GradientType=0 ); /* IE6-9 */

	color : #FFFFFF;
	font-weight: bold;
	padding-left: 5px;
}

.titleBarGreen
{
	background: #bfd255; /* Old browsers */
	background: -moz-linear-gradient(top,  #bfd255 0%, #8eb92a 54%, #72aa00 56%, #9ecb2d 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#bfd255), color-stop(54%,#8eb92a), color-stop(56%,#72aa00), color-stop(100%,#9ecb2d)); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top,  #bfd255 0%,#8eb92a 54%,#72aa00 56%,#9ecb2d 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top,  #bfd255 0%,#8eb92a 54%,#72aa00 56%,#9ecb2d 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(top,  #bfd255 0%,#8eb92a 54%,#72aa00 56%,#9ecb2d 100%); /* IE10+ */
	background: linear-gradient(to bottom,  #bfd255 0%,#8eb92a 54%,#72aa00 56%,#9ecb2d 100%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#bfd255', endColorstr='#9ecb2d',GradientType=0 ); /* IE6-9 */
	
	color : #FFFFFF;
	font-weight: bold;
	padding-left: 5px;
}

.titleBarRed
{
	background: #ff3019; /* Old browsers */
	background: -moz-linear-gradient(top,  #ff3019 0%, #cf0404 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ff3019), color-stop(100%,#cf0404)); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top,  #ff3019 0%,#cf0404 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top,  #ff3019 0%,#cf0404 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(top,  #ff3019 0%,#cf0404 100%); /* IE10+ */
	background: linear-gradient(to bottom,  #ff3019 0%,#cf0404 100%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff3019', endColorstr='#cf0404',GradientType=0 ); /* IE6-9 */


	color : #FFFFFF;
	font-weight: bold;
	padding-left: 5px;
}

.titleBarOrange
{
	background: #f9c667; /* Old browsers */
	background: -moz-linear-gradient(top,  #f9c667 0%, #f79621 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f9c667), color-stop(100%,#f79621)); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top,  #f9c667 0%,#f79621 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top,  #f9c667 0%,#f79621 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(top,  #f9c667 0%,#f79621 100%); /* IE10+ */
	background: linear-gradient(to bottom,  #f9c667 0%,#f79621 100%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f9c667', endColorstr='#f79621',GradientType=0 ); /* IE6-9 */
	
	color : #0F4085;
	font-weight: bold;
	padding-left: 5px;
}

.titleBarWhite
{
	background: #f6f8f9; /* Old browsers */
	background: -moz-linear-gradient(top,  #f6f8f9 0%, #e5ebee 50%, #d7dee3 51%, #f5f7f9 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f6f8f9), color-stop(50%,#e5ebee), color-stop(51%,#d7dee3), color-stop(100%,#f5f7f9)); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top,  #f6f8f9 0%,#e5ebee 50%,#d7dee3 51%,#f5f7f9 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top,  #f6f8f9 0%,#e5ebee 50%,#d7dee3 51%,#f5f7f9 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(top,  #f6f8f9 0%,#e5ebee 50%,#d7dee3 51%,#f5f7f9 100%); /* IE10+ */
	background: linear-gradient(to bottom,  #f6f8f9 0%,#e5ebee 50%,#d7dee3 51%,#f5f7f9 100%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f6f8f9', endColorstr='#f5f7f9',GradientType=0 ); /* IE6-9 */

	color : #0F4085;
	font-weight: bold;
	padding-left: 5px;
}

.closeButton
{
	width:20px;
	font-family: Verdana, Geneva, sans-serif;
	font-size: small; 
	font-weight: bold;
	text-align: center;
	color : #FFFFFF;
}

.closeButton:hover
{
	font-family: Verdana, Geneva, sans-serif;
	font-size: small; 
	font-weight: bold;
	color : #FC1D00;
	box-shadow: inset 0 0 0 5px #3071A9;
}

.closeButtonError
{
	font-family: Verdana, Geneva, sans-serif;
	font-size: small; 
	font-weight: bold;
	color : #FFFFFF;
}

.closeButtonError:hover
{
	font-family: Verdana, Geneva, sans-serif;
	font-size: small; 
	font-weight: bold;
	color : #000000;
}

	





----------------------------------------------------------------------------
alert.css
.alert
{
	height: 180px;
}

.alertTitle
{
	height: 10%;
} 

.alertNonTitleContainer
{
	height: 90%;
}

.alertBody 
{
  position: relative; 
  height : 70%;
  max-height: 400px;
  padding: 7px 7px 0px 7px;
  overflow-y: auto;
}
.alertFooter 
{
  height: 20%;
  padding: 7px 15px 7px;
  margin-bottom: 0;
  text-align: right;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  -webkit-border-radius: 0 0 6px 6px;
     -moz-border-radius: 0 0 6px 6px;
          border-radius: 0 0 6px 6px;
  *zoom: 1;
  -webkit-box-shadow: inset 0 1px 0 #ffffff;
     -moz-box-shadow: inset 0 1px 0 #ffffff;
          box-shadow: inset 0 1px 0 #ffffff;
}

.alertFooter .alertButton + .alertButton {
  margin-bottom: 0;
  margin-left: 5px;
}

.alertFooter .alertBottonGroup .alertButton + .alertButton {
  margin-left: -1px;
}

.alertFooter .alertBottonBlock + .alertBottonBlock {
  margin-left: 0;
}

.alertButton {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.428571429;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.alertButton:hover, .alertButton:focus, .alertButton:active {
  <!-- for Grow Shadow effect -->
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  <!-- for Fade Color Change effect -->
  -webkit-animation-name: alertButton;
  animation-name: alertButton;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  background-color: #2098d1;
  color: white;
}



.alertButtonDefault {
  color: #fff;
  background-color: #428bca;
  border-color: #357ebd;
}
--------------------------------------------------------------------------------
ToolTipDemo.html

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
@media (min-device-width:320px) and (max-device-width:768px) {.tooltip span{display:none;}.tooltip:hover span{display:block;} } /* iPad & iPhone simulate :hover */
</style> 
</head>
<body>
<h1>CSS3 Animated Tooltip Cross Browser Demo</h1>
<p><a href="css3-animated-tooltip-cross-browser.php">&laquo; Back To Tutorial</a></p>

<div id="box">
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Quisque tempor. Nam in libero vel nisi accumsan euismod. Quisque quis neque. Donec condimentum, enim convallis vestibulum varius, quam mi accumsan diam, sollicitudin ultricies odio ante vitae purus.</p>
<a class="tooltip"><img src="/code/images/facebook.png" width="28" height="28" alt="Share On Facebook"><span>Share On Facebook</span></a>
<a class="tooltip"><img src="/code/images/twitter.png" width="28" height="28" alt="Share On Twitter"><span>Share On Twitter</span></a>
<a class="tooltip"><img src="/code/images/googleplus.png" width="28" height="28" alt="Share On Google+"><span>Share On Google+</span></a>
<a class="tooltip"><img src="/code/images/pinterest.png" width="28" height="28" alt="Share On Pinterest"><span>Share On Pinterest</span></a>
<a class="tooltip"><img src="/code/images/linkedin.png" width="28" height="28" alt="Share On Lindedin"><span>Share On Linkedin</span></a>
<a class="tooltip"><img src="/code/images/email.png" width="28" height="28" alt="Share With Email"><span>Share With Email</span></a>
<a class="tooltip"><img src="/code/images/addtoany.png" width="28" height="28" alt="Share On Any Social Network"><span class="dif">Share On Any Social Network</span></a>
</div>

</body>
</html>
------------------------------------------------------
anchortolltips project
style.css





/** page structure **/
/*#w {
  display: block;
  width: 750px;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 45px;
}*/

/*#content {
  display: block;
  width: 100%;
  background: #fff;
  padding: 25px 20px;
  padding-bottom: 35px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}*/



/** tooltip styles
  * based on http://www.flatypo.net/tutorials/how-to-create-animated-tooltips-css3-hiperlink/ 
 **/
a.tooltip{
  position: relative;
  display: inline;
}
a.tooltip:after{
  display: block;
  visibility: hidden;
  position: absolute;
  bottom: 0;
  left: 20%;
  opacity: 0;
  content: attr(data-tool); /* might also use attr(title) */
  height: auto;
  min-width: 100px;
  padding: 5px 8px;
  z-index: 999;
  color: #fff;
  text-decoration: none;
  text-align: center;
  background: rgba(0,0,0,0.85);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

a.tooltip:before {
  position: absolute;
  visibility: hidden;
  width: 0;
  height: 0;
  left: 50%;
  bottom: 0px;
  opacity: 0;
  content: "";
  border-style: solid;
  border-width: 6px 6px 0 6px;
  border-color: rgba(0,0,0,0.85) transparent transparent transparent;
}
a.tooltip:hover:after{ visibility: visible; opacity: 1; bottom: 20px; }
a.tooltip:hover:before{ visibility: visible; opacity: 1; bottom: 14px; }

a.tooltip.animate:after, a.tooltip.animate:before {
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}


/* tips on bottom */
a.tooltip.bottom:after { bottom: auto; top: 0; }
a.tooltip.bottom:hover:after { top: 28px; }
a.tooltip.bottom:before {
  border-width: 0 5px 8.7px 5px;
  border-color: transparent transparent rgba(0,0,0,0.85) transparent;
  top: 0px
}
a.tooltip.bottom:hover:before { top: 20px; }


/* tips on the right */
a.tooltip.right:after { left: 100%; bottom: -45%; }
a.tooltip.right:hover:after { left: 110%; bottom: -45%; }
a.tooltip.right:before {
  border-width: 5px 10px 5px 0;
  border-color: transparent rgba(0,0,0,0.85) transparent transparent;
  left: 90%;
  bottom: 2%;
}
a.tooltip.right:hover:before { left: 100%; bottom: 2%; }


/* tips on the left */
a.tooltip.left:after { left: auto; right: 100%; bottom: -45%; }
a.tooltip.left:hover:after { right: 110%; bottom: -45%; }
a.tooltip.left:before {
  border-width: 5px 0 5px 10px;
  border-color: transparent transparent transparent rgba(0,0,0,0.85);
  left: auto;
  right: 90%;
  bottom: 2%;
}
a.tooltip.left:hover:before { right: 100%; bottom: 2%; }


/* tooltip colors (add your own!) */
a.tooltip.blue:after { background:#5f87c2; }
a.tooltip.blue:before { border-color: #5f87c2 transparent transparent transparent; }
a.tooltip.bottom.blue:before{ border-color: transparent transparent #5f87c2 transparent; }
a.tooltip.right.blue:before { border-color: transparent #5f87c2 transparent transparent; }
a.tooltip.left.blue:before { border-color: transparent transparent transparent #5f87c2; }



/* input field tooltips */
input + .fieldtip {
  visibility: hidden;
  position: relative;
  bottom: 0;
  left: 15px;
  opacity: 0;
  content: attr(data-tool);
  height: auto;
  min-width: 100px;
  padding: 5px 8px;
  z-index: 9999;
  color: #fff;
  font-size: 1.2em;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  background: rgba(0,0,0,0.85);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

input + .fieldtip:after {
  display: block;
  position: absolute;
  visibility: hidden;
  content:'';
  width: 0;
  height: 0;
  top: 8px;
  left: -8px;
  border-style: solid;
  border-width: 4px 8px 4px 0;
  border-color: transparent rgba(0,0,0,0.75) transparent transparent;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

input:focus + .fieldtip, input:focus + .fieldtip:after {
  visibility: visible;
  opacity: 1;
}


/** clearfix **/
.clearfix:after { content: "."; display: block; clear: both; visibility: hidden; line-height: 0; height: 0; }
.clearfix { display: inline-block; }
 
html[xmlns] .clearfix { display: block; }
* html .clearfix { height: 1%; }
-----------------------------------------------------------
index.html
<!doctype html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html">
  <title>Full CSS3 Tooltips - Design Shack Demo</title>
  <meta name="author" content="Jake Rocheleau">
  <link rel="shortcut icon" href="http://designshack.net/favicon.ico">
  <link rel="icon" href="http://designshack.net/favicon.ico">
  <link rel="stylesheet" type="text/css" media="all" href="css/styles.css">
</head>

<body>
  <div id="topbar">
  <a href="http://designshack.net">Back to Design Shack</a>
  </div>
  
  <div id="w">
    <div id="content">
      <h1>HTML5 &amp; CSS3 Link Tooltips</h1>
      <p>Hover onto a page link to display various tooltips.</p>
      
      <p>Think of it like <a href="#" data-tool="Sample tooltip" class="tooltip animate">testing stuff</a> for various purposes.</p>
      
      <p>And how about <a href="#" data-tool="screwy eh?" class="tooltip animate right">off to the side</a> of the text?</p>


      <p>Why not use a sleek <a href="#" class="tooltip animate blue" data-tool="banana bana fo filly">animation</a> for the tips? If you don't like the CSS3 transitions just remove the class to <a href="#" class="tooltip" data-tool="simple!">turn them off</a>.</p>
      
      <p>Let's also take a peek at <a href="#" class="tooltip bottom animate blue" data-tool="Get ready because this tooltip is loooong. I mean seriously...">bottom-styled tips</a>. Do you think sideways tips could work again?</p>
      
      <p>I dunno but let's <a href="#" class="tooltip right animate blue" data-tool="just hangin'">find out</a>.</p>
     
     <p>And perhaps they can appear <a href="#" class="tooltip left animate blue" data-tool="tooltips are clickable">on the left</a> as well...</p>
      
      <p>Tooltips can also be applied to form inputs using extra HTML:</p>
      
      <input type="text" class="basictxt" tabindex="1" data-tool="Enter some text"><span class="fieldtip">Enter some text!</span>
    </div><!-- @end #content -->
  </div><!-- @end #w -->
</body>
</html>
