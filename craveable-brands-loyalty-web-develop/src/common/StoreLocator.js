import _ from 'lodash';
import haversine from 'haversine';
import Config from 'craveable-brands-loyalty-app/app.config';
import axios from 'axios';

export default class StoreLocator {
	static getDistance(store, region) {
		const start = {
		  latitude: region.latitude,
		  longitude: region.longitude
		};

		const end = {
		  latitude: store.latitude,
		  longitude: store.longitude
		};
		return haversine(start, end, {unit: 'meter'}) / 1000;
	} 


	static filterClosestStores(stores, region) {
		let distances = [];
		const start = {
		  latitude: region.latitude,
		  longitude: region.longitude
		}
		// console.log('start', start);
		stores.forEach((store) => {
			const end = {
			  latitude: store.latitude,
			  longitude: store.longitude
			}

			let distance = {
				store: store,
				title: store.title,
				id: store.id,
				latitude: store.latitude,
				longitude: store.longitude,
				distance: haversine(start, end, {unit: 'meter'}) / 1000
			};
		    distances.push(distance)
		});

		distances = _.sortBy(distances, [(o) => { return o.distance; }]);
		// console.log(distances);
		return _.slice(distances, 0, 20);
	}

	static searchStores(search) {
		const data = new FormData();
		data.append('location', search);
		return axios.post(Config.stores.geo, data)
					.then(res => res)
					.catch(err => {
						 return { "error": err }
					});
	}


	static searchStoresViaGoogle(search) {
		const { api, apiKey } = Config.google;
		const url = `${api.geocode}?key=${apiKey}&address=${encodeURI(search)}&components=country:AU&language=en&region=au`;
		return axios.get(url)
					.then(res => {
						// console.log(res)
						const { status, data } = res;
						if(status !== 200 || data.error_message || data.status === 'ZERO_RESULTS') {
							return { "error": 'no result' }
						}
						return data.results[0].geometry;
					})
					.catch(err => {
						 return { "error": err }
					});
	}
}
