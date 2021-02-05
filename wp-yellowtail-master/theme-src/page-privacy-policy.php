<?php

/* Template Name: privacy */

$data = Context::getDefaultContext();

$data['title'] = 'Privacy Policy';

$data['privacy'] = Timber::get_post();

$data['meta']['title'] = "Privacy Policy | " . $data['site']->title;

Timber::render('privacy-policy.twig', $data);

?>
