<?php

require_once('_conn.php');

$query = mins('iodump',array('jsondump'),
                       array($jsondump));
mquery($query);