import GoogleMapsLoader from 'google-maps';
import { styles } from '../mapStyle';
import Search from '../utils/search';
import { getParameterByName } from '../utils/params';

class Stores {
	constructor(
		tiles = $('tiles'),
		contact = $('.contact-form'),
		requestCounter = 0,
		viewMore = $('.view-more'),
		searchReq = ''
	) {
		this.url = 'https://www.google.com/maps/dir/Current+Location/';
		this.$tiles = tiles;
		this.$form = contact;
		this.requestCounter = requestCounter;
		this.viewMore = viewMore;
		this.searchReq = searchReq;
		this.input = $('.search-container').find(':input');
		this.googleMapsApiKey = $('meta[name=google_maps_api]').attr('content');
		this.staticStyles = this.formatStaticStyles();
		this.$results = $('.results');
		this.$instructions = $('.instructions');
		this.grapposCountries = ['US', 'AU'];
		this.city = '';
		this.predictions = '';
		this.$search = $('.search-container').find('.search-form');

		this.textUpdate = null;

		this.textArray = [
			"Please wait, we're finding you some seriously good wine.",
			"Please wait, we're finding you some seriously good wine..",
			"Please wait, we're finding you some seriously good wine..."
		];

		this.loadMoreArray = [
			'Loading.',
			'Loading..',
			'Loading...'
		];

		$.validate({
			form: '#stores',
			modules: 'html5',
		});

		this.initAutocomplete();
		this.DOMSetup();

		if (window.location.href.indexOf('?q=') > -1) {
			const $query = getParameterByName('q', window.location.href);
			this.input.val($query.replace(/\b\w/g, l => l.toUpperCase()));
			this.fetchLocation($query);
			this.loadingIcon();
		}
	}

	initAutocomplete() {
		const input = document.getElementById('locationName');
		const options = { types: ['geocode'], componentRestrictions: { country: 'AU' }, strictBounds: true };
		GoogleMapsLoader.load((google) => {
			this.autocomplete = new google.maps.places.Autocomplete(input, options);
		});
	}

	DOMSetup() {
		this.$input = $('.search-container').find(':input');
		this.preventDefaultKeypress();
		this.searchOnSubmit();
		this.googleMapsLoader();
		this.viewMoreHandler();
	}

	preventDefaultKeypress() {
		this.$search.keypress((e) => {
			if (e.keyCode === 13) {
				e.preventDefault();
			}
		});
	}

	searchOnSubmit() {
		this.$search.on('submit', (e) => {
			if (!$('.instructions').length) {
				$('.tiles').append(
					`<div class="instructions">
						Enter your location above to start your search...
					</div>`
				);
			}
			e.preventDefault();
			this.searchReset();
			this.searchReq = this.$input.val();
			this.getSuggestions();
			this.loadingIcon();
		});
	}

