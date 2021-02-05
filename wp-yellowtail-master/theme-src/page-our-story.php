<?php

/* Template Name: OurStory */

$data = Context::getDefaultContext();

// Set page title
$data['title'] = $data['site']->title;

$data['page'] = Timber::get_post();

// organise sections nicely for Twig
$data['sections'] = [];
foreach($data['page']->sections as $key=>$section) {
	if ($section == "text_section") {
		$arr = [
			"type" => $section,
			"copy" => $data['page']->{"sections_".$key."_copy"}
		];
		array_push($data['sections'], $arr);
	} else if ($section == "two_images") {
		$arr = [
			"type" => $section,
			"image_one" => $data['page']->{"sections_".$key."_image_one"},
			"image_two" => $data['page']->{"sections_".$key."_image_two"}
		];
		array_push($data['sections'], $arr);
	} else {
		$arr = [
			"type" => $section,
			"image_one" => $data['page']->{"sections_".$key."_image_one"},
			"image_two" => $data['page']->{"sections_".$key."_image_two"},
			"image_three" => $data['page']->{"sections_".$key."_image_three"}
		];
		array_push($data['sections'], $arr);
	}
}

Timber::render('our-story.twig', $data);

?>
