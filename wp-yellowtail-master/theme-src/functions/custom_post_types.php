<?php

add_action( 'init', 'cptui_register_my_cpts_country' );
function cptui_register_my_cpts_country() {
	$labels = array(
		"name" => __( 'Countries', '' ),
		"singular_name" => __( 'Country', '' ),
		);

	$args = array(
		"label" => __( 'Countries', '' ),
		"labels" => $labels,
		"description" => "",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => false,
		"rest_base" => "",
		"has_archive" => false,
		"show_in_menu" => true,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => false,
		"rewrite" => array( "slug" => "country", "with_front" => true ),
		"query_var" => true,
		"supports" => array( "title" )
	);
	register_post_type( "country", $args );
}

add_filter( 'enter_title_here', 'custom_enter_title' );
function custom_enter_title( $input ) {
	global $post_type;
	if ( 'country' === $post_type ) {
		return __( 'Enter country here', 'your_textdomain' );
	}
	return $input;
}

?>