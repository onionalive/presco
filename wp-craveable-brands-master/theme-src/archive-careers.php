<?php

/* Template Name: Careers */

$data = Context::getDefaultContext();
$data['post'] = Timber::get_post([
	'post_type' => 'page',
	'name' => 'careers',
]);
$metaData = new Meta($data['post'], $data['site']);
$data['meta'] = $metaData->getData();
Timber::render('master.twig', $data);

?>
