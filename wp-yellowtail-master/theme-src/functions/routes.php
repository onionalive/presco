<?php

if(class_exists('Routes')) {
	Routes::map('api/submitForm', function() {
		$send = Mail::send();
		echo $send;
		die();
	});

	Routes::map('api/location', function($params) {

		$lat = $_GET['lat'];
		$lng = $_GET['lng'];
		$page = $_GET['page'];

		$storeLocator = new StoreLocator($lat, $lng, $page);
		$res = $storeLocator->getStores();
		echo json_encode($res);
		die();
	});

	Routes::map('agegate', function() {
		require_once('agegate.php');
		die();
	});
}

?>
