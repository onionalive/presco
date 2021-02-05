/* global location: true */

export default class Search {
	static grappos(geo, counter) {
		return new Promise(
			(resolve, reject) => {
				$.ajax({
					url: `${location.protocol}//www.grappos.com/api2/search.php`,
					data: {
						limit: 6 + (5 * counter),
						format: 'json',
						src: 'hT-691958638',
						lat: geo.lat,
						lon: geo.lng,
						store_type: 'all',
						brand_id: 813,
					},
					type: 'GET',
					success: res => resolve(res),
					error: err => reject(err),
				});
			}
		);
	}

	static australianStores(geo, page) {
		const baseUrl = $('meta[name=base_url]').attr('content');
		return new Promise(
			(resolve, reject) => {
				$.ajax({
					url: `${baseUrl}/api/location/`,
					data: {
						lat: geo.lat,
						lng: geo.lng,
						page,
					},
					type: 'GET',
					success: res => resolve(res),
					error: err => reject(err),
				});
			}
		);
	}
}
