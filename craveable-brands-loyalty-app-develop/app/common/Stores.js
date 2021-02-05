import axios from 'axios';
/**
 * This might become a problem between the two platforms
 */
import Config from 'craveable-brands-loyalty-app/app.config';

/**
 * Stores class retrieves store data from the brand site
 */
export default class Stores {

	/**
	 * Get all stores
	 * 
	 * @static
	 * @return {object}      Return data or error to be handled gracefully
	 * @memberof Stores
	 */
	static get() {
		try {
			return axios.get(`${Config.stores.api}`)
				.then(res => res)
				.catch(err => err);
		} catch(err) {
			console.log(err);
			return err;
		}
	}
}
