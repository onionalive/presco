<?php

/* Template Name: Recipe */

global $post;

$data = Context::getDefaultContext();

$data['recipe'] = Timber::get_post();

$data['wine'] =  Timber::get_post($data['recipe']->wines);
$data['varietal'] =  Timber::get_post($data['wine']->varietal);

$data['meta']['title'] = $data['recipe']->title . " | " . $data['site']->title;
$data['meta']['description'] = $data['recipe']->introductory_paragraph_long;
$data['meta']['image'] = $data['recipe']->get_thumbnail->src;

Timber::render('recipe.twig', $data);

?>