	googleMapsLoader() {
		GoogleMapsLoader.load((google) => {
			google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
				this.$search.submit();
			});
		});
	}

	getSuggestions() {
		const service = new google.maps.places.AutocompleteService();
		service.getPlacePredictions(
			{
				input: this.searchReq,
				types: ['geocode'],
				componentRestrictions: { country: 'AU' },
				strictBounds: true
			},
			this.setPredictions.bind(this)
		);
	}

	setPredictions(predictions) {
		if (predictions !== null) {
			this.predictions = predictions[0].description;
			this.$input.val(this.predictions);
		} else {
			this.predictions = this.$input.val();
		}
		this.fetchLocation(this.predictions);
	}

	fetchLocation(location) {
		let geocoder;

		GoogleMapsLoader.load((google) => {
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({ address: location }, (results, status) => {
				if (status === 'OK') {
					let country;
					let countryLong;
					this.city = 'you';
					for (let i = 0; i < results[0].address_components.length; i++) {
						if (results[0].address_components[i].types[0] === 'country') {
							country = results[0].address_components[i].short_name;
							countryLong = results[0].address_components[i].long_name;
						}
						if (results[0].address_components[i].types[0] === 'locality') {
							this.city = results[0].address_components[i].long_name;
						}
					}
					if (!this.grapposCountries.includes(country)) {
						this.nullResult(countryLong);
					} else {
						const geo = {
							lat: results[0].geometry.location.lat(),
							lng: results[0].geometry.location.lng(),
						};
						this.fetchStores(geo);
					}
				} else {
					console.log('err');
					this.nullResult();
				}
			});
		});
	}

	viewMoreHandler() {
		this.viewMore.on('click', (e) => {
			e.preventDefault();

			if (this.predictions.length) {
				this.fetchLocation(this.predictions);
				this.loadingIcon($('.stores'), 'view-more');
			} else if (this.input.val().length) {
				this.fetchLocation(this.input.val());
				this.loadingIcon($('.stores'), 'view-more');
			}
		});
	}

	loadingIcon($el = $('.stores'), target = 'instructions') {
		$el.append('<div class="loading-container"></div>');
		if (target === 'instructions') {
			this.refreshLoadingIcon(0, $('.instructions'), this.textArray);
		} else if ($('body').find('.view-more-btn').length) {
			this.refreshLoadingIcon(0, $('.view-more-btn'), this.loadMoreArray);
		}
	}

	refreshLoadingIcon(counter, target, array) {
		let counterState = counter;
		target.html(array[counterState]);

		if (counterState === 2) {
			counterState = 0;
		} else {
			counterState++;
		}

		if ($('.loading-container').length) {
			this.textUpdate = window.setTimeout(
				() => this.refreshLoadingIcon(counterState, target, array), 200
			);
		}
	}

	endLoadingIcon($loading = $('.loading-container')) {
		$loading.remove();
		if ($('.view-more-btn').length) {
			$('.view-more-btn').html('View more');
		}

		window.clearTimeout(this.textUpdate);
		this.textUpdate = null;
	}

	searchReset(tiles = this.$tiles) {
		if (tiles.find('.tile').length) {
			tiles.find('.tile').each((index, $el) => {
				$($el).remove();
			});
			this.requestCounter = 0;
		}

		this.$form.css('display', 'none');
		this.$instructions.css('display', 'block');
		this.$results.css('display', 'block');
		this.viewMore.css('display', 'none');
	}

	fetchStores(geo, counter = this.requestCounter) {
		Search.australianStores(geo, counter)
		.then(res => this.ajaxReturn(res))
		.catch(reason => this.outputError(reason));
	}

	/*eslint-disable*/
	formatStaticStyles() {
		var result = [];
		styles.forEach(function(v) {
			var style = '';
			if (v.stylers.length > 0) { // Needs to have a style rule to be valid.
				style += (v.hasOwnProperty('featureType') ? 'feature:' + v.featureType : 'feature:all') + '|';
				style += (v.hasOwnProperty('elementType') ? 'element:' + v.elementType : 'element:all') + '|';
				v.stylers.forEach(function(val) {
					var propertyname = Object.keys(val)[0];
					var propertyval = val[propertyname].toString().replace('#', '0x');
					style += propertyname + ':' + propertyval + '|';
				});
			}
			result.push('style='+encodeURIComponent(style));
		});

		return result.join('&');
	}
	/*eslint-enable*/

	ajaxReturn(res) {
		res = JSON.parse(res);

		if (res.length < 1) {
			this.nullResult();
		} else {
			this.$form.css('display', 'none');
			this.$instructions.css('display', 'none');
			this.$results.css('display', 'block');
			this.requestCounter += 1;

			this.$tiles = $('.tiles');

			for (const elem of res) {
				const $tile = this.setupTile(elem);
				this.$tiles.append($tile);
				this.addStaticMap($tile, elem);
				$('.tiles .tile').fadeTo(1000, 1);
			}

			if (res.length >= 10 && !this.viewMore.is(':visible')) {
				this.viewMore.fadeIn();
			}

			this.endLoadingIcon();
		}
	}

	nullResult(countryLong = null) {
		if ($('.tile').length) {
			this.viewMore.fadeOut();
		} else {
			this.$results.fadeOut()
				.promise().done(() => {
					this.$form.fadeIn();
					if (countryLong !== null) {
						if (countryLong.length) {
							this.$form.find('.country-filter .input .dropdown .type-selected span').text(countryLong);
						}
					}
				});
			if (this.$form.find('.form-container h3').length) {
				this.$form.find('.form-container h3').remove();
			}
			this.$form.find('.form-container').append(
				$('<h3/>').text(`Sorry, no results near ${this.city} were found!`)
			);
			this.endLoadingIcon();
		}
	}

	addStaticMap($tile, elem) {
		const coords = `${elem.lat}, ${elem.lng}`;
		const $map = $tile.find('.map');

		// Calculate dimensions for map image based on current placeholder size
		const mapWidth = $map.width();
		const mapRatio = $map.height() / mapWidth;
		const newWidth = mapWidth < 600 ? mapWidth : 600;
		const newHeight = Math.floor(mapRatio * newWidth);
		const size = `${newWidth}x ${newHeight}x`;

		const param = {
			size,
			scale: 2,
			center: coords,
			markers: `color:yellow|${coords}`,
			zoom: 15,
			key: this.googleMapsApiKey
		};

		const src = `https://maps.googleapis.com/maps/api/staticmap?${$.param(param)}&${this.staticStyles}`;

		const $img = $('<img/>').attr({
			src,
			alt: '',
			class: 'map'
		});

		$tile.find('.map').append($img);
		$('.results h3').fadeIn();
	}

	setupTile(elem) {
		const tile = `
			<div class='tile'>
				<a class='map' href='${this.url}${elem.lat},${elem.lng}' target='_blank'></a>
				<div class='text'>
					<div class='inner'>
						<h4>
							${elem.name}
						</h4>
						<div class='address'>
							${elem.address}
						</div>
						<div class='distance'>
							${elem.distance} KMs away
						</div>
						<a href='${this.url}${elem.lat},${elem.lng}' target='_blank'>
							Get directions
						</a>
					</div>
				</div>
			</div>`;

		return $(tile);
	}

	outputError(err) {
		this.endLoadingIcon();
		console.log(JSON.stringify(err));
	}
}

export default Stores;
