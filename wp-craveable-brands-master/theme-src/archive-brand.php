<?php

/* Template Name: Brand */

$data = Context::getDefaultContext();
$data['post'] = Timber::get_post([
	'post_type' => 'page',
	'name' => 'brand',
]);
$metaData = new Meta($data['post'], $data['site']);
$data['meta'] = $metaData->getData();
Timber::render('master.twig', $data);

?>
