<?php

/* Template Name: Big Game 2018 */

error_log('yo yo ');

$data = Context::getDefaultContext();

$data['page'] = Timber::get_post();
$data['meta']['title'] = $data['page'] . " | " . $data['site']->title;
error_log('yo yo ');
Timber::render('big-game-2018.twig', $data);

?>
