<?php

class StoreLocator {
	public $range;
	public $page;
	public $stores;
	public $current_location;

	function __construct($lat, $lng, $page) {
		$this->page = $page;
		$this->current_location = [$lat, $lng];
	}

	public function getStores() {
		$this->range = $this->calculateRange();
		$this->stores = $this->getStoresWithinRange();
		return $this->getSortedDistances();
	}

	public function getStoresWithinRange() {
		$args = array(
			'relation' => 'AND',
			array(
				'key' => 'lat',
				'value' => array($this->range['latN'], $this->range['latS']),
				'compare' => 'BETWEEN'
			),
			array(
				'key' => 'lng',
				'value' => array($this->range['lonW'], $this->range['lonE']),
				'compare' => 'BETWEEN'
			)
		);

		return Timber::get_posts([
			'post_type' => 'store',
			'posts_per_page' => -1,
			'meta_query' => $args
		]);
	}

	public function calculateRange() {
		$lat1 = $this->current_location[0];
		$lng1 = $this->current_location[1];

		// Distance in miles
		$d = 31;
		// Earth's radius in miles
		$r = 3959;
		$latN = rad2deg(asin(sin(deg2rad($lat1)) * cos($d / $r) + cos(deg2rad($lat1)) * sin($d / $r) * cos(deg2rad(0))));
		$latS = rad2deg(asin(sin(deg2rad($lat1)) * cos($d / $r) + cos(deg2rad($lat1)) * sin($d / $r) * cos(deg2rad(180))));

		return [
			'latN' => $latN,
			'latS' => $latS,
			'lonE' => rad2deg(deg2rad($lng1) + atan2(sin(deg2rad(90)) * sin($d / $r) * cos(deg2rad($lat1)), cos($d / $r) - sin(deg2rad($lat1)) * sin(deg2rad($latN)))),
			'lonW' => rad2deg(deg2rad($lng1) + atan2(sin(deg2rad(270)) * sin($d / $r) * cos(deg2rad($lat1)), cos($d / $r) - sin(deg2rad($lat1)) * sin(deg2rad($latN))))
		];
	}

	public function getSortedDistances() {
		$storeDistances = array_map(
			array('StoreLocator','calculateDistance'),
			$this->stores
		);

		usort(
			$storeDistances,
			array('StoreLocator', 'customSort')
		);

		if ($this->page) {
			$this->page = $this->page*10 + 1;
		}

		$stores = array_slice($storeDistances, $this->page, 10);

		return array_map(
			array('StoreLocator','getSortedStores'),
			$stores
		);
	}

	public function getSortedStores($obj) {
		$storeObj = null;
		foreach($this->stores as $store) {
			if ($obj['storeID'] == $store->ID) {
				$storeObj = $store;
				break;
			}
		}

		if ($storeObj->chain_name && $storeObj->suburb) {
			$name = $storeObj->chain_name . ' - ' . $storeObj->suburb;
		} else {
			$name = $storeObj->post_title;
		}

		return [
			'lat' => $storeObj->lat,
			'lng' => $storeObj->lng,
			'name' => $name,
			'address' => $storeObj->address.', '.$storeObj->suburb.' '.$storeObj->state.' '.$storeObj->postcode,
			'distance' => $obj['distance']
		];
	}

	public function customSort($a, $b) {
		return $a['distance'] > $b['distance'];
	}

	public function calculateDistance($store) {

		list($lat1, $lon1) = [$store->lat, $store->lng];
		list($lat2, $lon2) = $this->current_location;

		$theta = $lon1 - $lon2;
		$dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
		$dist = acos($dist);
		$dist = rad2deg($dist);
		$dist = $dist * 60 * 1.1515; // miles
		$dist = $dist / 5 * 8; // miles -> km
		$dist = number_format((float)$dist, 2, '.', '');

		return [
			'distance' => $dist,
			'storeID' => $store->ID
		];
	}
}

?>
