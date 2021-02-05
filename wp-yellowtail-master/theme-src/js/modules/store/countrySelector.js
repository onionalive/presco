export default class CountrySelector {

	constructor() {
		this.$selector = $('.country-selector');
		this.$selected = this.$selector.find('.selected');
		this.$tray = this.$selector.find('.tray');
		this.$option = this.$tray.find('.options .option');
		this.$input = this.$selector.find('input');

		this.selectedFilters = [];
		this.trayHeight = 180;

		this.initDom();
	}

	initDom() {
		this.$selected.on('click', (e) => {
			e.preventDefault();

			if (this.$tray.hasClass('-open')) {
				this.hideTray();
			} else {
				this.showTray();
			}
		});

		$(document).on('click', (e) => {
			if (!$(e.target).closest(this.$selected).length && !$(e.target).closest('.tray').length) {
				this.hideTray();
			}
		});

		// Make dropdown menu items clickable
		this.$option.on('click', (e) => {
			e.preventDefault();

			const $e = $(e.currentTarget);
			const countryText = $e.text();

			this.$selected.children('span').text(countryText);
			this.$input.val(countryText);

			this.hideTray();
		});
	}

	showTray() {
		this.$tray.show().addClass('-open').stop().animate({
			height: this.trayHeight,
		}, this.trayHeight, 'linear');
	}

	hideTray() {
		this.$tray.stop().animate({
			height: 0,
		}, this.trayHeight, 'linear', () => {
			this.$tray.removeClass('-open').hide();
		});
	}
}
