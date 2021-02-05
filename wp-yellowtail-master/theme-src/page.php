<?php

/* Template Name: Page */

$data = Context::getDefaultContext();

$data['page'] = Timber::get_post();

if (!empty($data['page']->description)) {
	$data['description'] = $data['page']->description;
}

Timber::render('page.twig', $data);

?>
