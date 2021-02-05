import layout from './modules/layout';
import Display from './modules/display-ideas';
import Cookie from './modules/cookie';

import $ from 'jquery';



$(document).ready(function () {
	window.$ = $;
  window.ie8 = $('html').hasClass('lt-ie9');

  const test = new layout();
	const display = new Display();
	const cookie = new Cookie();
  test.init();
	display.init();
	cookie.init();


});
