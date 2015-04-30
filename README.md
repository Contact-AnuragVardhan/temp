
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>ToolTips Example</title>
		<style type="text/css">
		.tooltip {
			border-bottom: 1px dotted #000000; color: #000000; outline: none;
			cursor: help; text-decoration: none;
			position: relative;
		}
		.tooltip span {
			margin-left: -999em;
			position: absolute;
		}
		.tooltip:hover span {
			border-radius: 5px 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; 
			box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1); -webkit-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); -moz-box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
			font-family: Calibri, Tahoma, Geneva, sans-serif;
			position: absolute; left: 1em; top: 2em; z-index: 99;
			margin-left: 0; width: 250px;
		}
		.tooltip:hover img {
			border: 0; margin: -10px 0 0 -55px;
			float: left; position: absolute;
		}
		.tooltip:hover em {
			font-family: Candara, Tahoma, Geneva, sans-serif; font-size: 1.2em; font-weight: bold;
			display: block; padding: 0.2em 0 0.6em 0;
		}
		.classic { padding: 0.8em 1em; }
		.custom { padding: 0.5em 0.8em 0.8em 2em; }
		* html a:hover { background: transparent; }
		.classic {background: #FFFFAA; border: 1px solid #FFAD33; }
		.critical { background: #FFCCAA; border: 1px solid #FF3334;	}
		.help { background: #9FDAEE; border: 1px solid #2BB0D7;	}
		.info { background: #9FDAEE; border: 1px solid #2BB0D7;	}
		.warning { background: #FFFFAA; border: 1px solid #FFAD33; }
		</style>
	</head>
	<body>
		<a class="tooltip" href="#">Classic
			<span class="classic">
				This is just an example of what you can do using a CSS tooltip, feel free to get creative and produce your own!
			</span>
		</a>, 
		<a class="tooltip" href="#">Critical
			<span class="custom critical">
				<img src="Critical.png" alt="Error" height="48" width="48" />
				<em>Critical</em>
				This is just an example of what you can do using a CSS tooltip, feel free to get creative and produce your own!
			</span>
		</a>, 
		<a class="tooltip" href="#">Help<span class="custom help">
			<img src="Help.png" alt="Help" height="48" width="48" />
			<em>Help</em>
			This is just an example of what you can do using a CSS tooltip, feel free to get creative and produce your own!
			</span>
		</a>, 
		<a class="tooltip" href="#">Information
			<span class="custom info">
			<img src="Info.png" alt="Information" height="48" width="48" />
			<em>Information</em>
			This is just an example of what you can do using a CSS tooltip, feel free to get creative and produce your own!
			</span>
		</a> and 
		<a class="tooltip" href="#">Warning<span class="custom warning">
			<img src="Warning.png" alt="Warning" height="48" width="48" />
			<em>Warning</em>This is just an example of what you can do using a CSS tooltip, feel free to get creative and produce your own!
			</span>
		</a>
	</body>
</html>


-----------------------------------------------------------------------------------------------------

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>CSS3 tooltip</title>
	
	<style type="text/css">
	
		.tooltip{
   			display: inline;
    		position: relative;
		}
		
		.tooltip:hover:after{
    		background: #333;
    		background: rgba(0,0,0,.8);
    		border-radius: 5px;
    		bottom: 26px;
    		color: #fff;
    		content: attr(title);
    		left: 20%;
    		padding: 5px 15px;
    		position: absolute;
    		z-index: 98;
    		width: 220px;
		}
		
		.tooltip:hover:before{
    		border: solid;
    		border-color: #333 transparent;
    		border-width: 6px 6px 0 6px;
    		bottom: 20px;
    		content: "";
    		left: 50%;
    		position: absolute;
    		z-index: 99;
		}
	
	</style>
	
	
</head>
<body>


<br /><br /><br /><br />
<a href="#" title="This is some information for our tooltip." class="tooltip"><span title="More">CSS3 Tooltip</span></a>


</body>
</html>
