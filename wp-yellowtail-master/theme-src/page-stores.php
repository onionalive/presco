<?php

/* Template Name: Stores */

$data = Context::getDefaultContext();

$data['page'] = Timber::get_post();
$data['title'] = $data['page']->title;


// Todo: is this bit still required?
$data['filters'] = GridFilters::getFilters();

$data['wines'] = Timber::get_posts([
	'post_type' => 'wine',
	'order' => 'ASC',
	'posts_per_page' => -1
]);

if (!empty($data['page']->description)) {
	$data['description'] = $data['page']->description;
}

$data['meta']['title'] = "Where to buy | " . $data['site']->title;
$data['meta']['description'] = "[yellow tail] wines are available to enjoy world wide. Enter your location and we’ll find your closest stockist.";

// Set CMS specific copy for when there are no results from Where to Buy
$data['no_results_copy'] = $data['page']->no_results_copy;

Timber::render('stores.twig', $data);

?>
