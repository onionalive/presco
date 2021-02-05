/* jshint browser: true */

export default class RooPhotos {
	init() {
		this.$photos = $('.roo-photo-container');
		this.$photo = '';
		this.photoWidth = '';
		this.photoMargin = '';
		this.rowCount = '';
		this.count = '';
		this.shift = '';
		this.scrollCheck = '';
		this.scrollTrigger = '';

		// Scroll
		this.loop = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function (callback) {
				setTimeout(callback, 1000 / 60);
			};
		this.tick = false;
		this.lastScrollPos = 0;

		this.isMobile = $(window).width() <= 667;

		this.initDom();
		this.setEvents();
		this.scrollWatch();
	}

	initDom() {
		this.$photo = this.$photos.children('.roo-photo');

		this.setOffset();

		this.$photo.each(function () {
			const vOffset = (Math.random() - 0.5) * 60;
			const angle = this.isMobile ? (Math.random() - 0.5) * 3 : (Math.random() - 0.5) * 8;

			$(this).css({
				top: vOffset,
				transform: `translate3d(0,0,0) rotate(${angle}deg)`,
			});
		});
	}

	setEvents() {
		$(window).on('resize', () => {
			this.setOffset();
		});
	}

	scrollWatch() {
		if (this.isMobile) {
			this.scrollTrigger = this.$photos.offset().top + (this.$photos.outerHeight() / 3);
		} else {
			this.scrollTrigger = this.$photos.offset().top + this.$photos.outerHeight();
		}

		$(window).on('scroll', () => {
			this.onScroll();
		});
	}

	onScroll() {
		this.lastScrollPos = document.documentElement.scrollTop ?
			document.documentElement.scrollTop : window.scrollY;

		this.requestTick();
	}

	requestTick() {
		if (!this.tick) {
			this.loop.call(window, () => {
				this.update();
			});
			this.tick = true;
		}
	}

	update() {
		if (this.lastScrollPos + $(window).height() > this.scrollTrigger) {
			this.$photo.each((index) => {
				setTimeout(() => {
					this.$photo.eq(index).removeClass('-hidden');
				}, index * 150);

				$(window).off('scroll', () => {
					this.onScroll();
				});
			});
		}

		this.tick = false;
	}

	setOffset() {
		this.$photo.css({
			marginLeft: '',
		});

		this.photoWidth = this.$photo.eq(0).outerWidth();
		this.photoMargin = parseInt(this.$photo.eq(0).css('margin-right'), 10);
		this.rowCount = this.isMobile ? 2 : 5;
		this.count = this.$photo.length;
		this.multiplePhotoWidth = ((this.photoWidth + this.photoMargin) * this.count);
		this.shift = (this.$photos.outerWidth() - (this.multiplePhotoWidth - this.photoMargin)) / 2;

		if (this.$photo.length % 5 !== 0 && !this.isMobile) {
			this.$photo.eq(0).css('margin-left', this.shift);
		} else if (this.$photo.length % 2 !== 0 && this.isMobile && !this.$photo.last()) {
			this.$photo.filter(':last-child').css('margin-left', this.shift);
		}
	}
}
