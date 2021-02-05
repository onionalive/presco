/*eslint-env browser*/

class Layout {
	constructor() {
		this.tilesToShow = 8;
	}

	init() {
		this.hideArticlesPastEight();
		this.loadMoreArticlesOnHomePage();
		this.copyrightYear();
	}

	hideArticlesPastEight() {
		$('.home .tile').map((i, el) => {
			if (i >= this.tilesToShow) {
				$(el).hide();
			}
		});
	}

	loadMoreArticlesOnHomePage() {
		$('.load-more a').on('click', () => {
			this.tilesToShow += 3;

			$('.home .tile').map((i, el) => {
				if (i < (this.tilesToShow)) {
					$(el).slideDown();
				}

				if (this.tilesToShow >= $('.home .tile').length) {
					$('.load-more a').fadeOut();
				}
			});

			return false;
		});
	}

	copyrightYear() {
		var date = new Date();
		var year = date.getFullYear();
		$('.cr-year').html(year);
	}
}

export default Layout;
