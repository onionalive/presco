<?php

class Meta {

	function __construct ($post, $site, $type = 'page') {
		$this->post = $post;
		$this->site = $site;
		$this->type = $type;
		$this->meta = [];
	}

	public function getData() {
		global $wp;

		$this->meta = [
			'title' => $this->getTitle(),
			'description' => $this->getDescription(),
			'image' => $this->getImage(),
			'url' => home_url(add_query_arg(array(),$wp->request)) . "/"
		];

		return $this->meta;
	}

	private function getTitle() {
		global $wp_query;

		if ($wp_query->is_front_page()) {
			return $this->site->title;
		} else if ($wp_query->is_404()) {
			return "Page Not Found | " . $this->site->title;
		} else {
			return $this->post->post_title . " | " . $this->site->title;
		}
	}

	private function getDescription() {
		if ($this->post->meta_description && strlen(trim($this->post->meta_description))) {
			return $this->post->meta_description;
		} else {
			return $this->site->description;
		}
	}

	private function getImage() {
		// if (!empty($this->post->get_field('banner'))) {
		// 	$banner = $this->post->get_field('banner')[0];
		// 	$bannerImg = new TimberImage($banner['bannerImage']['ID']);

		// 	if ($bannerImg->src('opengraph')) {
		// 		return $bannerImg->src('opengraph');
		// 	} else {
		// 		return $bannerImg->guid;
		// 	}
		// } else if ($image = $this->post->get_thumbnail()) {
		// 	return $image->src('opengraph');
		// } else {
		// 	return get_template_directory_uri().'/img/opengraph.jpg';
		// }

		return get_template_directory_uri().'/img/opengraph.jpg';
	}
}

?>
