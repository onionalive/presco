export default class Nav {
	init() {
		this.$header = $('header');
		this.$nav = $('header nav');
		this.$navToggle = $('.nav-toggle');
		this.$navMenu = $('.mobile-nav');
		this.$countryToggle = $('.country-select');
		this.$countryMenu = $('.country-dropdown');

		// Build mobile nav
		this.$nav.eq(0).clone().appendTo('.mobile-nav');

		this.setEvents();
	}

	// Set click events for mobile nav and country selector
	setEvents() {
		$('.fa-bars').click(() => {
			$('.top-nav').addClass('-active');
		});

		this.$navToggle.on('click', (e) => {
			e.preventDefault();

			this.$navMenu.toggleClass('-active');
			this.$navToggle.toggleClass('-close');
		});

		$(document).on('click', this.$countryToggle.selector, (e) => {
			e.preventDefault();

			if (this.$countryMenu.hasClass('-active')) {
				this.$countryToggle.removeClass('-close');
				this.$countryMenu.removeClass('-active');
			} else {
				this.$countryToggle.addClass('-close');
				this.$countryMenu.addClass('-active');
			}
		});

		$(document).on('click', (e) => {
			// Closes country dropdown on desktop if clicked outside the dropdown
			if (!$(e.target).closest('.country-container').length && (e.target.className !== 'header-site-links' && !$(e.target).closest('.header-site-links').length)) {
				$('.country-dropdown').removeClass('-active');
			}

			// Closes country dropdown menu on mobile-only if clicked anywhere but one of the actual links
			if ((e.target.className !== 'country-dropdown-list' && !$(e.target).closest('.header-site-links').length) && (this.$countryMenu.hasClass('-active') && this.$navToggle.is(':visible'))) {
				$('.country-dropdown').removeClass('-active');
			}
		});
	}
}
