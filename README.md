
var nsCheckBox = Object.create(HTMLInputElement.Prototype);
/*start of private variables */

/*end of private variables */
/*start of functions */
nsCheckBox.createdCallback = function() 
{
	console.log("In createdCallback");
	this.type = "checkbox";
};

nsCheckBox.attachedCallback = function()
{
	this.initialise();
	console.log("In attachedCallback");
};

nsCheckBox.detachedCallback = function()
{
	console.log("In detachedCallback");
};

nsCheckBox.attributeChangedCallback = function(attrName, oldVal, newVal)
{
	console.log("attrName::" + attrName + " oldVal::" + oldVal + " newVal::" + newVal);
};

nsCheckBox.initialise = function ()
{
	
};

/*end of functions */

//document.registerElement('ns-checkbox', {prototype: nsCheckBox, extends: 'input'});
