<?php

$u='';
$p='';
$db='';

$conn = mysql_connect('localhost',$u,$p);
mysql_select_db($db);

require_once('fn_mysql.php');