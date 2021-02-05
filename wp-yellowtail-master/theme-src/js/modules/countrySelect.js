import GridResize from './utils/gridResize';

class CountrySelect {
	constructor() {
		this.baseUrl = $('meta[name=base_url]').attr('content');
		this.tiles = $('.grid .tile');
		this.$filter = $('.grid-country-select .filter');
		this.$selected = this.$filter.find('.selected');
		this.$clear = this.$filter.find('.clear');
		this.$filterOption = $('.country-filter-options li a');
		this.setupDOM();
	}

	setupDOM() {
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

		// Make dropdown menu items clickable
		this.$filterOption.on('click', (e) => {
			const filter = $(e.target).parents('.filter').data('filter');
			const value = $(e.target).data('value');

			if ($(e.target).hasClass('-checked')) {
				this.remove(filter, value);
				$(e.target).removeClass('-checked');

				if ($(e.target).parents('.country-filter-options').find('.-checked').length === 0) {
					$(e.target).parents('.filter').find('span').text('Select');
				} else if ($(this).parents('.country-filter-options').find('.-checked').length === 1) {
					$(e.target).parents('.filter').find('span').text($(e.target).parents('.country-filter-options').find('.-checked').text());
				}

				// Check to see if any filters remain active
				if (!this.$filterOption.filter('.-checked').length) {
					this.filtered = false;
				}
			} else {
				this.$filterOption.removeClass('-checked');
				$(e.target).addClass('-checked');
				$(e.target).parents('.filter').find('span').text($(e.target).text());

				this.data = {
					country: value,
				};

				$.ajax({
					type: 'POST',
					url: `${this.baseUrl}/api/countryWines/`,
					data: this.data,
					success: (res) => {
						this.availableWines = JSON.parse(res);
						this.updateGrid();
					},
					error: (res) => {
						console.log('error');
						console.log(res);
					}
				});
			}
		});

		// Hide dropdown menus when document is clicked
		$(document).on('click', (e) => {
			if (!$(e.target).closest(this.$selected).length && !$(e.target).closest('.tray').length) {
				this.$filter.find('.tray.-open').each((i, e) => {
					$(e).stop().animate({
						height: 0,
					}, ($(e).outerHeight() / 1.1), 'linear', () => {
						$(e).removeClass('-open').hide();
					});
				});
			}
		});
	}

	// Remove a filter from the stack
	remove() {
		this.tiles.each((i, $elem) => {
			$($elem).removeClass('-country-hide');
		});
		GridResize.checkResize(this.tiles);
	}

	updateGrid() {
		this.tiles.each((i, $elem) => {
			if ({}.hasOwnProperty.call(this.availableWines, $($elem).data('id'))) {
				$($elem).removeClass('-country-hide');
			} else {
				$($elem).addClass('-country-hide');
			}
		});
		GridResize.checkResize(this.tiles);
	}
}

export default CountrySelect;
