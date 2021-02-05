/* globals WebFont */
/* jshint unused:false */

// import-files
import 'babel-polyfill';
import GoogleMapsLoader from 'google-maps';
import Agegate from './modules/agegate/agegate';
import Stores from './modules/store/storeMap';
import CountrySelector from './modules/store/countrySelector';
import VarietalSelector from './modules/store/varietalSelector';
import Faqs from './modules/faqs';
import Home from './modules/home';
import Form from './modules/form';
import ScrollAnim from './modules/scrollAnim';
import Nav from './modules/nav';
import BigText from './modules/bigText';
import WinePage from './modules/wine/page';
// import RooPhotos from './modules/rooPhotos';
import FrontPageAnimation from './modules/frontPageAnimation';
import Filters from './modules/filters';
import Animation from './modules/animation';
import Accessibility from './modules/utils/accessibility';
import BigGame from './modules/big-game';
import OurStory from './modules/ourStory';

GoogleMapsLoader.KEY = $('meta[name=google_maps_api]').attr('content');
GoogleMapsLoader.LIBRARIES = ['places'];

$(document).ready(() => {
	window.ie8 = $('html').hasClass('lt-ie9');

	$('img').unveil();

	const nav = new Nav();
	nav.init();

	Accessibility();

	const animation = new Animation();
	animation.init();

	const agegate = new Agegate();

	if ($('.stores, .contact').length) {
		const varietalSelector = new VarietalSelector();
		const countrySelector = new CountrySelector();
	}

	if ($('.contact form, .stores form').length) {
		const form = new Form();
	}

	if ($('.faqs').length) {
		const faqs = new Faqs();
	}

	if ($('.stores .search-container').length) {
		const stores = new Stores();
	}

	if ($('.animation.-scroll').length) {
		const scrollAnim = new ScrollAnim();
		scrollAnim.init($('.animation.-scroll'));
	}

	if ($('.single-wine').length) {
		const wine = new WinePage();
	}

	if ($('.page-template-page-home').length) {
		// const rooPhotos = new RooPhotos();
		// rooPhotos.init();
		const frontPageAnimation = new FrontPageAnimation();
		frontPageAnimation.init();

		const home = new Home();
	}

	if ($('.filter-grid').length) {
		const filters = new Filters();
	}

	if (
		$('.page-template-page-big-game').length ||
		$('.page-template-page-big-game-2018').length
	) {
		const bigGame = new BigGame();
		bigGame.init();
	}

	if ($('.our-story').length) {
		const ourStory = new OurStory();
		ourStory.init();
	}

	// Webfont Loader
	WebFont.load({
		custom: {
			families: ['brauerneue-black'],
		},

		active: () => {
			if ($('.bigtext').length) {
				const bigText = new BigText();
				bigText.init();
			}
		}
	});
});
