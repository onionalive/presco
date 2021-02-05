<?php

class Multisite {
	public static function listCountries() {
		return [
			[
				'key' => 'US',
				'url' => network_site_url().'/us/',
				'title' => 'USA',
				'flag' => '/img/flags/us.svg'
			],
			[
				'key' => 'AU',
				'url' => network_site_url(),
				'title' => 'Australia',
				'flag' => '/img/flags/au.svg'
			]
		];
	}
}
