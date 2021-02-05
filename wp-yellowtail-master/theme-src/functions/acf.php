<?php

add_filter('acf/settings/save_json', function() {
  return str_replace("/wp/","/",get_home_path()).'theme-src/acf-json';
});

add_filter('acf/settings/load_json', function($paths) {
  $paths[] = get_stylesheet_directory() . '/acf-json';
	return $paths;
});

if(function_exists('acf_add_options_page')) {
	acf_add_options_page();
}

function my_post_title_updater( $post_id ) {

if ( get_post_type( $post_id ) == 'flavour' ) {

		$my_post = array();
		$my_post['ID'] = $post_id;
		$my_post['post_title'] = get_field( 'flavour', $post_id );

		wp_update_post( $my_post );
	}
}

add_action('acf/save_post', 'my_post_title_updater', 20);

function inspiration_relationship_query( $args, $field, $post_id ) {

	// Only show posts which belong to the current Inspiration taxonomy
	$tag = explode("_", $post_id);
	if($tag[1]) {
		$args['tax_query'] = [[
			'taxonomy' => $tag[0],
			'field' => 'id',
			'terms' => $tag[1],
		]];
	}

	return $args;
}

function my_acf_google_map_api( $api ){
	$api['key'] = GOOGLE_MAPS_API;
	return $api;
}
add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');

add_filter('acf/fields/relationship/query/key=field_57a2cef3e6efd', 'inspiration_relationship_query', 10, 3);

?>
