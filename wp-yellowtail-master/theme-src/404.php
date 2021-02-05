<?php

/* Template Name: 404 */

$data = Context::getDefaultContext();

$data['post'] = Timber::get_post();

$data['meta'] = [
	"title" =>  "404 page not found",
	"description" => $data['site']->description,
	"image" => $data['theme']->link . "/img/opengraph.jpg",
	"url" => home_url(add_query_arg(array(),$wp->request)) . "/"
];


Timber::render('404.twig', $data);

?>
