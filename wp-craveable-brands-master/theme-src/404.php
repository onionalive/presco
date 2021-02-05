<?php

/* Template Name: Error */

$data = Context::getDefaultContext();

$data['post'] = Timber::get_post();
$metaData = new Meta($data['post'], $data['site']);
$data['meta'] = $metaData->getData();

Timber::render('master.twig', $data);

?>
