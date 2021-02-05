/**
 * Importing for React Native might become a problem for if we are ussing
 * this for the React module as well 
 */
import { Linking, Platform, Alert } from 'react-native';

export default class Direction {

	openMap = (store, provider = 'google') => {
		const {
			latitude,
			longitude
		} = store
		let url;
		if(latitude, longitude){
			url = (provider === 'google') ? this.buildGoogleLatLong(latitude, longitude) :  this.buildAppleLatLong(latitude, longitude);
		} else {
			const destination_add = this.createDestinationAddress(store);
			url = (provider === 'google') ? this.buildGoogleAddress(destination_add) :  this.buildAppleAddress(destination_add);
		}
		console.log(url);
		this.launchUrl(url);
	}

	createDestinationAddress = (store) => {
		const {
			address,
			suburb,	
			state,
			postcode,
		} = store
		const _add = address.replace(/\s+/g, '+');
		const _suburb = suburb.replace(/\s+/g, '+');
		return [_add, _suburb, state, postcode].join('+');
	}

	buildGoogleAddress = (address) => {
		return `https://www.google.com/maps/dir/?api=1&destination=${address}&travelmode=driving`;
	}

	buildAppleAddress = (address) => {
		return `http://maps.apple.com/?daddr=${address}&dirflg=d`;
	}
	
	buildGoogleLatLong = (latitude, longitude) => {
		return `http://maps.google.com/maps?q=${latitude},${longitude}`;
	}

	buildAppleLatLong = (latitude, longitude) => {
		return `http://maps.apple.com/?q=${latitude},${longitude}&t=s&dirflg=d`;
	}

	launchUrl = (url) => {
		Linking.canOpenURL(url).then(supported => {
			if(!supported) {
				console.log('Can\'t handle url: ' + url);
			} else {
				Linking.openURL(url).catch(err => {
					if(url.includes('telprompt')) {}
					else {
						console.log('openURL error', err)
					}
				})
			}
		}).catch(err => {
			Alert.alert(
				'ERROR',
				'Unable to call: ' + url,
				[
					{text: 'OK'},
				]
			)
		})
	}
}
