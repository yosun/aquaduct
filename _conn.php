<?php

$u='beaner';
$p='bean123';
$db='bean123';

$conn = @mysql_connect('localhost',$u,$p);
@mysql_select_db($db);
$c0nn=$conn;
require_once('fn_mysql.php');
