<?php

ob_start();
add_action(
	'shutdown',
	function() {
		$final = '';
		// We'll need to get the number of ob levels we're in, so that we can iterate over each, collecting
		// that buffer's output into the final output.
		$levels = ob_get_level();
		// error_log('level: '.$levels);
		for ($i = 0; $i < $levels; $i++) {
			$final .= ob_get_clean();
		}
		if(!is_admin() && !(@$GLOBALS['pagenow'] == "wp-login.php") && !(@$GLOBALS['pagenow'] == "wp-activate.php")) {
		// Apply any filters to the final output
			// error_log(print_r($final, true));
			$final = apply_filters('final_output', $final);
		}
		echo $final;
	},
	0
);

add_filter('final_output', function($output) {
	$updatedOutput = '';
	foreach(preg_split("/((\r?\n)|(\r\n?))/", $output) as $line){
		if (
			(strpos($line, '<meta') === false) &&
			(strpos($line, '<title>') === false)
		) {
			$line = preg_replace('/\[yellow tail\]+/', '<span class="nowrap">[yellow tail]</span>', $line);
		}
		$updatedOutput .= $line."\n\r";
	} 

	return $updatedOutput;
});

?>