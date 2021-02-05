<?php

class AgegateFilters {

	public static function getFilters() {
		return [
			'countries' => self::getCountries()
		];
	}

	public static function getCountries() {
		return [
			[
				'option' => 'Australia'
			],
			[
				'option' => 'China'
			],
			[
				'option' => 'USA'
			]
		];
	}
}
