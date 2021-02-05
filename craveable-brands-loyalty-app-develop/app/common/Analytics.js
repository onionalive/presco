// note that the react-native specific code might
// become a problem for using the common file for the
// web app as well
import firebase from 'react-native-firebase';
import moment from 'moment';

export default class Analytics {
	/**
	 * Set user details in Firebase
	 * 
	 * @static
	 * @param {string} data Member data from Tranxactor
	 * @memberof Analytics
	 */
	static setUserDetails(data) {
		
		const analytics = firebase.analytics();
		const crashlytics = firebase.fabric.crashlytics();

		analytics.setUserId(data.id);
		crashlytics.setUserIdentifier(data.id);
		
		if('gender' in data && data.gender) {
			analytics.setUserProperty('appGender', data.gender.value);
		}

		if('memberStatus' in data && data.memberStatus) {
			analytics.setUserProperty('memberStatus', data.memberStatus.value);
		}

		if('state' in data && data.state) {
			analytics.setUserProperty('state', data.state);
		}

		if('ranking' in data && data.ranking) {
			analytics.setUserProperty('tier', data.ranking.value);
		}

		if('birthDate' in data && data.birthDate) {
			analytics.setUserProperty('yearOfBirth', moment(data.birthDate).get('year').toString());
		}

		return;
	}

	/**
	 * Log an analytics event
	 * 
	 * @static
	 * @param {string} data Event name
	 * @param {object} params Event parameters
	 * @memberof Analytics
	 */
	static logEvent(data, params) {
		firebase.analytics().logEvent(data, params);
	}

	/**
	 * Set the screen name for analytics
	 * 
	 * @static
	 * @param {string} screenName Screen name
	 * @param {string} screenClass Screen class 
	 * @memberof Analytics
	 */
	static setCurrentScreen(screenName, screenClass) {
		firebase.analytics().setCurrentScreen(screenName, screenClass);
	}	
}
