<?php

/* Template Name: Wine */

global $post;

$data = Context::getDefaultContext();

$data['wine'] = Timber::get_post();

$data['wines'] = Timber::get_posts([ 
    'post_type' => 'wine', 
    'order' => 'ASC', 
  	'post_per_page' => -1 
]);

$data['meta']['title'] = $data['wine']->title . " | " . $data['site']->title;
$data['meta']['description'] = $data['wine']->introductory_paragraph;

$countries = Timber::get_posts([ 
    'post_type' => 'country', 
    'order' => 'ASC', 
  	'post_per_page' => -1 
]);

$data['countryCodes'] = Context::getCountriesWithFilteredWines();

Timber::render('wine.twig', $data);

?>
