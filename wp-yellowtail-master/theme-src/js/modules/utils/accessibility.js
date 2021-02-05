export default function accessibility() {
	const cont = $('.country-dropdown');

	cont.find('a').focus(() => {
		if (!cont.hasClass('-active')) {
			cont.addClass('-active');
		}
	}).blur(() => {
		if (cont.hasClass('-active')) {
			cont.removeClass('-active');
		}
	});
}
