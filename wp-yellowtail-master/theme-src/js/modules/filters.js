import GridResize from './utils/gridResize';

class Filters {

	constructor() {
		this.filters = {};
		this.$filter = $('.filters .filter');
		this.$items = $('.filter-grid .tile');
		this.$selected = this.$filter.find('.selected');
		this.$clear = this.$filter.find('.clear');
		this.$filterOption = $('.filter-options li a');

		// Setup responsive
		$(window).resize(() => GridResize.checkResize(this.$items));

		// Init country filter
		this.countryFilter();

		// Init enjoys filter
		this.enjoysFilter();

		// Build filters object
		this.$filter.each((i, elem) => {
			// TODO: Add polyfill for this
			this.filters[$(elem).data('filter')] = [];
		});

		// Show/hide the filter drop-down items
		this.$selected.on('click', (e) => {
			if ($(e.target).is('span') || $(e.target).hasClass('toggle')) {
				e.target = $(e.target).parent('a');
			}

			const $tray = $(e.target).siblings('.tray');

			if ($tray.hasClass('-open')) {
				$tray.show().stop().animate({
					height: 0,
				}, ($tray.outerHeight() / 1.1), 'linear', () => {
					$tray.removeClass('-open').hide();
				});
			} else {
				let trayHeight = 0;

				$tray.show().children()
					.each((i, elem) => {
						trayHeight += $(elem).outerHeight();
					});

				$(e.target).parents('.filter').siblings().find('.tray.-open')
					.each(function () {
						$(this).stop().animate({
							height: 0,
						}, ($(this).outerHeight() / 1.1), 'linear', function () {
							$(this).removeClass('-open').hide();
						});
					});

				$tray.show().addClass('-open').stop().animate({
					height: trayHeight,
				}, (trayHeight / 1.1), 'linear');
			}

			return false;
		});

		// Enable 'clear all' for a dropdown menu
		this.$clear.on('click', (e) => {
			e.preventDefault();

			$(e.target).siblings('.filter-options').find('.-checked').removeClass('-checked');
			$(e.target).parents('.filter').find('span').text('Select');

			const filter = $(e.target).parents('.filter').data('filter');
			this.filters[filter] = [];
			this.run();

			return false;
		});

		// Make dropdown menu items clickable
		this.$filterOption.on('click', (e) => {
			const filter = $(e.target).parents('.filter').data('filter');
			const value = $(e.target).data('value');

			if ($(e.target).hasClass('-checked')) {
				this.remove(filter, value);
				$(e.target).removeClass('-checked');

				if ($(e.target).parents('.filter-options').find('.-checked').length === 0) {
					$(e.target).parents('.filter').find('span').text('Select');
				} else if ($(this).parents('.filter-options').find('.-checked').length === 1) {
					$(e.target).parents('.filter').find('span').text($(e.target).parents('.filter-options').find('.-checked').text());
				}

				// Check to see if any filters remain active
				if (!this.$filterOption.filter('.-checked').length) {
					this.filtered = false;
				}
			} else {
				this.add(filter, value);
				$(e.target).addClass('-checked');

				if ($(e.target).parents('.filter-options').find('.-checked').length > 1) {
					$(e.target).parents('.filter').find('span').text('Multiple');
				} else {
					$(e.target).parents('.filter').find('span').text($(e.target).text());
				}
			}

			// Apply filters
			this.run();

			return false;
		});

		// Hide dropdown menus when document is clicked
		$(document).on('click', (e) => {
			if (!$(e.target).closest(this.$selected).length && !$(e.target).closest('.tray').length) {
				this.$filter.find('.tray.-open').each((i, e) => {
					$(e).stop().animate({
						height: 0,
					}, ($(e).outerHeight() / 1.1), 'linear', (e) => {
						$(e).removeClass('-open');
					});
				});
			}
		});
	}

	countryFilter() {
		const countries = $('.filter-grid').data('countries').split('|');
		if (countries.length && $.cookieStorage) {
			const currentCountry = $.cookieStorage.get('ytAgegate.country');
			if (currentCountry && $.inArray(currentCountry, countries) > -1) {
				this.$items.each((i, elem) => {
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

	enjoysFilter() {
		this.enjoyList = [];

		$('.filter-grid .tile').each((i, elem) => {
			const $elem = $(elem);
			const enjoys = $elem.data('enjoys').split('|');

			$(enjoys).each((i, elem) => {
				if ($.inArray(elem, this.enjoyList) === -1) {
					this.enjoyList.push(elem);
				}
			});
		});

		const enjoys = $('.filters').find('[data-filter=enjoys]').find('.filter-options li');
		$(enjoys).each((i, elem) => {
			const target = $(elem).find('a');
			if ($.inArray($(target).data('value'), this.enjoyList) === -1) {
				$(elem).remove();
			}
		});
	}

	// Add a new filter to the stack
	add(filter, value) {
		this.filters[filter].push(value);
	}

	// Remove a filter from the stack
	remove(filter, value) {
		this.filters[filter] = $.grep(this.filters[filter], (v) => {
			return value !== v;
		});
	}

	run() {
		this.$items.each((i, elem) => {
			const $elem = $(elem);
			if (this.test($elem.data())) {
				$elem.removeClass('-hide');
			} else {
				$elem.addClass('-hide');
			}
		});

		GridResize.checkResize(this.$items);
	}

	test(current) {
		let matched = true;

		$.each(this.filters, (filter, _values) => {
			// Only test when there are values
			if (_values.length) {
				let currentValues = current[filter].split('|');
				if (!$.isArray(currentValues)) {
					currentValues = [currentValues];
				}

				const intersection = $.grep(currentValues, (i) => {
					return $.inArray(i, _values) > -1;
				});

				if (!intersection.length) {
					matched = false;
				}
			}
		});
		return matched;
	}
}

export default Filters;
