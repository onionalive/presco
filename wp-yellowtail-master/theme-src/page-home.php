<?php

/* Template Name: Homepage */

$data = Context::getDefaultContext();

// Set page title
$data['title'] = $data['site']->title;

$data['page'] = Timber::get_post();

Timber::render('home.twig', $data);

?>
