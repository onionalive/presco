<?php

/* Template Name: recipes */

$data = Context::getDefaultContext();

$data['page'] = Timber::get_post();
$data['title'] = $data['page']->title;

if (!empty($data['page']->description)) {
	$data['description'] = $data['page']->description;
}

$data['meta']['title'] = "Recipes | " . $data['site']->title;
$data['meta']['description'] = "We're constantly looking for interesting and unique ways to enjoy [yellow tail] and if it involves shaking some cocktails, then so be it.";

$data['filters'] = GridFilters::getFilters();

$data['recipes'] = Timber::get_posts([
	'post_type' => 'recipe',
	'order' => 'ASC',
	'posts_per_page' => -1
]);

$data['countryCodes'] = Context::getCountriesWithFilteredWines();

Timber::render('recipes.twig', $data);

?>
