<?php

class API {

	public static function getBanner($elem, $size) {
		$banner = $elem->get_field('banner')[0];
		$bannerImg = new TimberImage($banner['bannerImage']['ID']);
		return array(
			'image' => $bannerImg->src($size),
			'copy' => $banner['bannerCopy']
		);
	}

	public static function fetchHeader() {
		$responsibilities = Timber::get_posts([
			'post_type' => 'responsibilities'
		]);

		$responsibilityLinks = array_map(
			function($obj) { return array(
				'title' => $obj->post_title,
				'slug' => $obj->slug,
				'description' => $obj->get_field('description')
			); },
			$responsibilities
		);

		$brands = Timber::get_posts([
			'post_type' => 'brand'
		]);

		$brandLinks = array_map(
			function($obj) { return array(
				'title' => $obj->post_title,
				'slug' => $obj->slug,
				'description' => $obj->get_field('description')
			); },
			$brands
		);

		$leaderTypes = Timber::get_posts([
			'post_type' => 'leader_types'
		]);

		$leaderTypeLinks = array_map(
			function($obj) { return array(
				'title' => $obj->post_title,
				'slug' => $obj->slug,
				'description' => $obj->get_field('description')
			); },
			$leaderTypes
		);

		$careerTypes = Timber::get_posts([
			'post_type' => 'careers'
		]);

		$careerTypeLinks = array_map(
			function($obj) { return array(
				'title' => $obj->post_title,
				'slug' => $obj->slug,
			); },
			$careerTypes
		);

		return array(
			'responsibilities' => $responsibilityLinks,
			'brands' => $brandLinks,
			'leaderTypes' => $leaderTypeLinks,
			'careerTypes' => $careerTypeLinks
		);
	}

	public static function fetchBrand( $data ) {

		// Get Brand
		$brand = Timber::get_post([
			'post_type' => 'brand',
			'name' => $data['brand'],
		]);

		// Get Brand CEO
		$leader = Timber::get_post($brand->custom['leader']);

		$leaderImg = new TimberImage($leader->image);

		$leaderArray = array(
			'name' => $leader->post_title,
			'position' => $leader->position,
			'company' => $leader->company,
			'description' => $leader->description,
			'slug' => $leader->slug,
			'type' => $leader->custom['type'],
			'image' => $leaderImg->src('leader_350'),
		);

		// Get Brand Details
		$banner = self::getBanner($brand, 'large');

		$carouselImages = [];
		$imgs = $brand->get_field('images');

		foreach( $imgs as $carouselImg) {
			$timberImg = new TimberImage($carouselImg['image']['ID']);
			array_push($carouselImages, array(
				'image' => array(
					'url' => $timberImg->src('large')
				),
				'title' => $carouselImg['image']['title']
			));
		}

		// Get Resources
		$links = array_map(
			function($obj) { return $obj; },
			$brand->get_field('external_link')
		);

		$logoId = $brand->custom['logo'];

		$timberImg = new TimberImage($logoId);

		return array(
			'logo' => $timberImg->src('large'),
			'title' => $brand->post_title,
			'content' => wpautop($brand->post_content),
			'banner' =>$banner,
			'leader' => $leaderArray,
			'carouselImages' => $carouselImages,
			'links' => $links
		);
	}

