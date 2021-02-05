<?php

add_filter('show_admin_bar', '__return_false');

require_once('functions/theme_support.php');
require_once('functions/acf.php');
require_once('functions/custom_post_types.php');
require_once('functions/enqueue_scripts.php');
require_once('functions/recipes.php');
require_once('functions/twig.php');
require_once('functions/multisite.php');
require_once('functions/context.php');
require_once('functions/grid_filters.php');
require_once('functions/mail.php');
require_once('functions/routes.php');
require_once('functions/agegate_filters.php');
require_once('functions/post_filters.php');
require_once('functions/store_locator.php');

?>
