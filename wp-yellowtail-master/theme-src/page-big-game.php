<?php

/* Template Name: Big Game */

$data = Context::getDefaultContext();

$data['page'] = Timber::get_post();
$data['meta']['title'] = $data['page'] . " | " . $data['site']->title;

Timber::render('big-game.twig', $data);

?>
