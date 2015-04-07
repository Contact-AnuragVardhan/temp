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
	this.btnClose.style.paddingRight = "10px";
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
	this.divTitleBar.style.width = "100%";
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
	this.divOverlay.style.zIndex = "100";
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
            // closest thing possible to the ECMAScript 5 internal IsCallable function​
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

-------------------------------------------------------------------------------------------------------------------------------------

Alert.js

var Alert =  new function()
{
	this.CONFIRM_OK_TEXT = "OK";
	this.CONFIRM_CANCEL_TEXT = "Cancel";
	this.MAX_BODY_HEIGHT = 90;
	
	this.showInfo = function (title,message) 
    {
		var modal = new Modal();
		var btnOK = createButton("btnOK","OK","btn btn-primary",this.closePopUp.bind(modal));
		this.initialiseModal(modal,title,message,[btnOK],"titleBar","closeButton");
    };
    
    this.showError = function (title,message) 
    {
    	var modal = new Modal();
		var btnClose = createButton("btnClose","Close","btn btn-primary",this.closePopUp.bind(modal));
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
		var btnOK = createButton("btnOK",okButtonText,"btn",function()
		{
			this.closePopUp(null,modal);
			if(handler)
			{
				handler(this.CONFIRM_OK_TEXT);
			}
		}.bind(this))
		var btnCancel = createButton("btnCancel",cancelButtonText,"btn btn-primary",function()
		{
			this.closePopUp(null,modal);
			if(handler)
			{
				handler(this.CONFIRM_CANCEL_TEXT);
			}
		}.bind(this))
    	this.initialiseModal(modal,title,message,[btnOK,btnCancel],"titleBar","closeButton");
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
		var divBody = document.getElementById("divBody");
		var divFooter = document.getElementById("divFooter");
		var paddingTop = getRenderedStyleValue(divBody,"padding-top");
		if(paddingTop && paddingTop.indexOf("px") > -1)
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
		divBody.style.height = calculatedBodyHeight + "px";
	};
	
	this.createContainer = function(message,arrButton)
	{
		var divBody = this.createBody(message);
    	var divFooter = this.createFooter(arrButton);
		
		var divContainer = createDiv("divContainer",null);
		divContainer.appendChild(divBody);
		divContainer.appendChild(divFooter);
		
		return divContainer;
	};
	
	this.createBody = function(message)
	{
		var divBody = createDiv("divBody","modal-body");
		divBody.innerHTML = message;
		
		return divBody;
	};
	
	this.createFooter = function(arrButton)
	{
		var divFooter = createDiv("divFooter","modal-footer");
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
-------------------------------------------------------------------------------------

ModalDemo.html

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Cache-Control" Content="no-cache">
	<meta http-equiv="Pragma" Content="no-cache">
	<meta http-equiv="Expires" Content="0">
	<title>Modal Aert Demo</title>
	<!-- uncomment when we are not using merging and compressing of JS and Css -->
	<link rel="stylesheet" type="text/css" href="assets/css/modal.css"></link>	
	<style type="text/css">
		.modal-body 
		{
		  position: relative;
		  max-height: 400px;
		  padding: 15px;
		  overflow-y: auto;
		}
		.modal-footer 
		{
		  padding: 14px 15px 15px;
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
		.modal-footer:before,
		.modal-footer:after {
		  display: table;
		  line-height: 0;
		  content: "";
		}
		
		.modal-footer:after {
		  display: block;
		  clear: both;
		}
		
		.modal-footer .btn + .btn {
		  margin-bottom: 0;
		  margin-left: 5px;
		}
		
		.modal-footer .btn-group .btn + .btn {
		  margin-left: -1px;
		}
		
		.modal-footer .btn-block + .btn-block {
		  margin-left: 0;
		}
		
		.btn {
		  display: inline-block;
		  padding: 6px 12px;
		  margin-bottom: 0;
		  font-size: 14px;
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
		
		.btn-primary {
		  color: #fff;
		  background-color: #428bca;
		  border-color: #357ebd;
		}
		
	</style> 
</head>
<body>
	<a onclick="createChildTest();" href="javascript:void(0)">Click here to open the overlay</a>
	<div class="col-md-12">
        <button onclick="showDialog('Error')">Error Dialog</button>
        <button onclick="showDialog('Info')">Notify Dialog</button>
        <button onclick="showDialog('Confirm')">Confirm Dialog</button>
<!--         <button class="btn btn-primary" ng-click="launch('wait')">Wait Dialog</button> -->
<!--         <button class="btn btn-warning" ng-click="launch('create')">Custom Dialog</button> -->
      </div>
	
<!-- 	<div id="divOverlay" class="popUp" style="display: block; position: absolute; overflow: hidden; padding-bottom: 0px;"> -->
<!-- 		<div id="divTitleBar" class="titleBarOrange" style="width: 100%;"> -->
<!-- 			Information -->
<!-- 			<a href="javascript:void(0)" class="closeButton" style="text-decoration: none; float: right; clear: both; padding-right: 10px;">X</a> -->
<!-- 		</div> -->
<!-- 		<div id="divContainer> -->
<!-- 			<div id="divBody" class="modal-body">I am ok</div> -->
<!-- 			<div id="divFooter" class="modal-footer" style="padding-bottom: -10px;"> -->
<!-- 				<input type="button" id="btnYes" value="Yes"> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 	</div> -->
	
	<script language="JavaScript" src="assets/scripts/modal.js"></script>
	<script language="JavaScript" src="assets/scripts/alert.js"></script>
	<script type="text/javascript">
		function showDialog(launchType)
		{
			switch(launchType)
			{
				case 'Error':
					Alert.showError("Error","I am Error");
				break;
				case 'Info':
					Alert.showInfo("Information","I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok I am ok  I am ok");
				break;
				case 'Confirm':
					Alert.showConfirmation("Confirmation","Please Confirm",confirmationHandler,'Yes','No');
				break;
			}
		}
		
		function confirmationHandler(buttonSelected)
		{
			if(buttonSelected == Alert.CONFIRM_OK_TEXT)
			{
				Alert.showInfo("Information","OK is clicked");
			}
			else if(buttonSelected == Alert.CONFIRM_CANCEL_TEXT)
			{
				Alert.showInfo("Information","Cancel is clicked");
			}
				
		}
		function createChildTest()
		{
			/*var divLoader = createDiv("divLoader","loader");
			divLoader.style.width = "100%";
			divLoader.innerHTML="Test";
			
			modal.showModal(divLoader,'Connect has detected new version .. Updating files',true,true);*/
			
			
			//Alert.showInfo("Information","I am ok");
			//Alert.showError("Error","I am Error");
			
		}
	</script>
</body>
</html>
