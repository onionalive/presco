import copy from 'copy/index.json';
import merge from 'deepmerge';
import firebase from 'firebase';
import 'firebase/firestore';
import moment from 'moment';

// Initial state
let initialState = {
	copy: copy,
	promotions: [],
}

/* Actions */
const UPDATE_COPY = 'FirebaseReducer/UPDATE_COPY';
const UPDATE_PROMOTIONS = 'FirebaseReducer/UPDATE_PROMOTIONS';

/* Action Creators */
export const updateCopy = data => ({
	type: UPDATE_COPY,
	data
});

// export const goUpdateCopy = data => {
// 	return function(dispatch) {
// 		dispatch(updateCopy(data))
// 	}
// }

export const goUpdateCopy = (database) => async dispatch => {
	try {
		database.collection('copy')
			.onSnapshot(snapshot => {
				let data = {};
				snapshot.forEach(function(doc) {
					data[doc.id] = doc.data();
				});

				if (data) {
					dispatch(updateCopy(data))
				}
			}, (err => err));
	} catch (err) {
		console.log('Get Firebase copy ERROR', err);
	}
}

export const updatePromotions = data => ({
	type: UPDATE_PROMOTIONS,
	data
});

export const goUpdatePromos = (database) => async dispatch => {
	try {
		database.collection('promotions')
			.where('date_to', '>=', new Date())
			.onSnapshot(snapshot => {
				let data = [];
				let now = moment();
				snapshot.forEach(function(doc, key) {
					let promotion = doc.data();
					if (moment(promotion.date_from).isBefore(now)) {
						promotion.key = doc.id;
						data.push(promotion);
					}
				});

				if (data) {
					dispatch(updatePromotions(data))
				}
			}, (err => err));
	} catch (err) {
		console.log('Get Firebase promos ERROR', err);
	}
}

// $FlowFixMe
export const FirebaseReducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_COPY:
			const merged = merge(state.copy, action.data)
			return {
				...state,
				copy: merged
			}
		case UPDATE_PROMOTIONS:
			return {
				...state,
				promotions: action.data
			}
		default:
			return state;
	}
}
