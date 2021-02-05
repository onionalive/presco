<?php

function load_scripts() {
	if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
		wp_deregister_script('jquery');

		$manifest = @file_get_contents(get_template_directory() . '/js/manifest.json');
		if($manifest) {
			$manifest = json_decode($manifest, true);
		} else {
			exit();
		}

		wp_register_script(
			'custom-scripts',
			get_template_directory_uri() . '/js/' . ($manifest['scripts.min.js']),
			array(),
			null,
			true
		);

		wp_register_script(
			'vendor-scripts',
			get_template_directory_uri() . '/js/' . ($manifest['vendor.min.js']),
			array(),
			null,
			true
		);

		wp_enqueue_script('vendor-scripts');
		wp_enqueue_script('custom-scripts');
	}
}
add_action('wp_enqueue_scripts', 'load_scripts'); // Add Custom Scripts to wp_head

function load_styles() {
	if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
		$manifest = @file_get_contents(get_template_directory() . '/css/manifest.json');
		if($manifest) {
			$manifest = json_decode($manifest, true);
		} else {
			exit();
		}

		wp_register_style(
			'custom-styles',
			get_template_directory_uri() . '/css/' . ($manifest['main.css']),
			array(),
			null
		);

		// Register CSS
		wp_enqueue_style('custom-styles');
	}
}
add_action('wp_enqueue_scripts', 'load_styles'); // Add Custom Styles to wp_head

?>
