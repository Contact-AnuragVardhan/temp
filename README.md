<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Test</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<!--   <link href="lib/css/com/org/nsScroller.css" rel="stylesheet" media="all" /> -->
  <link href="lib/css/com/org/component.css" rel="stylesheet" media="all" />
  <script src="lib/com/org/util/nsUtil.js"></script>
  <script src="lib/com/org/util/nsScroller.js"></script>
</head>
<body onload="initialize()">
	
	<div id="divContent" style="width:200px;height:200px;overflow:auto">
		<div style="width:400px;">
           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet mollitia vero quam, nisi possimus dolorem asperiores, molestiae sit voluptatibus alias consequuntur laudantium repellat ea quidem quaerat rerum perspiciatis iste adipisci.</p>
           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda earum facilis sed nihil numquam at accusamus eum error eaque alias hic sint rem consequatur impedit tempore, dolor, quos, quae esse?</p>
           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore maiores maxime corrupti quisquam. Dignissimos sunt error voluptatibus repellat consequatur illo, aliquid nihil maxime veniam repudiandae, provident et sit, reiciendis dicta.</p>
           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae id amet deserunt voluptate maiores sunt aut eligendi totam nesciunt magnam illo consectetur aspernatur at voluptatem, qui unde ullam omnis voluptates.</p>
           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id assumenda et fugiat placeat enim quas, voluptas odio aperiam in quibusdam beatae eaque minima. Consequuntur pariatur, doloremque, odit dolorem ullam sunt!</p>
		</div>
	</div>
	<br/>
	<br/>
	
	<script>
		function initialize()
		{
			var element = document.querySelector('#divContent');
			new NSScroller(element);
		}
	</script>


</body>
</html>
