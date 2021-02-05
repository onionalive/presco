<?php

$data = Context::getDefaultContext();

$data['agegate'] = AgegateFilters::getFilters();

if ($data['agegate'] != null) {
	Timber::render('agegate.twig', $data);
} else {
	http_response_code(404);
}

?>