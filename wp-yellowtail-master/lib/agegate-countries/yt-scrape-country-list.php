<?php

// $argument1 = $argv[1];
 
//create cURL connection
$curl_connection = 
  curl_init("http://www.yellowtailwine.com/Scripts/agegate.js");
  
//set options
curl_setopt($curl_connection, CURLOPT_CONNECTTIMEOUT, 3);
curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl_connection, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl_connection, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($curl_connection, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0');
 
//perform our request
$result = curl_exec($curl_connection);
 
//show information regarding the request
echo curl_errno($curl_connection) . '-' . 
                curl_error($curl_connection);
 
//close the connection
curl_close($curl_connection);

print_r($result);
 
?>