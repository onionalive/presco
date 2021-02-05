import axios from 'axios';
// import Analytics from './Analytics';
import Types from './types';
import Config from 'config';
import apisauce from 'apisauce';
// import storge from './Storage'; 
// import { store } from 'app/app';

/**
 * Convert to app.config.js
 */

/**
 * Tranxactor class handles all functionality
 * for Tranxactor - refer to their API for
 * more info.
 *
 * http://docs.transactorapiv22.apiary.io/
 */

export const MEMBER_STATUS_REGISTERED 		= 'Loyalty Member // Registered';
export const MEMBER_STATUS_TERMINATED 		= 'Loyalty Member // Terminated';
export const MEMBER_STATUS_PENDING 			= 'Loyalty Member // Pending Activation';

export const IDENTIFIER_STATUS_USED			= 1;
export const IDENTIFIER_STATUS_CANCELLED	= 3;

const apis = apisauce.create({
	baseURL: Config.tranxactor.api,
    headers: Config.tranxactor.headers,
    timeout: 10000
})

export default class Tranxactor {
	/**
	 * May not be used - a good proxy to enforce types though
	 */
	static get userDetailsProxy() {
		return {
			set: function(obj, prop, value) {
				const props = PropTypes;

				if (!Object.keys(props).includes(prop)) {
					throw new TypeError(`${prop} is not an allowed property for a user.`);
				}

				if (typeof value !== props[prop]) {
					throw new TypeError(`${prop} is of type ${typeof value} and not of type ${props[prop]}`);
				}

				// The default behavior to store the value
				obj[prop] = value;

				// Indicate success
				return true;
			}
		}
	}

	/**
	 * Test to ensure class works and common
	 * classes used in the web app can also
	 * import and destructure.
	 * 
	 * @static
	 * @return {string} Success message
	 */
	static initTest() {
		return 'Success';
	}

