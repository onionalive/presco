import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Colours from 'app/styles/Colours';
import Images from 'app/img/Image';
const { background } = Images;
import { isRootView } from 'app/reducers/login';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';
import last from 'lodash/last';
import {
	membershipCardId
} from 'app/components/loyaltycardContainer/LoyaltyCardReducer';

class RootScreen extends Component {

	 async componentWillReceiveProps (newProps) {
		// console.log('newProps: ', newProps)
		const baseLogin = this.props.loginLoaded !== newProps.loginLoaded && newProps.loginLoaded === true;
	    if(  baseLogin || newProps.isLoggedIn !== this.props.isLoggedIn) {
	    	await this.setRouting();
	    }
	 }

	setRouting = async () => {
		const { navigation, isRootView, appNav, primaryCardID } = this.props;
		try {
			const hype = await AsyncStorage.getItem('hype');
			// console.log('hype', hype)
			if(hype !== 'true'){
				await AsyncStorage.setItem('hype', 'true', () => console.log('to hype screen'));
				return navigation.navigate('HypeScreeNav');
			}
			const retry = await AsyncStorage.getItem('retry');
			console.log(retry);
			if(retry === 'true' && primaryCardID) {
				return navigation.navigate('RetryNav');
			}
			const loggedIn = await AsyncStorage.getItem('loggedIn');
			const onboarding = await AsyncStorage.getItem('onboarding');
			console.log(loggedIn);
			if(loggedIn === 'true'){
				console.log('User is logged in');
				if(onboarding === 'true') {
					return navigation.navigate('Main');
				} else {
					await AsyncStorage.setItem('onboarding', 'true', () => console.log('to onboarding screen'));
					return navigation.navigate('OnboardingNav');
				}
			}
			console.log('Not logged in');
			return navigation.navigate('LoginNav');
		} catch (error) {
			console.log(error);
			navigation.navigate('LoginNav');
		}
	}

	render() {
		const { loginLoaded } = this.props;
		return(
			<View style={{ flex: 1,
				justifyContent: 'center',
				backgroundColor: Colours.cBlack,
			}}>
			<Image
				style={{
					backgroundColor: 'rgba(255,255,255,0.1)',
					flex: 1,
					resizeMode: 'cover',
					position: 'absolute',
					width: '100%',
					height: '100%',
					justifyContent: 'center'
				}}
				source={background}
			/>
				<ActivityIndicator
		          size='large'
		          style={{marginTop: 100 }}
	        	/>
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		loginLoaded: state.LoginReducer.loginLoad,
		primaryCardID: membershipCardId(state),
		isLoggedIn: state.LoginReducer.isLoggedIn,
		appNav: state.appNav
	};
}

export default connect(mapStateToProps, {
	isRootView
})(RootScreen);