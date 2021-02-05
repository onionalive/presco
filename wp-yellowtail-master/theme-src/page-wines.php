<?php

/* Template Name: Wines */

$data = Context::getDefaultContext();

$data['page'] = Timber::get_post();

$data['title'] = 'A wine for any <span>occasion</span>';
$data['filters'] = GridFilters::getFilters();

$data['wines'] = Timber::get_posts([
	'post_type' => 'wine',
	'order' => 'ASC',
	'posts_per_page' => -1
]);

$data['countryCodes'] = Context::getCountriesWithFilteredWines();

$data['meta']['title'] = "A wine for any occasion | " . $data['site']->title;

Timber::render('wines.twig', $data);

?>