	public static function fetchLeadersPage( $data ) {

		// Get Leaders Page
		$page = Timber::get_post([
			'post_type' => 'page',
			'name' => 'our-leaders',
		]);

		// Get Brand Details
		$banner = self::getBanner($page, 'large');

		// Get People
		$leaders = Timber::get_posts([
			'post_type' => 'leaders',
			'numberposts' => -1,
		]);

		$executives = [];
		$board = [];

		foreach($leaders as $leader) {

			$leaderImg = new TimberImage($leader->image);

			foreach ($leader->get_field('type') as &$typeObj) {
					if ($typeObj->post_name == 'board') {
						array_push($board, array(
							'slug' => $leader->slug,
							'name' => $leader->post_title,
							'position' => $leader->position,
							'company' => $leader->company,
							'description' => $leader->description,
							'type' => $typeObj->post_type,
							'image' => $leaderImg->src('leader-medium'),
						));
					}

					if ($typeObj->post_name == 'executives') {

						array_push($executives, array(
							'slug' => $leader->slug,
							'name' => $leader->post_title,
							'position' => $leader->position,
							'company' => $leader->company,
							'description' => $leader->description,
							'type' =>  $typeObj->post_type,
							'image' => $leaderImg->src('leader-medium'),
						));
					}
			}
		}

		// Get Images
		$images = $page->get_field('forumImages');

		$imagesList = [];

		foreach( $images as $image) {
			$timberImg = new TimberImage($image['image']['ID']);

			array_push($imagesList, array(
				'image' => array(
					'url' => $timberImg->src('large')
				),
				'caption' => $image['caption']
			));
		}

		$data = [];

		return array(
			'title' => $page->post_title,
			'banner' => $banner,
			'board' => $board,
			'description' => $banner,
			'executives' => $executives,
			'forumTitle' => $page->get_field('forumTitle'),
			'forumParagraph' => $page->get_field('forumParagraph'),
			'forumImages' => $imagesList,
		);
	}

	public static function fetchLeaderPage( $data ) {

		// Get leader
		$leaderRaw = Timber::get_post([
			'post_type' => 'leaders',
			'name' => $data['leader']
		]);

		$leaderImg = new TimberImage($leaderRaw->image);

		$types = $leaderRaw->get_field('type');

		if (count($types) > 1) {
			$leaderType = 'board';
		} else {
			$leaderType = $types[0]->post_name;
		}

		$ourLeader = [
			'title' => property_exists($leaderRaw, 'post_title') ? $leaderRaw->post_title : '',
			'description' => property_exists($leaderRaw, 'description') ? $leaderRaw->description : '',
			'position' => property_exists($leaderRaw, 'position') ? $leaderRaw->position : '',
			'company' => property_exists($leaderRaw, 'company') ? $leaderRaw->company : '',
			'image' => $leaderImg->src('leader-medium'),
			'linkedin' => property_exists($leaderRaw, 'linkedin') ? $leaderRaw->linkedin : '',
			'type' => $leaderType,
		];

		// Get People
		$leaders = Timber::get_posts([
			'post_type' => 'leaders',
			'numberposts' => -1,
		]);

		$executives = [];
		$board = [];

		foreach($leaders as $leader) {

			$leaderImg = new TimberImage($leader->image);

			foreach ($leader->get_field('type') as &$typeObj) {
					if ($typeObj->post_name == 'board') {
						array_push($board, array(
							'slug' => $leader->slug,
							'name' => $leader->post_title,
							'position' => $leader->position,
							'company' => $leader->company,
							'description' => $leader->description,
							'type' => $typeObj->post_type,
							'image' => $leaderImg->src('leader-medium'),
						));
					}

					if ($typeObj->post_name == 'executives') {

						array_push($executives, array(
							'slug' => $leader->slug,
							'name' => $leader->post_title,
							'position' => $leader->position,
							'company' => $leader->company,
							'description' => $leader->description,
							'type' =>  $typeObj->post_type,
							'image' => $leaderImg->src('leader-medium'),
						));
					}
			}
		}

		return array(
			'board' => $board,
			'executives' => $executives,
			'leader' => $ourLeader
		);
	}

