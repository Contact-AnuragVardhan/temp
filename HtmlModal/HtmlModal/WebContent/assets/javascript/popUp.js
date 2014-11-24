var LOADING_MESSAGE="Connect has detected new version .. Updating files";
var OVERLAY_CLOSE_EVENT="DOWNLOAD_COMPLETE";
var divParentLoader = null;
var divBody = null;
var isProgessBarShown=false;
var progressTimer = null;
var count = 0;
var totalCount=38;

//called when DOM is initialised
//TODO::should move out of of this file
function apiReadyHandler()
{
	callFunction("pageReady");
}

function pageReady()
{
	//uncomment when we are not using merging and compressing of JS and Css
	includeFiles();
	loadHandler();
}

function includeFiles()
{
	includeJavaScriptFile("head","./assets/javascript/com/org/overlay/overlay.js");
	includeCssFile("./assets/css/com/org/overlay/overlay.css");
}

function loadHandler()
{
	new Event().addListener(OVERLAY_CLOSE_EVENT, closeHandler);
}

function createParentLoader(fileName)
{
	divParentLoader = new createDiv("divParentLoader");
	//divParentLoader.style.padding = "25px";
	//divParentLoader.style.paddingTop = "7%";
	//divParentLoader.style.width = "690px";
	//divParentLoader.style.height = "500px";
	//divParentLoader.appendChild(createLoader());
	
	divBody = new createDiv("divBody");
	//start of center align of div
	divBody.style.margin = "auto";
	divBody.style.textAlign = "center";
	//divBody.style.width = "70%";
	//end of center align of div
	//divBody.style.fontWeight="bold";
	//divBody.innerHTML=LOADING_MESSAGE;
	createPlayer(divBody,fileName);
	divParentLoader.appendChild(divBody);
	return divParentLoader;
}

function createPlayer(divParent,fileName)
{
	 var obj = document.createElement("object");
	 obj.setAttribute("id", "mpIE");
	 obj.setAttribute("width", "690");
	 obj.setAttribute("height", "80");
	 obj.setAttribute("classid", "CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95");
	 obj.setAttribute("codebase", "http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701");
	 obj.setAttribute("standby", "Loading Microsoft� Windows� Media Player components...");
	 obj.setAttribute("type", "application/x-oleobject");

	 createParam(obj,"FileName",fileName);
	 /*createParam(obj,"Url",fileName);
	 createParam(obj,"src",fileName);*/
	 createParam(obj,"autostart","true");
	 createParam(obj,"DefaultFrame","mainFrame");
	 createParam(obj,"ShowStatusBar","true");
	 createParam(obj,"ShowPositionControls","true");
	 createParam(obj,"showcontrols","true");
	 createParam(obj,"ShowAudioControls","true");
	 createParam(obj,"ShowTracker","true");
	 createParam(obj,"EnablePositionControls","true");
	 
	 divParent.appendChild(obj);
	 
	 obj.attachEvent("PlayStateChange",playerStateChanged);
}

function createParam(parentObj,name,value)
{
	 //parentObj.setAttribute(name,value);
	 /*var objParam = document.createElement("param");
	 //param.setAttribute("name", name);
	 //param.setAttribute("value", value);
	 objParam.name = name;
	 objParam.value = value;
	 parentObj.appendChild(objParam);*/
	 parentObj[name] =  value;
}

function playerStateChanged(newState)
{
	switch (newState) 
	{
		case 0:    // Undefined
	        break;
	    case 1:    // Stopped
	    	alert("Stopped");
	        break;
	    case 2:    // Paused
	    	alert("Paused");
	        break;
	    case 3:    // Playing
	        break;
	    case 4:    // ScanForward
	        break;
	    case 5:    // ScanReverse
	        break;
	    case 6:    // Buffering
	        break;
	    case 7:    // Waiting
	        break;
	    case 8:    // MediaEnded
	    	alert("Ended");
	        break;
	    case 9:    // Transitioning
	        break;
	    case 10:   // Ready
	        break;
	    case 11:   // Reconnecting
	        break;
	    case 12:   // Last
	        break;
	    default:   // Unknown State
	        break;
	} 
}

function closeHandler()
{
	//alert("Loader Closed");
}

function playVideo(fileName)
{
	showModal(createParentLoader(fileName),'Windows Media Player',true,true);
}

//Global Exception Handler
window.onerror = function(msg, url, line) 
{
	// You can view the information in an alert to see things working
	// like so:
   alert("Error: " + msg + "\nurl: " + url + "\nline #: " + line);

   // TODO: Report this error via ajax so you can keep track
   //       of what pages have JS issues

   var suppressErrorAlert = true;
   // If you return true, then error alerts (like in older versions of 
   // Internet Explorer) will be suppressed.
   return suppressErrorAlert;
};