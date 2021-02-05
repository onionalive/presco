/* globals Image */

class BigGame {
	constructor() {
		this.$gallery = $('#gallery');
		this.$selected = this.$gallery.find('.selected-image');
		this.$images = this.$gallery.find('.images a');
		this.transitions = ('transition' in document.documentElement.style) || ('WebkitTransition' in document.documentElement.style);
	}

	init() {
		let img = null;
		this.$images.each((i, elem) => {
			img = new Image();
			img.src = $(elem).attr('href');
		});

		this.$images.on('click', (e) => {
			const $target = $(e.target).closest('li');
			$target.siblings().removeClass('-selected');

			if (this.transitions) {
				if ($target.find('img').attr('data-video')) {
					const vidLink = $target.find('img').attr('data-video');
					const vidDom = `<div class="video-container"><iframe width="560" height="315" src="${vidLink}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div><div class="timer"></div>`;

					this.$selected.children('.timer').one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', () => {
						this.$selected.html(vidDom);
						this.$selected.removeClass('-hidden');
						$target.addClass('-selected');
					});
					this.$selected.addClass('-hidden');
				} else {
					this.$selected.children('.timer').one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', () => {
						this.$selected.html('<figure><img src="{{ TimberImage(gallery|first)|resize(0,718) }}" alt=""></figure><div class="timer"></div>');
						const imgSrc = $target.find('a').attr('href');
						console.log(imgSrc);
						this.$selected.find('img').attr({
							src: imgSrc
						});

						this.$selected.removeClass('-hidden');

						$target.addClass('-selected');
					});
				}

				// Hide selected image
				this.$selected.addClass('-hidden');
			} else {
				const imgSrc = $target.find('a').attr('href');
				this.$selected.find('img').attr({
					src: imgSrc
				});

				$target.addClass('-selected');
			}

			e.preventDefault();
			return false;
		});
	}
}

export default BigGame;
