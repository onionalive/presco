class Faqs {
	constructor() {
		this.$sections = $('.sections').find('.section .item');
		this.$toTop = $('.to-top');
		this.navHeight = '';

		this.$sections.on('click', function () {
			const sectionId = $(this).attr('data-section');

			Faqs.scrollPage(`.faq-section[data-section=${sectionId}]`);
		});

		this.$toTop.on('click', () => {
			Faqs.scrollPage('.faqs');
		});
	}

	static scrollPage($elem) {
		this.navHeight = $('header').outerHeight();

		$('html, body').animate({
			scrollTop: $($elem).offset().top - this.navHeight,
		}, 500);
	}
}

export default Faqs;
