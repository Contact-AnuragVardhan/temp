var biologistBody = "";
var actionbioscienceBody = "";
var fishbaseBody = "";

var objDashBoard = null;

var item = null;
var tempID = "Item";
var divDrag = null;

function initializeCompliancePortal()
{
	biologistBody = "#template1";
	actionbioscienceBody = "#template2";
	fishbaseBody = "#template3";
	
	var dashBoardSource = [
	                       {title:"Biologist",templateID:biologistBody,footerRequired:false},
	                       {title:"Action Bioscience",templateID:actionbioscienceBody,footerRequired:false},
	                       {title:"FishBase",templateID:fishbaseBody,footerRequired:false},
	                  ];
	objDashBoard = new DashBoard("divPortlets",dashBoardSource);
	syncDivWidth();
	addClickHandler();
	document.ondragstart = dragstartHandler;
	document.ondragover = dragoverHandler;
	document.ondrop = dropHandler;
	document.ondragend = dragendHandler;
}

function addClickHandler()
{
	 var arrLI = document.getElementsByTagName("LI");
	 if(arrLI && arrLI.length > 0)
	 {
		 for(var count = 0;count < arrLI.length;count++)
		 {
			 arrLI[count].onmousedown = liMouseDownHandler;
			 arrLI[count].onmouseup = liMouseUpHandler;
		 }
	 }
}

function syncDivWidth()
{
	for(var count = 0;count < 3;count++)
	{
		var panel = document.getElementById("divPortlets#panelParent" + count); 
		var div = document.getElementById("div" + count); 
		var txt = document.getElementById("txt" + count); 
		if(panel && div)
		{
			var offset = getOffSet(panel);
			div.style.width = (panel.offsetWidth - 30) + "px";
			//txt.style.width = (panel.offsetWidth - 50) + "px";
			div.style.left = (offset.left + 15) + "px";
			txt.style.left = ((offset.left + 15) + ((panel.offsetWidth - 30)/2) - 40) + "px";
			div.style.top = (offset.top + panel.offsetHeight + 40) + "px";
			txt.style.top = (offset.top + panel.offsetHeight + 80) + "px";
			
		}
	} 
}

function liMouseDownHandler(event)
{
	var liTarget = findParent(event.target,"li");
	if(liTarget && !Boolean.parse(liTarget.getAttribute("isDragged")))
	{
		for(var count = 0;count < 3;count++)
		{
			var div = document.getElementById("div" + count); 
			if(div && div.children.length === 0)
			{
				div.style.border = "2px dashed #00cc00";
				div.style.borderTop = "0px";
			}
		}
	}
}

function liMouseUpHandler(event)
{
	for(var count = 0;count < 3;count++)
	{
		var div = document.getElementById("div" + count); 
		div.style.border = "1px solid #aaaaaa";
		div.style.borderTop = "0px";
	}
}

function dragstartHandler(event)
{
	item = findParent(event.target,"li");
	if(item && !Boolean.parse(item.getAttribute("isDragged")))
	{
		divDrag = document.createElement("DIV");
		divDrag.id = tempID + "-extra";
		divDrag.innerHTML = item.getAttribute("dragData");
		divDrag.style.backgroundColor = "red";
		divDrag.style.position = "absolute";
		document.body.appendChild(divDrag);
		var divCoverup = document.getElementById("divCoverup");		
		divDrag.style.left = (divCoverup.offsetLeft) + "px";
		divDrag.style.top = (divCoverup.offsetTop) + "px";
		event.dataTransfer.setDragImage(divDrag, 0, 0);
		event.dataTransfer.setData('text', '');
	}
	else
	{
		item = null;
		event.preventDefault();
	}
}

function dragoverHandler(event)
{
	 if (item) 
	 {
		 event.preventDefault();
     }
}

function dropHandler(event)
{
	liMouseUpHandler(event);
    if(event.target.getAttribute('data-draggable') == 'target') 
    {
    	var divAdd = document.createElement("DIV");
    	divAdd.style.backgroundColor = "green";
    	divAdd.style.color = "white";
    	divAdd.setAttribute("dragKey",item.getAttribute("dragKey"));
    	var img = document.createElement("img");
    	img.src="delete-icon.png";
    	img.alt="Delete";
    	img.height=16;
    	img.width=16;
    	img.style.marginRight = 20 + "px";
    	img.style.cursor = "pointer";
    	img.onclick = imageClickHandler;
    	divAdd.appendChild(img);
    	divAdd.appendChild(document.createTextNode(divDrag.innerHTML));
    	event.target.appendChild(divAdd);
    	event.preventDefault();
    }
}

function dragendHandler(event)
{
	document.body.removeChild(document.getElementById(tempID + "-extra"));
	//item.parentNode.removeChild(item);
	markItemSelected(item.getAttribute("dragKey"),true);
    item = null;
    divDrag = null;
}

function markItemSelected(key,isMark)
{
	 var arrLI = document.getElementsByTagName("LI");
	 if(arrLI && arrLI.length > 0)
	 {
		 for(var count = 0;count < arrLI.length;count++)
		 {
			 if(arrLI[count].getAttribute("dragKey") == key)
			 {
				 arrLI[count].children[0].style.backgroundColor = (isMark? "green":"gray");
				 arrLI[count].setAttribute("isDragged",isMark);
			 }
		 }
	 }
}

function imageClickHandler(event)
{
	var div = findParent(event.target,"div");
	markItemSelected(div.getAttribute("dragKey"),false);
	div.parentNode.removeChild(div);
}

function updateText()
{
	var arrVal = [0,0,0];
	for(var count = 0;count < 3;count++)
	{
		var panel = document.getElementById("divPortlets#panelParent" + count); 
		var div = document.getElementById("div" + count); 
		var txt = document.getElementById("txt" + count); 
		if(div && div.children.length > 0)
		{
			arrVal[count] = 1;
		}
	}
	for(var count = 0;count < 3;count++)
	{
		var txt = document.getElementById("txt" + count); 
		if(div && div.children.length > 0)
		{
			arrVal[count] = 1;
		}
	}
}

function getElement(elementId)
{
	if(elementId && elementId.length > 0)
	{
		return document.getElementById(elementId);
	}
	return null;
}

function getOffSet(element, offset) 
{
	 if(!offset)
	 {
		 offset = {left : 0, top : 0};
	 }
	 if(element)
     {
		offset.left += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		offset.top += (element.offsetTop - element.scrollTop + element.clientTop);
	    offset = this.getOffSet(element.offsetParent, offset);
     }
	 return offset;
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

function getEvent(event)
{
	if (!event)
	{
		event = window.event;
	}
	return event;
}

function getTarget(event)
{
	event = getEvent(event);
	var target = event.target ? event.target : event.srcElement;
	
	return target;
}

function getParentByType(element,type)
{
	if(element && type)
	{
		var parent = element;
	    while(parent && parent.nodeName != type.toUpperCase())
	    {
	       parent = parent.parentNode;
	    }
	    return parent;
	}
	return element;
}

function findParent(element,parentTag)
{
    if(element && parentTag)
    {
        while (element && element.tagName && element.tagName.toLowerCase()!=parentTag.toLowerCase())
        {
            element = element.parentNode;
        }
    }  
    return element;
}

var falseExpression = /^(?:f(?:alse)?|no?|0+)$/i;
Boolean.parse = function(value) 
{ 
   return !falseExpression.test(value) && !!value;
};

window.onload = initializeCompliancePortal;
