<?php

class Mail {

	public static function send() {
		$message = '';
		$subject = 'A form has been submitted';
		$email = 'info@yellowtailwine.com';

		// Set subject line based on which contact form has been submitted
		if (!empty($_POST['page'])) {
			if ($_POST['page'] == 'contact') {
				$subject = 'A contact form has been submitted';
			} else if ($_POST['page'] == 'stores') {
				$subject = 'A Where To Buy form has been submitted';
			}
		}

		// Set name
		if (!empty($_POST['name'])) {
			$message .= "\n\r Name: " . $_POST['name'];
		}

		// Set email
		if (!empty($_POST['email'])) {
			$message .= "\n\r Email: " . $_POST['email'];
		}

		// Set country
		if (!empty($_POST['country'])) {
			$email = self::getDistributor($_POST['country']);

			$message .= "\n\r Country: " . $_POST['country'];
		}

		// Set zip/postal code
		if (!empty($_POST['zip'])) {
			$message .= "\n\r Zip/Postal Code: " . $_POST['zip'];
		}

		// Set varietals
		if (!empty($_POST['varietals'])) {
			$varietals = implode(', ', $_POST['varietals']);

			$message .= "\n\r Varietals: " . $varietals;
		}

		// Set Lot Number  message
		if (!empty($_POST['lot'])) {
			$message .= "\n\r Lot Number: " . $_POST['lot'];
		}

		// Set user message
		if (!empty($_POST['message'])) {
			$message .= "\n\r Message: " . $_POST['message'];
		}

		// Get site URL
		$site = new TimberSite();
		$url = $site->url;

		if (self::isStaging($url)) {
			$email = 'developers@presentcompany.co';
		}

		$headers = [];
		$headers[] = 'BCC: ben@presentcompany.co,developers+yellowtail@presentcompany.co';

		$mail = false;
		$mail = wp_mail(
			$email,
			$subject,
			$message,
			$headers
		);

		if ($mail) {
			return true;
		} else {
			header('HTTP/1.1 400 Bad Request');
			die(json_encode(array('message' => 'ERROR', 'code' => $mail)));
		}
	}

	public static function isStaging($str) {
		$prodUrl = 'yellowtailwine.com';

		if (strpos($str, $prodUrl) !== false) {
			return false;
		}

		return true;
	}

	public static function getDistributor($country) {
		$emailQuery = Timber::get_posts([
			'post_type' => 'country',
			'posts_per_page' => 1,
			's' => $country
		]);

		if (count($emailQuery) === 0) {
			return 'info@yellowtailwine.com';
		}

		$emailList = [];

		if(get_field('email', $emailQuery[0]->ID)) {
			while( the_repeater_field('email', $emailQuery[0]->ID) ) {
				array_push($emailList,get_sub_field('email_address'));
			}
		}
		return implode(', ', $emailList);
	}
}