	public static function fetchHome() {

		// Get Brand
		$home = Timber::get_post([
			'post_type' => 'page',
			'name' => 'home',
		]);

		// Get Brand Details
		$banners = $home->get_field('banner');
		$bannerLength = count($banners);

		$rand = rand(0, $bannerLength - 1);
		$banner = $home->get_field('banner')[$rand];

		$bannerImg = new TimberImage($banner['bannerImage']['ID']);
		$bannerArray = array(
			'image' => $bannerImg->src('large'),
			'copy' => $banner['bannerCopy']
		);

		// Get IntroMod
		$intro = array(
			'headingQuote' => $home->get_field('introHeadingQuote'),
			'cite' => $home->get_field('introCite'),
			'copy' => $home->get_field('introCopy'),
		);

		// Content Tiles
		$tiles = $home->get_field('content_tile');

		// Get Poeple
		$leaders = Timber::get_posts([
			'post_type' => 'leaders',
			'numberposts' => -1,
		]);
		$people = [];

		foreach($leaders as $leader) {
			$leaderImg = new TimberImage($leader->image);

			array_push($people, array(
				'slug' => $leader->slug,
				'name' => $leader->post_title,
				'position' => $leader->position,
				'company' => $leader->company,
				'description' => $leader->description,
				'type' => $leader->custom['type'],
				'image' => $leaderImg->src('thumbnail'),
			));
		}

		// Forum
		$forum = array(
			'title' => $home->get_field('forumTitle'),
			'paragraph' => $home->get_field('forumParagraph'),
			'images' => $home->get_field('forumImages'),
		);

		// Get Brand

		$brand = array(
			'heading' => $home->get_field('brandsHeading'),
			'copy' => $home->get_field('brandsCopy'),
			'brands' => $home->get_field('brandTile')
		);

		// Image Caoursel
		$carouselImages = [];
		$imgs = $home->get_field('images');

		foreach( $imgs as $carouselImg) {
			$timberImg = new TimberImage($carouselImg['image']['ID']);
			array_push($carouselImages, array(
				'image' => array(
					'url' => $timberImg->src('large')
				),
				'title' => $carouselImg['image']['title']
			));
		}

		$downloads = $home->get_field('download_items');

		$data = [];

		return array(
			'banner' => 	$bannerArray,
			'intro' => $intro,
			'contentTiles' => $tiles,
			'people' => $people,
			'forum' => $forum,
			'brand' => $brand,
			'images' => $carouselImages,
			'downloads' => $downloads
		);
	}

	public static function fetchBrands() {

		// Get Responsibilites page
		$brand = Timber::get_post([
			'post_type' => 'page',
			'name' => 'brand',
		]);

		// Get Brand Details
		$banner = self::getBanner($brand, 'large');

		// Get IntroMod
		$intro = array(
			'headingQuote' => $brand->get_field('introHeadingQuote'),
			'cite' => $brand->get_field('introCite'),
			'copy' => $brand->get_field('introCopy'),
		);

		// Get Pages
		$pagesSource = Timber::get_posts([
			'post_type' => 'brand',
		]);

		$pages = array_map(
			function($obj) {
				return array(
					'copy' => $obj->post_title,
					'link' => $obj->slug,
					'image' => ($obj->get_field('banner') ? self::getBanner($obj, 'large')['image'] : ''),
					'size' => 'half'
				);
			},
			$pagesSource
		);

		return array(
			'banner' => $banner,
			'intro' => $intro,
			'pages' => $pages
		);
	}

	public static function fetchResponsibilities() {

		// Get Responsibilites page
		$responsibilities = Timber::get_post([
			'post_type' => 'page',
			'name' => 'responsibilities',
		]);

		// Get Responsibilites Details
		$banner = self::getBanner($responsibilities, 'large');

		// Get IntroMod
		$intro = array(
			'headingQuote' => $responsibilities->get_field('introHeadingQuote'),
			'cite' => $responsibilities->get_field('introCite'),
			'copy' => $responsibilities->get_field('introCopy'),
		);

		// Get Pages
		$pagesSource = Timber::get_posts([
			'post_type' => 'responsibilities',
		]);

		$pages = array_map(
			function($obj) {
				return array(
					'copy' => $obj->post_title,
					'link' => $obj->slug,
					'image' => ($obj->get_field('banner') ? self::getBanner($obj, 'large')['image'] : ''),
					'size' => 'half'
				);
			},
			$pagesSource
		);

		return array(
			'banner' => $banner,
			'intro' => $intro,
			'pages' => $pages
		);
	}

