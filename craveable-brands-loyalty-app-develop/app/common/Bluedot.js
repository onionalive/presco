/**
 * Importing for React Native might become a problem for if we are ussing
 * this for the React module as well 
 */
import {
	NativeModules,
	NativeEventEmitter
} from 'react-native';

import Config from 'craveable-brands-loyalty-app/app.config';

export default class Bluedot {
	constructor() {
		try {
			if (!config.bluedot) throw new Error('No bluedot config in app.config.js');
			this.bluedot = NativeModules.Bluedot;
			this.bluedotEmitter = new NativeEventEmitter(this.bluedot);
			this.bluedotNotifications = this.bluedotEmitter.addListener(
				'Notification',
				(message) => {
					window.alert(message);
				}
			);

			this.bluedot.initializeBluedot(config.bluedot);
		} catch(err) {
			console.log(err);
		}
	}
}
