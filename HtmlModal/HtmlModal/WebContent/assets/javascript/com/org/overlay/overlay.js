var divFade = null;
var divOverlay = null;
var divTitleBar = null;
var btnClose = null;
var isCloseAllowed = true;
var isTitleAllowed = true;

function showModal(childComponent,title,isTitleRequired,isCloseRequired)
{
	isCloseAllowed = isCloseRequired;
	isTitleAllowed = isTitleRequired;
	if(!divFade)
	{
		createFade();
	}
	if(!divOverlay)
	{
		createOverlay(title,childComponent);
	}
	if(isCloseAllowed)
	{
		//To detect escape button
		document.onkeydown = function(event) 
		{
			event = event || window.event;
			if (event.keyCode == 27) 
			{
				hideModal();
			}
		};
	}
	
	setModalVisibility(true);
}

function hideModal()
{
	setModalVisibility(false);
	if(isVariable("OVERLAY_CLOSE_EVENT"))
	{
		new Event().dispatch(OVERLAY_CLOSE_EVENT);
	}
}

function removeModal()
{
	removeFade();
	removeOverlay();
}

function setModalVisibility(isVisible)
{
	setFadeVisibility(isVisible);
	setOverlayVisibility(isVisible);
}

function createFade()
{
	divFade = createDiv("divFade");
	divFade.style.display = "none";
	divFade.style.position = "absolute";
	divFade.style.left = "0%";
	divFade.style.top = "0%";
	divFade.style.backgroundColor = "#000000"; 
	divFade.style.opacity = "0.7";
	divFade.style.filter = "alpha(opacity=70)"; // For Internet Explorer
	divFade.style.width = "100%";
	divFade.style.height = "100%";
	divFade.style.zIndex = "90";
	
	document.body.appendChild(divFade);  
}

function setFadeVisibility(isVisible)
{
	if(divFade)
	{
		setDivVisibility("divFade",isVisible);
	}
}

function removeFade()
{
	removeDiv("divFade");
	divFade = null;
}

function createCloseButton()
{
	btnClose = document.createElement("a");
	btnClose.setAttribute("href","javascript:void(0)");
	btnClose.className = "closeButton";
	btnClose.onmouseover = function() { this.className = "closeButton_hover"; };
    btnClose.onmouseout = function() { this.className = "closeButton"; };
	btnClose.style.textDecoration="none";
	//btnClose.style.color = "#FFFFFF"; 
	if(isBrowserIE())
	{
		btnClose.style.styleFloat = "right";
	}
	else
	{
		btnClose.style.cssFloat = "right";
	}
	btnClose.style.clear = "both"; 
	btnClose.style.paddingRight = "10px";
	btnClose.innerHTML = "X";
	btnClose.onclick = hideModal;
}

function createTitleBar(title)
{
	divTitleBar = createDiv("divTitleBar","titleBar");
	divTitleBar.style.width = "100%";
	//divTitleBar.style.backgroundColor = "#3D72C0"; 
	//divTitleBar.style.color = "#FFFFFF"; 
	//divTitleBar.style.padding = "5px";
	divTitleBar.innerHTML = title;
	if(isCloseAllowed)
	{
		createCloseButton();
		divTitleBar.appendChild(btnClose);  
	}
}


function createOverlay(title,childComponent)
{
	divOverlay = createDiv("divOverlay","popUp");
	divOverlay.style.display = "none";
	divOverlay.style.position = "absolute";
	//stops children from overflowing
	divOverlay.style.overflow = "hidden";
	//divOverlay.style.left = "25%";
	//divOverlay.style.top = "25%";
	divOverlay.style.padding = "0px";
	//divOverlay.style.border="1px solid #000000";
	//divOverlay.style.backgroundColor = "#ffffff"; 
	//divOverlay.style.width = "50%";
	//divOverlay.style.height = "50%";
	divOverlay.style.zIndex = "100";
	if(isTitleAllowed)
	{
		createTitleBar(title);
		divOverlay.appendChild(divTitleBar);
	}
	if(childComponent)
	{
		divOverlay.appendChild(childComponent);
	}
	
	document.body.appendChild(divOverlay);  	
}

function setOverlayVisibility(isVisible)
{
	if(divOverlay)
	{
		setDivVisibility("divOverlay",isVisible);
	}
}

function removeOverlay()
{
	removeDiv("divOverlay");
	divOverlay = null;
}