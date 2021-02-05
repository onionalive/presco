<?php

/* Template Name: Archive-Responsibilities */

$data = Context::getDefaultContext();
$data['post'] = Timber::get_post([
	'post_type' => 'page',
	'name' => 'responsibilities',
]);
$metaData = new Meta($data['post'], $data['site']);
$data['meta'] = $metaData->getData();
Timber::render('master.twig', $data);


?>
