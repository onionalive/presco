/*eslint-env browser*/

import $ from 'jquery';
import imagesLoaded from 'imagesloaded';

class Nav {
	init() {
		// Movile nav
		$('.mobile-indicator, .contact-mob-link').click(() => {
			$('.mobile-nav').toggleClass('-active');
			$('.nav-logo').toggleClass('mobile-active');
			$('.mobile-indicator').toggleClass('mobile-active');
			$('.mobile-indicator').toggleClass('-close');
			$('html, body').toggleClass('overflow-hidden');

		});

		// Add .current to current page
		if (window.location.pathname === "/") {
			$(".index-page").addClass("-current");
			$(".hero-image").addClass("homepage-header");
		} else if (window.location.pathname.indexOf('/articles/') === 0) {
			$('.hero-image').addClass("article-header");
		} else {
			$(`nav a[href^="${window.location.pathname}"]`).addClass("-current");
			$('.header-title').addClass("-push");
		}

		this.smoothScroll();
		this.fadeInTitle();
	}

	// Smoothscroll
	smoothScroll() {
		$(document).ready(function ($) {
			$('.smooth-scroll').click(function () {
				$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
			});
		});
	}

	// Fade In Title
	fadeInTitle() {
		var imgLoad = imagesLoaded($('.hero-image')[0],{
			background: true
		});
		
		imgLoad.on('always',function() {
			$('.header-title').fadeIn(2500);
		}).on('fail', function() {
			$('.hero-image').css('background-color','black');
		});
	}
}

export default Nav;
