<?php

/* Template Name: Archive-Leaders */

$data = Context::getDefaultContext();
$data['post'] = Timber::get_post([
	'post_type' => 'page',
	'name' => 'our-leaders',
]);
$metaData = new Meta($data['post'], $data['site']);
$data['meta'] = $metaData->getData();
Timber::render('master.twig', $data);


?>