	/**
	 * Fetch token to use for Auth reqs
	 * 
	 * @static
	 * @param  {object} data Axios POST req data
	 * @return {object}      Return data or error to be handled gracefully
	 * @memberof Tranxactor
	 */
	static getToken(data) {
		try {
			return axios.post(`${Config.tranxactor.api}/tokens`, data, {
				headers: Config.tranxactor.headers
			})
				.then(res => res)
				.catch(err => err);
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	// static getTokenSuccess(data) {

	// }

	// static getTokenError(data) {

	// }

	/**
	 * Fetch User details from
	 * 
	 * @static
	 * @param  {string} memberId User ID
	 * @return {object}      Return data or error to be handled gracefully
	 * @memberof Tranxactor
	 */
	static async getUserDetails(token, retry = true) {
		try {
			return axios.get(`${Config.tranxactor.api}/members/me`, {
					headers: {
						...Config.tranxactor.headers,
						'Authorization': token
					}
				})
				.then((res) => {
					// Set user details in Firebase
					// Analytics.setUserDetails(res.data);

					return res;
				})
				.catch(async (err) => {
					/**
					 * STILL TO FINISH
					 * - trying to get refresh token if auth out of time
					 */
					if (retry) {
						try {
							await Tranxactor.fetchResetToken();
							await Tranxactor.getUserDetails(token, false);	
						} catch(err) {
							console.log(err);
						}
					} else {
						return err;
					}
				});
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	/**
	 * Fetch User memberships
	 * 
	 * @static
	 * @param  {string} memberId User ID
	 * @return {object}      Return data or error to be handled gracefully
	 * @memberof Tranxactor
	 */
	static async getUserMemberships(memberId, token, retry = true) {
		try {
			return axios.get(`${Config.tranxactor.api}/memberships/?page=0&pageSize=10&member=${memberId}`, {
					headers: {
						...Config.tranxactor.headers,
						'Authorization': token
					}
				})
				.then(res => res)
				.catch(async (err) => {
					/**
					 * STILL TO FINISH
					 * - trying to get refresh token if auth out of time
					 */
					console.log('handle err', err.message);
					console.log('handle err', err.response);
					if (err.response.status === 404) {
						return err.response.status;
					}

					if (retry && err.response.status === 501) {
						console.log('retrying');
						try {
							await Tranxactor.fetchResetToken('made it');
							Tranxactor.getUserMemberships(token, false);	
						} catch(err) {
							console.log(err);
						}
					} else {
						console.log('no more retrying');
						return err;
					}
				});
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	//https://transactorapiv22.docs.apiary.io/#reference/reset-token/reset-gift-card/get-member-vouchers

	/**
	 * GET req for offer list
	 * 
	 * @static
	 * @param  {string} memberId Member ID
	 * @param  {string} token Auth token
	 * @param  {string} status What status you want eg ALL, EXPIRED, ACTIVE
	 * @param  {string} startDate Eg. 2017-05-29T23%3A00%3A00.000Z
	 * @param  {string} endDate Eg. 2017-05-29T23%3A00%3A00.000Z
	 * @return {object}          Request response
	 * @memberof Tranxactor
	 */
	static getOfferList(memberId, token, status='ALL', startDate=null, endDate=null) {
		try {
			const headers = {
				...Config.tranxactor.headers,
				'Authorization': token
			};

			return axios.get(`${Config.tranxactor.api}/hda/members/${memberId}/vouchers?status=${status}`, {
				headers: headers
			})
				.then(res => res)
				.catch(err => {
					/**
					 * Throw error back and then have
					 * higher scope call fetchResetToken
					 */
					throw err;
				});
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	/**
	 * GET req for transaction list
	 * 
	 * @static
	 * @param  {string} memberId Member ID
	 * @return {object}          Request response
	 * @memberof Tranxactor
	 */
	static getTransactionList(memberId, token, page = 1, retry = true) {
		try {
			const headers = {
				...Config.tranxactor.headers,
				'Authorization': token
			};
			console.log('headers', headers);

			return axios.get(`${Config.tranxactor.api}/transactions?page=${page}&pageSize=10&member=${memberId}`, {
				headers: headers
			})
				.then(res => res)
				.catch(err => {
					/**
					 * Throw error back and then have
					 * higher scope call fetchResetToken
					 */
					throw err;
				});
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	/**
	 * GET req for identifier list
	 * 
	 * @static
	 * @param  {string} memberId Member ID
	 * @return {object}          Request response
	 * @memberof Tranxactor
	 */
	static getIdentifierList(memberId, token) {
		try {
			const headers = {
				...Config.tranxactor.headers,
				'Authorization': token
			};
			return axios.get(`${Config.tranxactor.api}/members/${memberId}/memberIdentifiers`, {
				headers: headers
			})
				.then(res => res)
				.catch(err => {
					/**
					 * Throw error back and then have
					 * higher scope call fetchResetToken
					 */
					throw err;
				});
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	/**
	 * PUT req update a user's identifier(membership card) in order to mark the card as "Cancelled"
	 * 
	 * @static
	 * @param  {string} identifierId
	 * @return {object} Return response from request
	 * @memberof Tranxactor
	 */

	static removeCard(identifierId, token) {
		try {
			const headers = {
				...Config.tranxactor.headers,
				'Authorization': token
			};
			//mark it as cancelled
			const data = {
				"identifierStatus": {
			    	"id": "3"
			  }
			}
			return axios.put(`${Config.tranxactor.api}/memberIdentifiers/${identifierId}?returnBody=true`, data, {
				headers: headers
			})
				.then(res => res)
				.catch(err => {
					/**
					 * Throw error back and then have
					 * higher scope call fetchResetToken
					 */
					throw err;
				});
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	static createNewCard(memberId, token, startDate="", endDate="") {
		try {
			const headers = {
				...Config.tranxactor.headers,
				'Authorization': token
			};
			//mark it as cancelled
			const data = {
			  	"member": memberId,
			  	"startDate": startDate,
			  	"endDate": endDate,
			  	"memberIdentifierType": {
			    	"id": "1",
			    	"value": "Card ISO"
			  	},
		  		"identifierStatus": {
		    		"id": "1",
		    		"value": "In Use"
		  		}
			};

			return axios.post(`${Config.tranxactor.api}/memberIdentifiers?returnBody=true`, data, {
				headers: headers
			})
				.then(res => res)
				.catch(err => {
					/**
					 * Throw error back and then have
					 * higher scope call fetchResetToken
					 */
					throw err;
				});
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	/**
	 * addCard
	 * @param {*} data 
	 * {
	 *  "identAcceptor": "6035650011000054296",
	 *	"passwordAcceptor": "qwerty",
	 *	"identDonor": "6035650011000050732",
	 *	"passwordDonor": "6969",
	 *	"flAddNewCard": "1"
	 * }
	 */
	static addCard(data) {
		return new Promise((resolve, reject) => {
			// This needs to be resolve
			reject(new Error('You still need to add Tranxactor.addCard properly'));

		});
	}

	/**
	 * PUT req update a user's personal info
	 * Update 
	 * 
	 * @static
	 * @param  {string} memberId User ID to update
	 * @param  {object} data Data object to update their details
	 * @return {object}      Return response from request
	 * @memberof Tranxactor
	 * 
	 * @example - To update memberStatus, pass the "data" param with exported value 
	 * list above eg:
	 * { memberStatus: { value: MEMBER_STATUS_REGISTERED } }
	 * 
	 * Possible values:
	 * MEMBER_STATUS_REGISTERED
	 * MEMBER_STATUS_PENDING
	 * MEMBER_STATUS_TERMINATED
	 * 
	 * @example - Some other possible data object params
	 * {
	 * 	firstName,
	 * 	lastName,
	 * 	emailAddress,
	 *  mobileNumber
	 * }
	 */
	static updateUserDetails(memberId, token, data) {
		try {
			const headers = {
				...Config.tranxactor.headers,
				'Authorization': token
			};

			return axios.put(`${Config.tranxactor.api}/members/${memberId}?returnBody=true`, data, {
				headers: headers
			})
				.then(res => res)
				.catch(err => err);
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	/**
	 * PUT req update identifier details
	 * Update 
	 * 
	 * @static
	 * @param  {string} identifierId Identifier ID to update
	 * @param  {object} data Data object with new details
	 * @return {object}      Return response from request
	 * @memberof Tranxactor
	 * 
	 * @example - To update identifierStatus, pass the "data" param with exported value 
	 * list above eg:
	 * { identifierStatus: { value: IDENTIFIER_STATUS_CANCELLED } }
	 * 
	 * Possible values:
	 * IDENTIFIER_STATUS_USED
	 * IDENTIFIER_STATUS_CANCELLED
	 * 
	 */
	static updateIdentifierDetails(identifierId, data, token) {
		try {
			const headers = {
				...Config.tranxactor.headers,
				'Authorization': token
			};

			return axios.put(`${Config.tranxactor.api}/memberIdentifiers/${identifierId}?returnBody=true`, data, {
				headers: headers
			})
				.then(res => res)
				.catch(err => err);
		} catch(err) {
			console.log(err);
			return err;
		}
	}


	/**
	 * PUT req update a user password
	 * 
	 * @static
	 * @param {string} tokenId	Reset token required to update user details
	 * @param {any} data	Data object containing 'emailAddress' and 'password'
	 * @returns {object}      Return response from request
	 * @memberof Tranxactor
	 */
	static updateUserPassword(tokenId, data) {
		try {
			return axios.put(`${Config.tranxactor.api}/resetToken/${tokenId}`, data, {
				headers: { 'Content-Type': 'application/json' }
			})
				.then(res => res)
				.catch(err => err);
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	/**
	 * POST req for reset token
	 * 
	 * @static
	 * @param  {object} data	 Object passing user email
	 * @return {object}          Request response
	 * @memberof Tranxactor
	 * 
	 * @example - Object returned
	 * {
	 * 	expiration,
	 * 	masterToken,
	 * 	token,
	 * 	userId,
	 *	userType
	 * }
	 */
	static fetchResetToken(masterToken) {
		try {
			return axios.post(`${Config.tranxactor.api}/tokens/refresh`, {
				masterToken: masterToken
			}, {
				headers: Config.tranxactor.headers
			})
				.then(res => res)
				.catch(err => err);
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	/**
	 * POST req to create a new membership
	 * Mandatory fields include:
	 * - First name
	 * - Email address
	 * - Phone number
	 * - Password
	 * 
	 * @static
	 * @param  {object} data	 Object passing user details
	 * @return {object}          Request response
	 * @memberof Tranxactor
	 */
	static createNewMember(data) {
		try {
			console.log('createNewMember data', data);
			return axios.post(`${Config.tranxactor.api}/members?returnBody=true`, data, {
				headers: { 'Content-Type': 'application/json' }
			})
				.then(res => res.data)
				.catch(err => err);
		} catch(err) {
			console.log(err);
			return err;
		}
	}


	/**
		api calls with apisource
	**/

	static async asGetToken(data) {
		return await apis.post('/tokens', data);
	}

	static async resetKeys (token, masterToken) {
		// !!! need to chose by env for function call
		console.log('set keys');
		// await storge.setItem('token', token, {});
		// await storge.setItem('masterToken', masterToken, {});
	}

	static async asFetchResetToken(masterToken, resetKeys = false) {
		apis.setHeaders(Config.tranxactor.headers);
		const res = await apis.post('/tokens/refresh', {
			masterToken: masterToken
		});
		const { ok, data } = res;
		if(ok && resetKeys){
			const { token, masterToken } = data;
			Tranxactor.resetKeys(token, masterToken);
		}
		return res;
	}

	static async asGetUserDetails(token, retry = true, mToken = null) {
		apis.setHeader('Authorization', token);
		const res = await apis.get('/members/me');
		// console.log(res);
		if(!res.ok && retry && mToken){
			console.log('reset token');
			const result = await Tranxactor.asFetchResetToken(mToken, true);
			if(!result.ok) {
				return result;
			}
			return await Tranxactor.getUserDetails(result.data.token, false);
		}
		return res;
	}
}

const PropTypes = {
	firstName: Types.string,
	middleName: Types.string,
	lastName: Types.string
};
