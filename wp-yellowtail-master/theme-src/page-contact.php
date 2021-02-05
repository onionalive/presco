<?php

/* Template Name: contact */

$data = Context::getDefaultContext();

// $data['post'] = Timber::get_post();

/* uncomment your preferred method below and and insert the key you would like */

/* Option 1 */

// $data['contact'] = Timber::get_posts($data['post']->contact);

/* Option 2 */

// $data['contact'] = Timber::get_posts([
// 	'post_type' => 'contact',
// 	'order' => 'ASC',
// 	'orderby' => 'meta_value',
// 	'meta_key' => 'sort_name',
// 	'post_per_page' => -1
// ]);

// $metaData = new Meta($data['post'], $data['site']);
// $data['meta'] = $metaData->getData();

$data['meta']['title'] = "Contact | " . $data['site']->title;
$data['page'] = Timber::get_post();

Timber::render('contact.twig', $data);

?>
