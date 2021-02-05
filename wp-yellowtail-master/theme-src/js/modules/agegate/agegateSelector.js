class AgegateSelector {
	constructor(
		selector = '.agegate-selector',
		selectorOption = '.agegate-selector-options',
		submit = '.agegate form input[type=submit]',
		checkbox = '.confirmation-checkbox input'
	) {
		this.$selector = $(selector);
		this.$selectorOption = this.$selector.find(selectorOption);
		this.$submit = $(submit);
		this.$checkbox = $(checkbox);
	}

	init() {
		// Country Selector
		this.$selectorOption.on('change', (e) => {
			e.preventDefault();

			const country = this.$selectorOption.find('option:selected').attr('value');

			if (this.$checkbox.is(':checked') && (country !== 'default')) {
				this.$submit.prop('disabled', false);
			}

			// Sets width of country select based on country selected
			$('#option-width').html(this.$selectorOption.find('option:selected').text());
			let width = $('#select-width').width();
			let resize = width + 30;

			const isSafari = window.navigator.userAgent.indexOf('Safari') > -1;

			if (width > 220) {
				resize = width + 70;
				if (isSafari) {
					resize += 100;
					width += 100;
				}
			} else if (width > 180) {
				resize = width + 40;
				if (isSafari) {
					resize += 80;
					width += 80;
				}
			} else if (width > 100) {
				resize = width + 40;
				if (isSafari) {
					resize += 40;
					width += 40;
				}
			}

			this.$selectorOption.width(resize);
			$('.agegate-selector-options').width(width);
			$('.agegate-selector').width(resize);
		});


		// Checkbox
		this.$checkbox.on('change', () => {
			const country = this.$selectorOption.find('option:selected').attr('value');

			if (this.$checkbox.is(':checked') && (country !== 'default')) {
				this.$submit.prop('disabled', false);
			} else {
				// Not checked
				this.$submit.prop('disabled', true);
			}
		});

		// Welcome mat
		this.$submit.on('click', (e) => {
			e.preventDefault();
			const country = this.$selectorOption.find('option:selected').attr('value');

			if (this.$checkbox.is(':checked') && (country !== 'default')) {
				$.cookieStorage.set('ytAgegate', {
					ageGate: 'true',
					country
				});

				// If USA/JP redirect to correct site
				const redirects = ['us'];
				if (redirects.includes(country)) {
					this.redirectTo(country);
				}

				$('body').find('.agegate').remove();
				$('body').removeClass('no-scroll');
			}
		});
	}

	redirectTo(country) {
		let tld = 'https://www.yellowtailwine.com/'; // Default
		let path = '/'; // Default
		const exp = /(https:\/\/(\.*\w+\.*){3})/g;

		if (window.location.href.match(exp)) {
			tld = window.location.href.match(exp);
			path = window.location.href.replace(exp, '');
			path = path.replace(`/${country}`, '');
		}

		window.location.replace(`${tld}/${country}${path}`);
	}
}

export default AgegateSelector;
