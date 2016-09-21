<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>How to take screenshot of webpage using PHP & jQuery</title>
<script type="text/javascript" src="jquery-1.11.3-jquery.min.js"></script>
<script type="text/javascript" src="html2canvas.js"></script>

<style type="text/css">
*{margin:0;padding:0;}
#main-container
{
	margin:50px auto;
	padding:15px;
	border:solid #cdcdcd 1px;
	width:500px;
	background:#f9f9f9;
}
table,td
{
	font-family:Verdana, Geneva, sans-serif;
	width:100%;
	border-collapse:collapse;
	padding:10px;
}
input
{
	width:100%;
	height:35px;
	text-align:left;
	padding-left:10px;
	border:solid #cddcdc 2px;
	font-family:Verdana, Geneva, sans-serif;
	border-radius:3px;
}
button
{
	text-align:center;
	width:48%;
	height:35px;
	border:0;
	font-family:Verdana, Geneva, sans-serif;
	border-radius:3px;
	background:#364956;
	color:#fff;
	font-weight:bolder;
	font-size:18px;
	border-radius:10px;
}
hr
{
	border:solid #cecece 1px;
}
#header
{
	width:100%;
	height:50px;
	background:#364956;
	text-align:center;
}
#header h1
{
	font-family:Verdana, Geneva, sans-serif;
	font-size:18px;
	color:#f9f9f9;
	padding-top:10px;
}
a{
	font-family:Verdana, Geneva, sans-serif;
	color:#364956;
	text-decoration:none;
}
</style>
</head>

<body>

<div id="header">
	<h1>StepBlogging.com - How to take screenshot of webpage using PHP & jQuery</h1>
</div>
<br /><br />
<center><a href="http://www.stepblogging.com/how-to-take-screenshot-of-webpage-using-php-jquery" target='_blank' title='How to take screenshot of webpage using PHP & jQuery'>Tutorial Link</a></center>

<div id="main-container">
	<div id="form" class="result">
		<button type="button" onclick="captureCurrentDiv()">Current Div</button>
		<button type="button" onclick="captureFullPage()">Full Page</button>
	</div>
</div>
</body>
</html>
<script type="text/javascript">
	function captureCurrentDiv()
	{
		html2canvas([document.getElementById('main-container')], {   
			onrendered: function(canvas)  
			{
				var img = canvas.toDataURL()
				$.post("save.php", {data: img}, function (file) {
				window.location.href =  "download.php?path="+ file});   
			}
		});
	}
	
	function captureFullPage()
	{
		html2canvas(document.body, {  
			onrendered: function(canvas)  
			{
				var img = canvas.toDataURL()
				$.post("save.php", {data: img}, function (file) {
				window.location.href =  "download.php?path="+ file});   
			}
		});
	}
</script>