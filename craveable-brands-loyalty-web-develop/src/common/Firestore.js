/**
 * Importing for React Native might become a problem for if we are ussing
 * this for the React module as well 
 */
import firebase from 'react-native-firebase';
import moment from 'moment';

/* Actions */
const UPDATE_COPY = 'FirebaseReducer/UPDATE_COPY';
const UPDATE_PROMOTIONS = 'FirebaseReducer/UPDATE_PROMOTIONS';

export default class Firestore {
	constructor(dispatch) {
		this.dispatch = dispatch;
		this.watchCopy();
		this.watchPromotions();
	}

	watchCopy() {
		try {
			firebase
				.firestore()
				.collection('copy')
				.onSnapshot(snapshot => {
					let data = {};
					snapshot.forEach(function(doc) {
						data[doc.id] = doc.data();
					});
					
					if (data) {
						// Call to Redux using dispatch
						this.dispatch({
							type: UPDATE_COPY,
							value: data
						});
					}
				}, (err => err));
		} catch (err) {
			console.log('getCopy err', err);
		}
	}

	watchPromotions() {
		try {
			firebase
				.firestore()
				.collection('promotions')
				// Add a validity date param
				.where('date_to', '>=', new Date())
				.onSnapshot(snapshot => {
					let data = [];
					let now = moment();
					snapshot.forEach(function(doc, key) {
						let promotion = doc.data();
						if(moment(promotion.date_from).isBefore(now)) {
							promotion.key = doc.id;
							data.push(promotion);
						}
					});
					
					if (data) {
						// Call to Redux using dispatch
						this.dispatch({
							type: UPDATE_PROMOTIONS,
							value: data
						});
					}
				}, (err => err));
		} catch (err) {
			console.log('getPromotions err', err);
		}
	}
}
