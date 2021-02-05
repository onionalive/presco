export default class AgegateCountrySelect {

	constructor() {
		this.$countryToggle = $('.agegate-country-toggle');
		this.$countryDropdown = $('.agegate-country-dropdown');
	}

	init() {
		this.$countryToggle.on('click', (e) => {
			e.preventDefault();

			if (this.$countryDropdown.hasClass('-active')) {
				this.$countryToggle.removeClass('-close');
				this.$countryDropdown.removeClass('-active');
			} else {
				this.$countryToggle.addClass('-close');
				this.$countryDropdown.addClass('-active');
			}
		});
	}
}
