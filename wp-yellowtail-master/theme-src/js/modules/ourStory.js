const debounce = require('lodash.debounce');

export default class OurStory {
	init() {
		this.skew();
		$(window).on('resize', debounce(this.skew, 150));
	}

	skew() {
		$('.skew').each((index, $el) => {
			const rotate = OurStory.getRandomInt();
			const translate = OurStory.getRandomInt();

			if ($(window).width() < 745) {
				const value = `rotate(${rotate}deg) translate(${translate}px)`;
				$($el).css('transform', value);
			} else {
				const value = `rotate(${rotate}deg)`;
				$($el).css('transform', value);
			}
		});
	}

	static getRandomInt() {
		const min = Math.ceil(-2);
		const max = Math.floor(2);
		return Math.floor(Math.random() * (max - min)) + min;
	}
}
