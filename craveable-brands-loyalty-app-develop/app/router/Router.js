import React, { Component } from 'react';
import { View, AsyncStorage, Text, SafeAreaView, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import Notification from 'app/components/common/Notification';
import NotificationBottom from 'app/components/common/NotificationBottom';
import NotificationAndroid from 'app/components/common/NotificationAndroid';
import NotificationBottomAndroid from 'app/components/common/NotificationBottomAndroid';

// Navigation
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
// import TabBar from './tabbar/TabBarNavigation';
// import AppNav from './newappnav/AppNavigation';
import AppNav from './appnav';
// import OnboardingNav from './onboarding/OnboardingNavigation';

// import Landscape from 'app/components/landscape/Landscape';
import Colours from 'app/styles/Colours';
import { store } from 'app/app';

// import firebase from 'react-native-firebase';
// import Firestore from '../common/Firestore.js';
// import MarketingCloud from '../common/MarketingCloud.js';
// import Bluedot from '../common/Bluedot.js';

import Config from 'craveable-brands-loyalty-app/app.config';

// Dynamics
import DynamicLinks from 'app/common/DynamicLinks';

import {
    addAppNavListener
} from 'app/app';

/**
 * For anything related to navigation, be sure 
 * to check the docs at https://github.com/react-community/react-navigation
 */
class Router extends Component {
	constructor(props) {
		super(props);
		this.state = {
			onboarding: null,
			showNotification: false,
			showNotificationBottom: false
		};
		this.setupPushNotifications();
		// this.configureFirebase();
		// this.configureBluedot();
	}

	setupPushNotifications() {
		console.log('setupPushNotifications fired');

		// const marketingCloud = new MarketingCloud;
		// marketingCloud.init();

		// Code below here was used for handling PushNotifications pre-MarketingCLoud integration

		const update = () => this.setState({ 
			...this.state, 
			showNotification: true
		});

		const updateBottom = () => this.setState({ 
			...this.state, 
			showNotificationBottom: true
        });
        
		const updateNotification = (message) => this.props.updateNotification(message);
		const updateNotificationBottom = (data) => this.props.updateNotificationBottom(data);

		PushNotification.configure({
		    // (optional) Called when Token is generated (iOS and Android)
		    onRegister: function(token) {
		        console.log( 'TOKEN:', token );
		    },

		    // (required) Called when a remote or local notification is opened or received
		    onNotification: function(notification) {	
				if (notification.foreground) {
					// TODO: Write Android equivalent for local notification
					
					if (Platform.OS === 'ios') {
						updateNotification(notification.message);
						if (notification.data.type && notification.data.type === 'BOTTOM') {
							updateBottom();
						} else {
							update();
						}
					} else {
						updateNotification(notification.alert);
						if (notification.tag && notification.tag === 'BOTTOM') {
							updateBottom();
						} else {
							console.log('HERE');
							update();
						}
					}
                }
		    },

		    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
		    senderID: Config.marketingCloud.gcmSenderId,

		    // IOS ONLY (optional): default: all - Permissions to register.
		    // permissions: {
		    //     alert: true,
		    //     badge: true,
		    //     sound: true
		    // },

		    // Should the initial notification be popped automatically
		    // default: true
		    popInitialNotification: true,

		    /**
		      * (optional) default: true
		      * - Specified if permissions (ios) and token (android and ios) will requested or not,
		      * - if not, you must call PushNotificationsHandler.requestPermissions() later
		      */
		    requestPermissions: false,
		});
	}

	componentDidMount() {
		//Orientation.addOrientationListener(this.orientationDidChange);
		// fix this once deep links are added for Android
		if (__DEV__) console.log('!!! Router component did mount');
		const { dispatch } = this.props;
		const navigation = addNavigationHelpers({
			dispatch: dispatch,
			state: this.props.appNav
		});
		console.log('PROPS ceiuahtueiahiuae', this.props);
		DynamicLinks.initDeepLinks(navigation, dispatch);
	}

	// configureBluedot() {
	// 	const bluedot = new Bluedot();
	// }

	// configureFirebase() {
	// 	// Sign in anonymously
	// 	firebase.auth().signInAnonymously();

	// 	// Watch Firestore for changes
	// 	const firestore = new Firestore(this.props.dispatch);
	// }

	updateOnboarding = async () => {
		try {
			await AsyncStorage.setItem('Brokers', false, () => {
				console.log('Onboarding set');
			});
		} catch (error) {
			console.log('AsyncStorage error: ' + error.message);
		}
	}

	setNotificationFalse = () => this.setState({
		...this.state,
		showNotification: false,
		showNotificationBottom: false
	});

	componentWillReceiveProps(props) {
		if (props.showNotificationBottom) {
			this.setState({
				...this.state,
				showNotificationBottom: true
			});
		}
	}

	componentWillUnmount() {
		if (__DEV__) console.log('!!! The Router component is unmounting');
	}

	render() {
		try {
			const { dispatch, notificationText, notificationTextBottom, updateShowNotificationBottom } = this.props;
			const { loading, showNotification, showNotificationBottom } = this.state;
			if (Platform.OS === 'ios') {
				return (
					[
						<Notification key='notification' 
							showNotification={showNotification} 
							setNotificationFalse={this.setNotificationFalse} 
							notificationText={notificationText}
							/>,
						<AppNav
							key='app'
						 />,
						<NotificationBottom key='notificationBottom' 
							showNotification={showNotificationBottom}  
							setNotificationFalse={this.setNotificationFalse}
							notificationTextBottom={notificationTextBottom}
							updateShowNotificationBottom={updateShowNotificationBottom}
							/>
					]
				);
			} else {
				return (
					[
						<AppNav 
							key='app'
						/>,
						<NotificationAndroid key='notification' 
							showNotification={showNotification} 
							setNotificationFalse={this.setNotificationFalse} 
							notificationText={notificationText}
							/>,
						<NotificationBottomAndroid key='notificationBottom' 
							showNotification={showNotificationBottom}  
							setNotificationFalse={this.setNotificationFalse}
							notificationTextBottom={notificationTextBottom}
							updateShowNotificationBottom={updateShowNotificationBottom}
							/>
					]
				);
			}
		} catch(err) {
			return (
				<View>
					<Text>Error thrown - check the console.</Text>
				</View>
			);
		}
	}
}

export default Router;
