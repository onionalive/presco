import Constants from '../constants';

class GridResize {
	static checkResize($items) {
		this.$visibleItems = $items.filter((i, elem) => {
			return (!$(elem).hasClass('-hide') && !$(elem).hasClass('-country-hide'));
		});

		this.$visibleItems
			.each((i, elem) => {
				if ($(window).width() < Constants.mobile) {
					$(elem).css({
						'margin-right': 0,
					});
				} else if ($(window).width() < Constants.tabletL) {
					if (i !== 0 && (i + 1) % 2 === 0) {
						$(elem).css({
							'margin-right': 0,
						});
					}	else if ((i + 1) % 2 !== 0) {
						$(elem).css({
							'margin-right': Constants.paddingRight,
						});
					}
				} else if (i !== 0 && (i + 1) % 3 === 0) {
					$(elem).css({
						'margin-right': 0,
					});
				}	else if ((i + 1) % 3 !== 0) {
					$(elem).css({
						'margin-right': Constants.paddingRight,
					});
				}
			});
	}
}

export default GridResize;
