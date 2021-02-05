<?php

add_filter('get_twig', 'yt_twig');

function yt_twig($twig) {
    /* this is where you can add your own fuctions to twig */
    $twig->addExtension(new Twig_Extension_StringLoader());
    // Get filter attributes
    $twig->addFilter(new Twig_SimpleFilter('filterAttributes', ['GridFilters','getAttributes']));
    $twig->addFilter(new Twig_SimpleFilter('checkSpelling', ['GridFilters','checkSpelling']));
    $twig->addFilter(new Twig_SimpleFilter('darkenColour', ['Recipes','darkenColour']));
	$twig->addFilter(new Twig_SimpleFilter('nl2p', 'nl2p'));
    $twig->addFilter(new Twig_SimpleFilter('slug', 'slug'));
    return $twig;
}

function nl2p($string) {
	$paragraphs = '';

	foreach (explode("\n", $string) as $line) {
        if (trim($line)) {
            $paragraphs .= '<p>' . $line . '</p>';
        }
    }

    return $paragraphs;
}

function slug($slug) {
    $slug = strtolower($slug);
    $slug = preg_replace("/[^a-z ]/", '', $slug);
    $slug = str_replace(" ", "-", $slug);
    $slug = str_replace("--", "-", $slug);
    return $slug;
}

?>
