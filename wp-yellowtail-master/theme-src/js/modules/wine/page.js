import GoogleMapsLoader from 'google-maps';
import Color from 'color';
import Slider from './Slider';

class WinePage {

	constructor() {
		this.baseUrl = $('meta[name=base_url]').attr('content');
		this.slider = new Slider();
		this.initAutocomplete();
		this.setupDOM();
		this.setBackground();
		this.countryFilter();
	}

	setupDOM() {
		const $form = $('.store-form');
		GoogleMapsLoader.load((google) => {
			google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
				$form.submit();
			});
		});
	}

	initAutocomplete() {
		const input = document.getElementById('locationName');
		const options = { types: ['geocode'] };
		GoogleMapsLoader.load((google) => {
			this.autocomplete = new google.maps.places.Autocomplete(input, options);
		});
	}

	setBackground() {
		let backgroundColor = $('.feature').css('background-color');
		backgroundColor = Color(backgroundColor);

		let backgroundColorLighter = backgroundColor.lighten(0.1);
		let backgroundColorDarker = backgroundColor.darken(0.05);
		backgroundColorLighter = backgroundColorLighter.hex();
		backgroundColorDarker = backgroundColorDarker.hex();
		backgroundColor = backgroundColor.hex();

		$('.feature').parent().css('background', backgroundColor);
		$('.feature').css('background', `radial-gradient(ellipse at 50% 50%, ${backgroundColorLighter} 10%, ${backgroundColorDarker} 50%, ${backgroundColor} 100%)`);
	}

	countryFilter() {
		const $items = $('.swiper-wrapper .swiper-slide');
		const countries = $('.swiper-wrapper').data('countries').split('|');
		if (countries.length && $.cookieStorage) {
			const currentCountry = $.cookieStorage.get('ytAgegate.country');
			if (currentCountry && $.inArray(currentCountry, countries) > -1) {
				$items.each((i, elem) => {
					const $elem = $(elem);
					const valid = $elem.data('countries').split('|');

					let matched = false;

					for (let i = 0; i < valid.length; i++) {
						if (currentCountry === valid[i]) {
							matched = true;
							break;
						}
					}

					if (!matched) {
						$elem.remove();
					}
				});
			}
		}
	}
}

export default WinePage;
