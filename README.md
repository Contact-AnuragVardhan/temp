
var nsUIComponent = Object.create(HTMLDivElement.prototype);

nsUIComponent.INITIALIZE = "initialize";
nsUIComponent.CREATION_COMPLETE = "creationComplete";
nsUIComponent.PROPERTY_CHANGE = "propertyChange";
nsUIComponent.REMOVE = "remove";

/*start of private variables */
nsUIComponent.base = null;
/*end of private variables */

/*start of functions */
nsUIComponent.__setBase = function() 
{
	if(this.__proto__ && this.__proto__.__proto__)
	{
		this.base = this.__proto__.__proto__;
	}
};
nsUIComponent.createdCallback = function() 
{
	console.log("In Parent createdCallback");
	this.__setBase();
	this.initializeComponent();
	this.dispatchCustomEvent(this.INITIALIZE);
};
nsUIComponent.attachedCallback = function()
{
	console.log("In attachedCallback");
	this.setComponentProperties();
	this.dispatchCustomEvent(this.CREATION_COMPLETE);
};
nsUIComponent.attributeChangedCallback = function(attrName, oldVal, newVal)
{
	console.log("attrName::" + attrName + " oldVal::" + oldVal + " newVal::" + newVal);
	var data = {};
	data.propertyName = attrName;
	data.oldValue = oldVal;
	data.newValue = newVal;
	this.dispatchCustomEvent(this.PROPERTY_CHANGE,data);
	this.propertyChange(attrName, oldVal, newVal);
};
nsUIComponent.detachedCallback = function()
{
	console.log("In detachedCallback");
	this.dispatchCustomEvent(this.REMOVE);
};

nsUIComponent.initializeComponent = function() 
{
	console.log("In Parent initializeComponent");
};
nsUIComponent.setComponentProperties = function() 
{
	console.log("In Parent setComponentProperties");
};
nsUIComponent.propertyChange = function(attrName, oldVal, newVal) 
{
	console.log("In Parent setComponentProperties");
};

nsUIComponent.dispatchCustomEvent = function(eventType,data,bubbles,cancelable) 
{
	console.log("In Parent dispatchCustomEvent");
	if(!data)
	{
		data = null;
	}
	if(typeof bubbles == "undefined")
	{
		bubbles = true;
	}
	if(typeof cancelable == "undefined")
	{
		cancelable = true;
	}
	var event = new CustomEvent(eventType, 
	{
		detail: data,
		bubbles: bubbles,
		cancelable: cancelable
	});
	this.dispatchEvent(event);
};
/*end of functions */

document.registerElement('ns-uicomponent', {prototype: nsUIComponent});
---------------------------------------------------------------------------------------------------------------------


var nsCheckBox = Object.create(nsUIComponent);

this.checkbox = null;
this.label = null;
this.textNode = null;

nsCheckBox.initializeComponent = function() 
{
	this.base.initializeComponent();
	console.log("In nsCheckBox initializeComponent");
	this.checkbox = document.createElement('input');
	this.checkbox.type = "checkbox";
	this.checkbox.name = "name";
	this.checkbox.value = "value";
	this.checkbox.id = "id";

	this.label = document.createElement('label');
	this.label.htmlFor = "id";
	
	this.textNode = document.createTextNode("");
	this.label.appendChild(this.textNode);

	this.appendChild(this.checkbox);
	this.appendChild(this.label);
};

nsCheckBox.setComponentProperties = function() 
{
	console.log("In child setComponentProperties");
	this.setText();
	this.base.setComponentProperties();
};

nsCheckBox.propertyChange = function(attrName, oldVal, newVal)
{
	console.log("In child propertyChange");
	if(attrName === "text")
	{
		this.setText();
	}
};

nsCheckBox.getText = function()
{
	var textToSet = null;
	if (this.hasAttribute("text")) 
	{
		textToSet = this.getAttribute("text");
	}
	return textToSet;
};

nsCheckBox.setText = function()
{
	var textToSet = this.getText();
	if(textToSet)
	{
		this.textNode.nodeValue = textToSet;
	}
};

document.registerElement("ns-checkBox", {prototype: nsCheckBox});
 -------------------------------------------------------------------------------------------------------------------------------------
 
 <!DOCTYPE html>
<html>

<head>

 <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.6.1/CustomElements.js"></script>
 <script src="lib/com/org/base/nsUIComponent.js"></script>
 <script src="lib/com/org/containers/nsGroup.js"></script>
 <script src="lib/com/org/components/nsCheckBox.js"></script>
 
</head>

<body>

<ns-checkBox id="chkBox" text="Check"></ns-checkBox>
<input type="button" value="Click" onclick="changeText()">
</input>
<script>
var count = 0;
function changeText()
{
	count++;
	var checkBox  = document.getElementById("chkBox");
	chkBox.setAttribute("text",("Check" + count));
}
// 	var checkBox = document.createElement("ns-checkBox");
// 	checkBox.text = "Check";
// 	document.body.appendChild(checkBox);     
</script>

</body>

</html>

---------------------------------------------

https://github.com/github/time-elements
