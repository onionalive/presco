/*eslint-env browser*/

class Sliders {
	init() {
		this.sliders();
		this.sliderCount();
	}

	sliders() {
		$('.top-image-slider').slick();
		$('.middle-text-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			dots: true,
			arrows: false

		});
		$('.staff-slider').slick({
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
				{
					breakpoint: 1080,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});
		$('.slick-prev').html('');
		$('.slick-next').html('');
	}

	sliderCount() {
		const slideCount = $('.image-slide:not(.slick-cloned)').length;
		$('.image-slide:not(.slick-cloned)').map( (i, el) => {
			$(el).attr('id', i + 1);
		});
		$('.slide-count-wrap .current').html($('.slick-active').attr('id'));
		$('.slide-count-wrap .total').html(slideCount);

		$('.top-image-slider').on('afterChange', () => {
			$('.slide-count-wrap .current').html($('.slick-active').attr('id'));
		});
	}
}

export default Sliders;
