<?php

// Add custom image sizes
if (function_exists('add_theme_support')) {

    // Add Thumbnail Theme Support
    add_theme_support('post-thumbnails');
}

// Add new image sizes
function image_sizes() {
	if ( function_exists( 'add_image_size' ) ) {
		add_image_size('wine_feature', 450, 820);
		add_image_size('ingredients_feature', 820, 820);
		add_image_size('wine_grid', 72, 300);
		add_image_size('wine_grid_2x', 144, 600);
		add_image_size('faqs_grid', 160, 160, array( 'center', 'center' ));
		add_image_size('recipe_grid', 112, 260, array( 'center', 'center' ));
		add_image_size('recipe_full', 556, 556, array( 'center', 'center' ));
	}
}
add_action('after_setup_theme', 'image_sizes');



// Removes Items from admin menu
add_action('admin_menu', 'my_remove_admin_menus');
function my_remove_admin_menus() {
	remove_menu_page('edit-comments.php');  // Comments
}

add_action('init', 'my_add_excerpts_to_pages' );
function my_add_excerpts_to_pages() {
	 add_post_type_support( 'page', 'excerpt' );
}

// Add some custom CSS to admin
// ! Disabled until we get varietal info
// function yt_custom_admin_css() {
// 	echo '<style>
// 		#varietalchecklist > li > label.selectit > input { display: none !important; }
// 	</style>';
// }
// add_action('admin_head', 'yt_custom_admin_css');

?>