	public static function fetchCareers($data) {

		// Get Careers page
		$careers = Timber::get_post([
			'post_type' => 'page',
			'name' => 'careers',
		]);

		// Get Brand Details
		$banner = self::getBanner($careers, 'large');

		// Get IntroMod
		$intro = array(
			'headingQuote' => $careers->get_field('introHeadingQuote'),
			'cite' => $careers->get_field('introCite'),
			'copy' => $careers->get_field('introCopy'),
		);

		// Get rows
		$rows = $careers->get_field('rows');

		// Get Pages
		$pagesSource = Timber::get_posts([
			'post_type' => 'careers',
		]);

		$pages = array_map(
			function($obj) {
				return array(
					'copy' => $obj->post_title,
					'link' => $obj->slug,
					'image' => ($obj->get_field('banner') ? self::getBanner($obj, 'jobs_thumb')['image'] : ''),
					'size' => 'half'
				);
			},
			$pagesSource
		);

		return array(
			'banner' => $banner,
			'intro' => $intro,
			'rows' => $rows,
			'pages' => $pages
		);
	}

	public static function fetchCareer($data) {

		// Get Responsibilites page
		$careers = Timber::get_post([
			'post_type' => 'careers',
			'name' => $data['category'],
		]);

		$title = $careers->post_title;

		// Get Brand Details
		$banner = self::getBanner($careers, 'large');

		// Get IntroMod
		$intro = array(
			'headingQuote' => $careers->get_field('introHeadingQuote'),
			'cite' => $careers->get_field('introCite'),
			'copy' => $careers->get_field('introCopy'),
		);

		$jobAdderID = $careers->get_field('job_adder_id');

		return array(
			'title' => $title,
			'banner' => $banner,
			'intro' => $intro,
			'jobAdderID' => $jobAdderID,
		);
	}
}

add_action('rest_api_init', function () {
	register_rest_route('v2/custom', '/header', array(
		'methods' => 'GET',
		'callback' => array('API','fetchHeader'),
	));
});

add_action('rest_api_init', function () {
	register_rest_route('v2/custom', '/home', array(
		'methods' => 'GET',
		'callback' => array('API','fetchHome'),
	));
});

add_action('rest_api_init', function () {
	register_rest_route( 'v2/custom', '/responsibilities', array(
		'methods' => 'GET',
		'callback' => array('API','fetchResponsibilities'),
	));
});

add_action('rest_api_init', function () {
	register_rest_route( 'v2/custom', '/careers/', array(
		'methods' => 'GET',
		'callback' => array('API','fetchCareers'),
	));
});

add_action('rest_api_init', function () {
	register_rest_route( 'v2/custom', '/career/(?P<category>[a-zA-Z0-9-]+)', array(
		'methods' => 'GET',
		'callback' => array('API','fetchCareer'),
	));
});

add_action('rest_api_init', function () {
	register_rest_route( 'v2/custom', '/brands', array(
		'methods' => 'GET',
		'callback' => array('API','fetchBrands'),
	));
});

add_action('rest_api_init', function () {
	register_rest_route( 'v2/brand', '/(?P<brand>[a-zA-Z0-9-]+)', array(
		'methods' => 'GET',
		'callback' => array('API','fetchBrand'),
	));
});

add_action('rest_api_init', function () {
	register_rest_route('v2/leaders', '/page', array(
		'methods' => 'GET',
		'callback' => array('API','fetchLeadersPage'),
	));
});

add_action('rest_api_init', function () {
	register_rest_route( 'v2/leader', '/(?P<leader>[a-zA-Z0-9-]+)', array(
		'methods' => 'GET',
		'callback' => array('API','fetchLeaderPage'),
	));
});
