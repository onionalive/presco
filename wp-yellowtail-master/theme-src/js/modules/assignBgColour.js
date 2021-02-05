export default class AssignBgColor {

	init(recipe = $('.recipe')) {
		this.varietal = recipe.data('varietal');
		const bgColor = AssignBgColor.colorSelect(this.varietal);

		AssignBgColor.setColor(bgColor);
	}

	static setColor(bgColor, recipe = $('.recipe'), rhs = $('.inner .rhs')) {
		recipe.css('backgroundColor', bgColor);
		rhs.css('backgroundColor', bgColor);
	}

	colorSelect(wineType) {
		// adjust these colors when we know the results
		this.colors = {
			red: '#444444',
			white: '#fff',
			rose: '#222',
			bubbles: '#666',
			sangria: '#999',
			black: '#000'
		};

		switch (wineType) {
		case 'white':
			return this.colors.white;
		case 'red':
			return this.colors.red;
		case 'rose':
			return this.colors.rose;
		case 'bubbles':
			return this.colors.bubbles;
		case 'sangria':
			return this.colors.sangria;
		default:
			return this.colors.black;
		}
	}
}
