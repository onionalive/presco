<?php

class GridFilters {

	public static function getFilters() {
		return [
			'selections' => self::getSelections(),
			'varietals' => self::getVarietals(),
			'flavours' => self::getFlavours(),
			'enjoys' => self::getEnjoys()
		];
	}

	public static function getSelections() {
		$array = [];
		$selections = Timber::get_terms([
			'taxonomy' => 'varietal',
			'parent' => 0
		]);

		foreach ($selections as $obj) {
			$array[] = [
				'key' => $obj->slug,
				'value' => $obj->name
			];
		}

		return $array;
	}

	public static function getVarietals() {
		$array = [];
		$varietals = Timber::get_terms([
			'taxonomy' => 'varietal',
			'childless' => true
		]);

		foreach ($varietals as $obj) {
			$array[] = [
				'key' => $obj->slug,
				'value' => $obj->name
			];
		}

		return $array;
	}

	public static function getFlavours() {

		$array = [];
		$flavours = Timber::get_terms('flavour');

		foreach ($flavours as $obj) {
			$array[] = [
				'key' => $obj->slug,
				'value' => ucwords($obj->name)
			];
		}

		return $array;
	}

	public static function getEnjoys() {

		$array = [];
		$enjoys = Timber::get_terms('enjoy');

		foreach ($enjoys as $obj) {
			$array[] = [
				'key' => $obj->slug,
				'value' => ucwords($obj->name)
			];
		}

		return $array;
	}

	// Get data attributes to enable filtering
	public static function getAttributes($post) {
		if ($post->type == "wine") {
			return self::getWineAttributes($post);
		} else if ($post->type == "recipe") {
			return self::getRecipeAttributes($post);
		}
		return "";
	}

	public static function getCountryWines() {

		$country = $_POST['country'];


		$country = Timber::get_post([
			'post_type' => 'country',
			's' => $country
		]);

		$wines = Timber::get_posts([
			'post_type' => 'wine',
			'meta_query' => array(
				array(
					'key' => 'countries',
					'value' => $country->ID,
					'compare' => 'LIKE'
				)
			)
		]);

		$list = [];

		foreach ($wines as $wine) {
			$list[$wine->id] = $wine->post_title;
		}

		return json_encode($list);
	}

	private static function getWineAttributes($post) {
		$varietals = $post->terms('varietal');
		$flavours = $post->terms('flavour');
		$countries = $post->get_field('countries');
		$enjoys = $post->terms('enjoy');

		// ! Disabled until we get varietals data
		//return "data-types='" . self::getTermsString($varietals,true) . "' data-varietals='" . self::getTermsString($varietals) . "' data-flavours='" . self::getTermsString($flavours) . "'";
		return "data-types='" . self::getTermsString($varietals) . "' data-flavours='" . self::getTermsString($flavours) . "' data-countries='" . self::getCountriesString($countries) . "'" . "' data-enjoys='" . self::getTermsString($enjoys) . "'";
	}

	private static function getRecipeAttributes($recipe) {
		$wine = new TimberPost($recipe->get_field('wines'));	

		return self::getWineAttributes($wine);
	}

	private static function getTermsString($terms, $useParent = false) {
		$slugs = [];
		foreach($terms as $term) {
			if($useParent) {
				$term = new TimberTerm($term->parent);
			}
			$slugs[] = @$term->slug;
		}

		return implode("|", $slugs);
	}

	public static function checkSpelling($str) {
		$site = new TimberSite();

		$americanSpelling = array(
			'flavor',
			'color'
		);

		$englishSpelling = array(
			'flavour',
			'colour'
		);

		if (strpos($site->url, '/us') !== false) {
			return str_replace($englishSpelling, $americanSpelling, $str);
		}

		return $str;
	}

	private static function getCountriesString($countries) {
		$codes = [];
		foreach($countries as $country) {
			$codes[] = $country->get_field('country_code');
		}

		return implode("|", $codes);
	}
}
