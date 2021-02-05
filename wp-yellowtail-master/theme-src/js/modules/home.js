class Home {
	constructor() {
		this.$feature = $('section.one');
		this.$innerHeight = this.$feature.find('.inner').outerHeight() + 100;
	}
}

export default Home;
