<?php

class Context {

	// Set up all of the Timber context stuff we need on every page
	public static function getDefaultContext() {
		global $wp;
		$data = Timber::get_context();
		$data['options'] = get_fields('options');

		if(defined('GOOGLE_MAPS_API')) {
			$data['options']['google_maps_api'] = constant("GOOGLE_MAPS_API");
		}

		$data['countries'] = Multisite::listCountries();

		$data['meta'] = [
			"title" => $data['site']->title,
			"description" => $data['site']->description,
			"image" => $data['theme']->link . "/img/opengraph.png",
			"url" => home_url(add_query_arg(array(),$wp->request)) . "/"
		];

		return $data;
	}

	public static function getCountriesWithFilteredWines() {
		$countries = Timber::get_posts([
			'post_type' => 'country',
			'order' => 'ASC',
			'orderby' => 'post_title',
			'posts_per_page' => -1,
		]);

		$countryCodes = [];
		foreach($countries as $country) {
			if($country->get_field('availability') == true) {
				$countryCodes[] = $country->get_field('country_code');
			}
		}

		return implode("|",$countryCodes);
	}
}
