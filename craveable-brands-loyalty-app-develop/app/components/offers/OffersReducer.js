
import data from './Offers.json';
import {Tranxactor} from 'app/common';

// Initial state
// Replace data with [] and null when using live data
let initialState = {
	init: "Set as initial state",
	offerNotification: true,
	selectedItem: data[0],
	// items: [],
	// offersActive: [],
	// offersExpired: []
	/* use default data stub if debugging */
	items: data,
	offersActive: [],
	offersExpired: [],
	selectedIndex: 0
}

/* Actions */
const OFFER_NOTIFICATION 		= 'OffersReducer/OFFER_NOTIFICATION';
const NAVIGATE 					= 'Navigation/NAVIGATE';
const SELECTED_ITEM 			= 'OffersReducer/SELECTED_ITEM';
const GET_OFFERS_ACTIVE 		= 'OffersReducer/GET_OFFERS_ACTIVE';
const GET_OFFERS_EXPIRED 		= 'OffersReducer/GET_OFFERS_EXPIRED';
const SELECTED_INDEX 			= 'OffersReducer/SELECTED_INDEX';

/* Action Creators */
export function updateOfferNotification(value) {
  return {
    type: OFFER_NOTIFICATION,
    value: value
  };
}

export function updateSelectedItem(data) {
  return {
    type: SELECTED_ITEM,
    value: data
  };
}

export function updateSelectedIndex(index) {
	return {
	  type: SELECTED_INDEX,
	  value: index
	};
  }

export function getOffersActive(memberId, token, startDate=null, endDate=null) {
	return function(dispatch) {
		Tranxactor.getOfferList(memberId, token, 'ACTIVE', startDate=null, endDate=null)
			.then(response => {
				if (response.status === 200) {
					dispatch({
						type: GET_OFFERS_ACTIVE,
						value: response.data._embedded.vouchers
					});
				} else if (response.status === 204) {
					dispatch({
						type: GET_OFFERS_ACTIVE,
						value: []
					});
				}
			})
			.catch(err => console.log(err));
	}
}

export function getOffersExpired(memberId, token, startDate=null, endDate=null) {
  return function(dispatch) {
		Tranxactor.getOfferList(memberId, token, 'EXPIRED', startDate=null, endDate=null)
			.then(response => {
				if (response.status === 200) {
					dispatch({
						type: GET_OFFERS_EXPIRED,
						value: response.data._embedded.vouchers
					});
				} else if (response.status === 204) {
					dispatch({
						type: GET_OFFERS_EXPIRED,
						value: []
					});
				}
			})
			.catch(err => {
				console.log(err);
				console.log(err.response.data);
			});
	}
}

export const OffersReducer = (state = initialState, action) => {
	switch(action.type) {
		/* Action Switch */
		case OFFER_NOTIFICATION:
			return { 
				...state, 
				offerNotification: action.value
			};
		case NAVIGATE:
			if (action.routeName === 'Offers') {
				return { 
					...state, 
					offerNotification: false
				};
			}
			return state;
		case SELECTED_ITEM:
			return {
				...state,
				selectedItem: action.value
			}
		case GET_OFFERS_ACTIVE:
			return {
				...state,
				offersActive: action.value
			};
		case GET_OFFERS_EXPIRED:
			return {
				...state,
				offersExpired: action.value
			};
		case SELECTED_INDEX:
			return {
				...state,
				selectedIndex: action.value
			};
		default:
			return state;
	}
}