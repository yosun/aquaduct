<?php

require_once('_conn.php');

if(!isset($_REQUEST['jsondump']))die('jsondump');

$jsondump = $_REQUEST['jsondump'];

$query = mins('iodump',array('jsondump'),
                       array($jsondump));
mquery($query);

echo '!';