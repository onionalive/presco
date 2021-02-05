/* jshint browser: true */

export default class BigText {
	init() {
		this.$el = $('.bigtext');
		this.strikout = [];

		this.$el.children('span').each(function () {
			let text = $(this).text();

			if (text.substr(text.length - 1) === ' ') {
				text = text.substr(0, text.length - 1);
			}

			$(this).text(text);
		});

		this.$el.bigtext();

		this.$el.filter(':contains("heart")').html((_, html) => {
			return html.replace(/(heart)/g, '<span class="strikeout">$1</span>');
		});
	}
}
