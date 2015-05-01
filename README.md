<!DOCTYPE html>
<html>
<head>
<style>
.test:before		{
	content: "testing";
	color: red;
}

		.divTest{
    		background: #333;
    		background: rgba(0,0,0,.8);
    		border-radius: 5px;
    		bottom: 0px;
    		color: #fff;
    		left: 20%;
    		padding: 5px 15px;
    		position: absolute;
    		z-index: 98;
    		width: 220px;
		}
		
		.divTestTip{
    		border: solid;
    		border-color: #FFFFFF #FFFFFF #333 #FFFFFF;
    		border-width: 0px 12px 12px 12px;
    		bottom: 30px;
    		content: "";
    		left: 10%;
    		position: absolute;
		}
</style>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script>
var UID = {
	_current: 0,
	getNew: function(){
		this._current++;
		return this._current;
	}
};
/*http://mcgivery.com/htmlelement-pseudostyle-settingmodifying-before-and-after-in-javascript/*/
HTMLElement.prototype.pseudoStyle = function(element,prop,value)
{
	var _this = this;
	var _sheetId = "pseudoStyles";
	var _head = document.head || document.getElementsByTagName('head')[0];
	var _sheet = document.getElementById(_sheetId) || document.createElement('style');
	_sheet.id = _sheetId;
	var className = "pseudoStyle" + UID.getNew();
	
	_this.className +=  " "+className; 
	
	_sheet.innerHTML += "\n."+className+":"+element+"{"+prop+":"+value+"}";
	_head.appendChild(_sheet);
	return this;
};


HTMLElement.prototype.addShadowStyle = function(element,cssClassName)
{
	var _this = this;
	var _sheetId = "pseudoStyles";
	var styleProperties = getCSSClass(cssClassName);
	var _head = document.head || document.getElementsByTagName('head')[0];
	var _sheet = document.getElementById(_sheetId) || document.createElement('style');
	_sheet.id = _sheetId;
	var className = "pseudoStyle" + UID.getNew();
	
	_this.className +=  " "+className; 
	
	_sheet.innerHTML += "\n."+className+":"+element+"{"+styleProperties+"}";
	_head.appendChild(_sheet);
	return this;
};

function getCSSClass(cssClassName)
{
    if(!document.styleSheets) 
	{
		return "";
	}
	var regEx = null;
	var styleSheets = document.styleSheets;
	var counter = styleSheets.length;
	var result = [];
    if(typeof cssClassName == "string") 
	{
		regEx = RegExp('\\b' + cssClassName + '\\b','i');
	}
    while(counter)
	{
    	var currentSheet = styleSheets[--counter];
    	var cssRules = (currentSheet.rules) ? currentSheet.rules: currentSheet.cssRules;
		var cssRulesLength = cssRules.length;
    	for(var count = 0 ; count < cssRulesLength; count++)
		{
    		var tempClassDetails = cssRules[count].selectorText ? [cssRules[count].selectorText, cssRules[count].style.cssText]: [cssRules[count]+''];
    		if(regEx.test(tempClassDetails[0])) 
			{
				result[result.length]= tempClassDetails;
			}
    	}
    }
	if(result && result.length === 1 && result[0] && result[0].length > 1)
	{
		return result[0][1];
	}
    return result.join('\n\n');
}

function clicked()
{
	var div = document.getElementById("testDiv");
	//div.pseudoStyle("before","color","black");
	div.addShadowStyle("before","divTestTip");
	alert(getCSSClass("divTestTip"));
}
</script>

</head>
<body>

<div id="testDiv" class="test">test2</div>

<input type="button" value="click" onclick="clicked()" />

</body>
</html>
