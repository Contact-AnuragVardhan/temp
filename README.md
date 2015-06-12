<!--http://dev.sencha.com/deploy/ext-4.0.0/examples/tree/treegrid.html -->

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
  <style>
	.hbox 
	{
		display: -webkit-box;
		-webkit-box-orient: horizontal;
		-webkit-box-align: stretch;
	 
		display: -moz-box;
		-moz-box-orient: horizontal;
		-moz-box-align: stretch;
	 
		display: box;
		box-orient: horizontal;
		box-align: stretch;
	}

	.arrow-down 
	{
		width: 0; 
		height: 0; 
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 5px solid #000;
	}

	.arrow-right 
	{
		width: 0; 
		height: 0; 
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
		border-left: 5px solid #000;
	}
  </style>
  
</head>
<body onload="initialise();">

<div class="container">
  <h2>Basic Table</h2>
  <p>The .table class adds basic styling (light padding and only horizontal dividers) to a table:</p>            
  <table class="table" id="me">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr id="row1">
        <td> 
			<div class="hbox">
				<div id="compArrow1" class="arrow-down" onclick="arrowClickHandler(event)"></div>
				&nbsp;&nbsp;
				<div>aaa</div>
			</div>
		</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr class="row#1">
        <td style="padding-left:40px;">Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr class="row#1">
        <td style="padding-left:40px;">	July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
      </tr>
	  <tr id="row2">
        <td> 
			<div class="hbox">
				<div id="compArrow2" class="arrow-down" onclick="arrowClickHandler(event)"></div>
				&nbsp;&nbsp;
				<div>aaa</div>
			</div>
		</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr class="row#2">
        <td style="padding-left:40px;">Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr class="row#2">
        <td style="padding-left:40px;">	July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
      </tr>
	  <tr id="row3">
        <td> 
			<div class="hbox">
				<div id="compArrow3" class="arrow-down" onclick="arrowClickHandler(event)"></div>
				&nbsp;&nbsp;
				<div>aaa</div>
			</div>
		</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr class="row#3">
        <td style="padding-left:40px;">Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr class="row#3">
        <td style="padding-left:40px;">	July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
      </tr>
    </tbody>
  </table>
</div>

<script>
	var isCollapsed = true;
	function initialise()
	{
		collapseExpandAll(true);
	}
	function collapseExpandAll(isCollapse)
	{
		hideShowRow(1);
		hideShowRow(2);
		hideShowRow(3);
	}
	function arrowClickHandler(event)
	{
		var target = event.target;
		if(target && target.id)
		{
			var rowNum = target.id.substring(target.id.length - 1);
			hideShowRow(rowNum);
		}
	}
	function hideShowRow(rowCount)
	{
		if(rowCount > 0)
		{
			var isRowCollapsed = true;
			var  childClass = "row#" + rowCount;
			var arrChildRows = document.getElementsByClassName(childClass);
			if(arrChildRows && arrChildRows.length > 0)
			{
				for(var count = 0;count < arrChildRows.length;count++)
				{
					if(arrChildRows[count].style.display == "none")
					{
						isRowCollapsed = false;
						arrChildRows[count].style.display = "";
					}
					else
					{
						isRowCollapsed = true;
						arrChildRows[count].style.display = "none";
					}
				}
				var compArrow = document.getElementById("compArrow" + rowCount);
				if(compArrow)
				{
					if(isRowCollapsed)
					{
						compArrow.className = "arrow-right";
					}
					else
					{
						compArrow.className = "arrow-down";
					}
				}
			}
		}
	}
</script>

</body>
</html>
