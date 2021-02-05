<?php

/* Template Name: faqs */

$data = Context::getDefaultContext();

$data['title'] = 'Frequently asked questions';

$data['faqs'] = Timber::get_post();

$data['meta']['title'] = "Frequently Asked Questions | " . $data['site']->title;

Timber::render('faqs.twig', $data);

?>
