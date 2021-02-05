import layout from './modules/layout';
<% if (slick) { %>import 'slick-carousel';<% } %>
<% if (jquery) { %>import $ from 'jquery';<% } %>
<% if (scrollReveal) { %>import scrollReveal from 'scrollReveal';<% } %>

<% if (jquery) { %>
$(document).ready(function () {
  window.ie8 = $('html').hasClass('lt-ie9');

  const test = new layout();
  test.init();

	<% if (slick) { %>
	// Slick carousel
	$(".slider").slick({});
	<% } %>
});

<% } else { %>
function fn(){
	const test = new layout();
  test.init();
}
// Native
// Check if the DOMContentLoaded has already been completed
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  fn();
} else {
  document.addEventListener('DOMContentLoaded', fn);
}
<% } %>

<% if (scrollReveal) { %>
window.sr = ScrollReveal();
sr.reveal('.container');
<% } %>
