<?php

require_once('_conn.php');

$query = 'SELECT * FROM iodump WHERE timestamp>'.$lasttime;

mysql_query($query);

$result = mysql_query($query);

$rows = array();
while($row = mysql_fetch_assoc($result)){
    $rows[] = new array($row['timestamp'],$row['jsondump']);
}

$json = json_encode($rows); 

