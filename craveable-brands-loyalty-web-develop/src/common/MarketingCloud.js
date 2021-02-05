/**
 * Importing for React Native might become a problem for if we are ussing
 * this for the React module as well 
 */
import ExactTarget from 'react-native-exact-target';
import { Platform } from 'react-native';
import Config from 'craveable-brands-loyalty-app/app.config';

export default class MarketingCloud {

	init() {
		ExactTarget.initializePushManager({
			appId: Config.marketingCloud.appId,
			accessToken: Config.marketingCloud.accessToken,
			gcmSenderId: Config.marketingCloud.gcmSenderId,
			enableAnalytics: false,
			enableLocationServices: false,
			enableProximityServices: false,
			enableCloudPages: false,
			enablePIAnalytics: false
		})
		.then(() => {
			// This is to register the app on APNs, this bit isn't needed for GCM on Android
			if (Platform.OS === 'ios') {
				ExactTarget.registerForRemoteNotifications();
			}

			this.setSubscriberKey('PCTestJackPhone');
			console.log('Set Subscriber ID');
		})
		.catch(error => {
			console.log('MarketingCloud error: ', error);
		});
	}

	setSubscriberKey(key) {
		// We need to get the Thor member ID and send it to Marketing Cloud
		// Before we run this command we need to check if the SDK has been initialised
		if (ExactTarget.isSDKInitialized()) {
			ExactTarget.setSubscriberKey(key);
		}
	}

	remove() {
		if (this.pushNotificationListener) { 
			this.pushNotificationListener.remove();
		}
	}
}
