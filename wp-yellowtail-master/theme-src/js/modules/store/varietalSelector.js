export default class varietalSelector {
	constructor() {
		this.$selector = $('.varietal-selector');
		this.$selected = this.$selector.find('.selected');
		this.$tray = this.$selector.find('.tray');
		this.$clear = this.$tray.find('.clear');
		this.$option = this.$tray.find('.options li input');

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

		this.$clear.on('click', (e) => {
			e.preventDefault();

			this.$option.find(':checked').prop('checked', false);
			this.$selected.children('span').text('Select');
		});

		this.$option.on('change', () => {
			const checkedQty = this.$option.filter(':checked').length;

			if (checkedQty > 1) {
				this.$selected.children('span').text('Multiple');
			} else if (checkedQty === 1) {
				const checked = this.$option.filter(':checked').siblings('label').text();

				this.$selected.children('span').text(checked);
			} else {
				this.$selected.children('span').text('Select');
			}
		});
	}

	showTray() {
		this.$tray.show().addClass('-open').stop().animate({
			height: this.trayHeight,
		}, this.trayHeight, 'linear');
	}

	hideTray() {
		this.$tray.show().stop().animate({
			height: 0,
		}, this.trayHeight, 'linear', () => {
			this.$tray.removeClass('-open').hide();
		});
	}
}
