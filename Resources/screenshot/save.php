<?php
	$data = $_POST['data'];
	$file = md5(uniqid()) . '.png';
	 
	// remove "data:image/png;base64,"
	$uri =  substr($data,strpos($data,",")+1);
	 
	// save to file
	file_put_contents('./'.$file, base64_decode($uri));
	 
	// return the filename
	echo $file; exit;
?>