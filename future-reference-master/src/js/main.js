/*eslint-env browser*/

import layout from './modules/layout';
import Nav from './modules/nav';
import Sliders from './modules/sliders';
import 'slick-carousel';
import $ from 'jquery';

$(document).ready(function () {
	window.$ = $;
	window.ie8 = $('html').hasClass('lt-ie9');

	const test = new layout();
	test.init();

	const nav = new Nav();
	nav.init();

	const slider = new Sliders();
	slider.init();

});
