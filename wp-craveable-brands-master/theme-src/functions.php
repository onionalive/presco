<?php

add_filter('show_admin_bar', '__return_false');

require_once('functions/acf.php');
require_once('functions/meta.php');
require_once('functions/wp_api.php');
require_once('functions/theme_support.php');
require_once('functions/enqueue_scripts.php');
require_once('functions/context.php');

?>