class Slider {

	constructor() {
		this.$catSwiper = new window.Swiper('.swiper-container', {
			direction: 'horizontal',
			slidesPerView: 'auto',
			centeredSlides: false,
			paginationClickable: true,
			freeMode: true,
			mousewheelControl: false,
			mousewheelReleaseOnEdges: true,
			freeModeMomentum: false,
			mousewheelSensitivity: 0.3,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
		});
	}
}

export default Slider;
