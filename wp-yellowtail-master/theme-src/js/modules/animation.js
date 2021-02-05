import webp from './webp';

export default class Animation {
	init() {
		this.$animation = $('.animation.-loop');

		if (this.$animation) {
			this.themePath = $('meta[name=theme_url]').attr('content');
			webp().then(() => {
				this.load('webp');
			}, () => {
				this.load('png');
			});
		}
	}

	load(extension) {
		this.$animation.each((i, elem) => {
			const spriteName = $(elem).data('sprite');
			const filename = `${this.themePath}/img/sprites/sprite-${spriteName}.${extension}`;
			const $sprite = $('<img/>', {
				src: filename,
				class: 'sprite',
			});

			const tmpImg = new window.Image();

			$(elem).append($sprite);

			tmpImg.onload = function () {
				$(elem).children('.sprite').css('opacity', 1);
			};

			tmpImg.src = filename;
		});
	}
}
