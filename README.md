<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>CSS3 tooltip</title>
	
		<style type="text/css">
#container {
    position:relative;
    background: red;
    width:100%;
	height:200px;
}
 
#content {
    position:absolute;
    display: inline-block;
    background-color:#fff;
    width:30%;
    height:140px;
    border:1px solid black;
}

.spinner {
  position:absolute;
  width: 70px;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}


    </style>
	
	

	
	
</head>
<body onload="initialise();">
	
<div id="container" style="">
    <div id="content" style="-webkit-box-shadow: rgba(50, 50, 50, 0.74902) 0px 10px 5px 0px; box-shadow: rgba(50, 50, 50, 0.74902) 0px 10px 5px 0px;">
		<div style="vertical-align:center;position:relative;top:30%;text-align: center;">
			<div id="compSpinner" class="spinner">
			  <div class="bounce1"></div>
			  <div class="bounce2"></div>
			  <div class="bounce3"></div>
			</div>
			<div id="compLoadingLabel" style="position:absolute; font-weight: bold;">Loading...</div>
			</div>
		</div>
</div> 




<script>
	function initialise()
	{
		centerElement("content");
		centerElement("compSpinner");
		centerElement("compLoadingLabel");
		var top = document.querySelector("#compLoadingLabel").style.top;
		document.querySelector("#compLoadingLabel").style.top = (parseInt(top.substring(0,top.length - 2)) + 20) + "px";
	}
	
	function centerElement(componentID)
	{
		if(componentID)
		{
			var component = document.querySelector("#" + componentID);
			if(component)
			{
				var parent = component.parentNode;
				component.style.left = ((parent.offsetWidth - component.offsetWidth) / 2) + "px";
				component.style.top = ((parent.offsetHeight - component.offsetHeight) / 2) + "px";
			}
		}
	}
</script>

</body>
</html>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SVG
<!DOCTYPE html>
<html>
<head>
	<style>
		element.style {
		  display: block;
		  z-index: 1100;
		  left: 165px;
		  top: 74px;
		  visibility: visible;
		  overflow-y: visible;
		}
		HTML[data-doctype=true] .context_menu {
		  background: white;
		  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 6px 6px 7px 0;
		  -moz-box-shadow: rgba(0, 0, 0, 0.3) 6px 6px 7px 0;
		  box-shadow: rgba(0, 0, 0, 0.3) 6px 6px 7px 0;
		  -webkit-border-radius: 3px;
		  -moz-border-radius: 3px;
		  -ms-border-radius: 3px;
		  -o-border-radius: 3px;
		  border-radius: 3px;
		  border: 1px solid #e6e8ea;
		}
		.context_menu {
		  position: absolute;
		  cursor: default;
		  z-index: 1100;
		  border: 1px solid #999;
		  border-top: 1px solid #d5d5d5;
		  border-left: 1px solid #d5d5d5;
		  background: #fff url(../images/container_bottom_gradient.gif) repeat-x bottom;
		}
		element.style {
}
.context_item {
  padding: 2px 18px 2px 18px;
  margin-top: 2px;
  margin-bottom: 2px;
  white-space: nowrap;
}
.context_item_hr {
  border: 0px solid #d5d5d5;
  border-top: 1px solid #d5d5d5;
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 6px;
}

	</style>
</head>

<body>

<svg height="210" width="400">
  <rect x="10" y="10" width="30" height="5" rx="2" ry="2"
    style="stroke: red; fill: red;"/> 
   <rect x="10" y="20" width="30" height="5" rx="2" ry="2"
    style="stroke: red; fill: red;"/>
    <rect x="10" y="30" width="30" height="5" rx="2" ry="2"
    style="stroke: red; fill: red;"/>  
  Sorry, your browser does not support inline SVG.
</svg>

<div id="context_list_headerchange_request" class="context_menu" gsft_has_scroll="false" style="display: block; z-index: 1100; left: 166px; top: 73px; visibility: visible; overflow-y: visible;">
	<div style="width: 120px; height: 1px; overflow: hidden;"></div>
	<div item_id="c8c2eae10a0004e30084537138ba00ed" class="context_item" func_set="true" style="display: none;">Expand/Collapse All</div>
	<div item_id="ab7f76d70ad33702005f177f6d3a7145" class="context_item" func_set="true">Sort (a to z)</div>
	<div item_id="ab8369ac0ad337020058ada2a743863a" class="context_item" func_set="true">Sort (z to a)</div>
	<div item_id="3051f5050a0a0b1800eb2669f7824df3" class="context_item" func_set="true" style="color: rgb(204, 204, 204);">Ungroup</div>
	<div item_id="ab83ca6d0ad337020037c078040600bc" class="context_item" func_set="true" message="Group By">Group By Approval</div>
	<div class="context_item_hr"></div><div item_id="cc97e1240a0a0b3e004a493f398feef8" class="context_item" func_set="true">Bar Chart</div>
	<div item_id="ccb397090a0a0b3e00b2ce638f5d6df0" class="context_item" func_set="true">Pie Chart</div><div class="context_item_hr"></div>
	<div item_id="d1ad2f010a0a0b3e005c8b7fbd7c4e28" class="context_item" label="true">Export
		<img src="images/context_arrow.gifx" class="context_item_menu_img" alt="Add">
	</div>
</div>

<div id="box_shadow" style="-webkit-box-shadow: rgba(50, 50, 50, 0.74902) 2px 10px 5px 0px; box-shadow: rgba(50, 50, 50, 0.74902) 2px 10px 5px 0px;">
aaaa
</div>

</body>
</html>
