/* jshint browser: true */
/* jshint loopfunc: true */

import webp from './webp';
import Constants from './Constants';

export default class ScrollAnim {
	init($el) {
		this.$el = $el;
		this.isMobile = $(window).width() <= 667 && $(window).height() <= 850;

		$(window).load(() => {
			if ($el.length > 1) {
				$el = $el.first();
			}

			this.height = $el.outerHeight();
			this.animName = this.$el.data('anim');
			this.frameCount = this.$el.data('frames');
			this.themePath = $('meta[name=theme_url]').attr('content');
			this.triggers = {
				start: 0,
				end: 0,
				range: 0,
			};

			webp().then(() => {
				this.load('webp');
				this.calculateTriggers();
			}, () => {
				this.load('png');
				this.calculateTriggers();
			});
		});

		$(window).resize(() => {
			if ($(window).width() < Constants.tabletP) {
				this.height = $el.innerHeight();
			}
		});
	}

	load(extension) {
		const spriteName = this.$el.data('sprite');
		const filename = `${this.themePath}/img/sprites/sprite-${spriteName}.${extension}`;
		const $sprite = $('<img/>', {
			src: filename,
			class: 'sprite'
		});

		const tmpImg = new window.Image();

		this.$el.append($sprite);

		tmpImg.onload = () => {
			this.$el.children('.sprite').css('opacity', 1);
		};

		tmpImg.src = filename;
	}

	calculateTriggers() {
		this.triggers.start = this.$el.offset().top + this.$el.outerHeight() - $(window).height();
		this.triggers.end = this.$el.parents('section').offset().top;

		if (this.isMobile) {
			this.triggers.start += 220;
			this.triggers.end += 220;
		}

		this.triggers.range = this.triggers.end - this.triggers.start;

		this.scrollWatch();
	}

	scrollWatch() {
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

		$(window).on('scroll', () => {
			this.lastScrollPos = document.documentElement.scrollTop ?
				document.documentElement.scrollTop : window.scrollY;
			this.requestTick();
		});
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
		let offset = 0;

		if (this.lastScrollPos > this.triggers.start && this.lastScrollPos < this.triggers.end) {
			const progress = (((this.lastScrollPos - this.triggers.start) / this.triggers.range) * 100);
			const currentFrame = Math.floor(progress / (100 / this.frameCount));

			offset = -currentFrame / this.frameCount * 100;
		} else if (this.lastScrollPos < this.triggers.start) {
			offset = 0;
		} else if (this.lastScrollPos > this.triggers.end) {
			offset = -(this.frameCount - 1) / this.frameCount * 100;
		}

		this.$el.children('.sprite').css('transform', `translate3d(0,${offset}%,0)`);
		this.tick = false;
	}
}
