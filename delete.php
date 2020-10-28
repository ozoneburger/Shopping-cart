<?php
$file = $_GET['file'];
if(!unlink($file))
{
	echo ("Error deleting $file!");
}
else
{
	echo ("Deleted $file done!");
}
?>