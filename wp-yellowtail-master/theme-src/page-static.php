<?php

/* Template Name: Static */

$data = Context::getDefaultContext();

$data['page'] = Timber::get_post();
$data['title'] = $data['page']->title;

if (!empty($data['page']->description)) {
	$data['description'] = $data['page']->description;
}

$data['meta']['title'] = $data['page']->title . " | " . $data['site']->title;

Timber::render('static.twig', $data);

?>
