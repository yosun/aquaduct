<?php

require_once('_conn.php');

if(!isset($_REQUEST['lasttime']))die('lasttime');
$lasttime=$_REQUEST['lasttime'];

$query = 'SELECT * FROM iodump WHERE timestamp>\''.$lasttime.'\' ORDER BY timestamp DESC';

mysql_query($query);

$result = mysql_query($query);

$rows = array();
while($row = mysql_fetch_assoc($result)){
    $rows[] = $row['jsondump'];
    $timestamp = $row['timestamp'];
}

$json['timestamp'] = $timestamp;
$json['data'] = ($rows); 

echo stripslashes(json_encode($json));