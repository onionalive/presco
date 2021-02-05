import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image } from 'react-native';
import axios from 'axios';
import {
	EnterName,
	EnterEmail,
	EnterPhone,
	ValidateRegistration,
	VoucherGifted,
	EnterPassword,
	ConfirmRegistration
} from 'app/components/signup/SignUpScreens';

import {
	CameraScan,
	MergeCards,
	EnterIdentPassword,
	EnterAcceptorPassword,
	AddCardSuccess
} from 'app/components/addcardpathway/AddCardScreens';

import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper';
import Button from 'app/components/common/Button';
/* user imports */
import Colours from 'app/styles/Colours';
import Images from 'app/img/Image';
import Logo from 'app/img/flame-rewards-dark-logo.png';
import { updateLastName } from './SignUpReducer';

class FinishProcess extends Component {

	state = { 
		selectedIndex: 0,
		name: '',
		lastName: '',
		emailAddress: '',
		phone: '',
		error: 'This is the err message',
		passwordState: '',
		cardNumber: '',
		cardPin: '',
		identDonor: '',
		passwordDonor: '',
		flAddNewCard: 0
	};

	/**
	 * Navigation reset
	 */
	dismiss = () => {
		const {navigation, isRootView} = this.props;
		isRootView(true);
		navigation.goBack('RootNav');
	}

	submitData = (data) => {
		/**
		 * This is an example of data submission
		 */
		// const data = {
		// 	"firstName": "Big",
		// 	"lastName": "Kahuna",
		// 	"emailAddress": "dennis@presentcompany.co",
		// 	"password": "Testing1",
		// 	"mobileNumber": "0448881704"
		// }
		// this.props.createAccount(data);
	}

	/**
	 * Use this to handle index changes and when to request for
	 * push notifications, camera notifications, locations notifications etc.
	 * @param {*} index Swiper index
	 */
	onIndexChanged(index) {
		this.setState({
			...this.state,
			selectedIndex: index,
		});
	}

	moveBack = () => {
		if (this.state.selectedIndex === 0) return;
		this.refs.FinishProcessSwiper.scrollBy(-1);
	}

	moveForward = () => {
		if (this.state.selectedIndex === this.refs.FinishProcessSwiper.props.children.length - 1) {
			this.props.action();
		} else {
			this.refs.FinishProcessSwiper.scrollBy(1);
		}
	}

	handleBack = () => {
		if (this.state.selectedIndex === 0) {
			this.props.action();
		} else {
			this.moveBack();
		}
	}

	updateEmail = (text) => this.setState({...this.state, emailAddress: text});
	updateName = (text) => this.setState({...this.state, name: text});
	updateLastName = (text) => this.setState({...this.state, lastName: text});
	updatePhone = (text) => this.setState({...this.state, phone: text});
	updateError = (text) => this.setState({...this.state, error: text});
	updatePassword = (text) => this.setState({...this.state, passwordState: text});
	updateCardNumber = (text) => this.setState({...this.state, cardNumber: text});
	updateCardPin = (text) => this.setState({...this.state, cardPin: text});

	updateIdentDonor = (value) => this.setState({ ...this.state, identDonor: value });
	updatePasswordDonor = (value) => this.setState({ ...this.state, passwordDonor: value });
	updatePasswordAcceptor = (value) => this.setState({ ...this.state, passwordAcceptor: value });
	updateFLAddCardType = (value) => this.setState({ ...this.state, flAddNewCard: value });

	render() {
		if (__DEV__) console.log('### FINISH PROCESS PROPS', this.props);
		try {
			const { textStyle, initStyle, flexCenter, swiperStyle } = styles;
			const { 
				name,
				lastName,
				emailAddress,
				phone,
				error,
				passwordState,
				cardNumber,
				cardPin,
				identDonor,
				passwordDonor,
				flAddNewCard
			} = this.state;

			const {
				primaryCard,
				setExpiration,
				updateProfile,
				updateMemberships,
				updateNotificationBottom,
				copy
			} = this.props;

			const {
				signUp,
				cards
			} = copy;

			const signupData = {
				firstName: name,
				lastName: lastName,
				emailAddress: emailAddress,
				mobileNumber: phone,
				password: passwordState
			};

			const cardData = {
				identAcceptor: emailAddress,
				identDonor,
				passwordDonor,
				passwordAcceptor: '',
				flAddNewCard
			};

			if (__DEV__) console.log('### Signup data:', signupData);
			if (__DEV__) console.log('### Add Card data:', cardData);

			return (
				<View style={{ 
					flex: 1,
					height: '100%',
					width: '100%'
				}}>
					<View style={{
						height: 64,
						paddingTop: 40,
						paddingBottom: 40,
						alignItems: 'center'
					}}>
						<Image 
							style={{
								width: 161,
								height: 64
							}}
							source={Logo} />
					</View>
					<View style={{
						flex: 1,
					}}>
						<Swiper
							loop={false}
							scrollEnabled={false}
							showsPagination={false}
							style={swiperStyle}
							removeClippedSubviews={false}
							ref='FinishProcessSwiper'
							onIndexChanged={(index) => this.onIndexChanged(index)}
						>
							<ValidateRegistration 
								action={this.dismiss}
								forward={this.moveForward}
								backward={this.moveBack}
								userPhone={phone}
								copy={signUp.mobileNumberVerification}
								error={error}
								updateError={this.updateError}
								signupData={signupData}
								setExpiration={setExpiration}
								updateProfile={updateProfile}
								updateMemberships={updateMemberships}
								updateNotificationBottom={updateNotificationBottom}
							/>
							<VoucherGifted 
								action={this.dismiss}
								backward={this.moveBack}
								forward={this.moveForward}
								copy={signUp.mobileNumberVerified}
								error={error}
								updateError={this.updateError}
							/>
							<ConfirmRegistration 
								action={this.dismiss}
								backward={this.moveBack}
								forward={this.moveForward}
								copy={signUp.passwordSuccess}
							/>
							{/*
								- NOTE: Disabled for now as may no 
								longer be a valid part of the sign up
								process.

								<SignupEight 
									action={this.dismiss}
									backward={this.moveBack}
									forward={this.moveForward}
									copy={passwordSuccess}
								/>
							*/}
							<CameraScan 
								action={this.moveForward}
								backward={this.moveBack}
								forward={this.moveForward}
								updateAction={this.updateIdentDonor}
								copy={cards}
							/>
							<EnterIdentPassword
								action={this.moveForward}
								backward={this.moveBack}
								forward={this.moveForward}
								updateAction={this.updatePasswordDonor}
								error={error}
								updateError={this.updateError}
								updateFLAddCardType={this.updateFLAddCardType}
								copy={cards.verifyPassword1}
							/>
							<EnterAcceptorPassword
								action={this.moveForward}
								backward={this.moveBack}
								forward={this.moveForward}
								updateAction={this.updatePasswordAcceptor}
								error={error}
								updateError={this.updateError}
								data={cardData}
								updateNotificationBottom={updateNotificationBottom}
								copy={cards.verifyPassword2}
							/>
							<AddCardSuccess 
								action={this.dismiss}
								backward={this.moveBack}
								forward={this.moveForward}
								copy={cards.mergeSuccess}
							/>
						</Swiper>
					</View>
					<Button
						action={this.handleBack}
						style={{
							position: 'absolute',
							bottom: 20,
							left: 20
						}}
					>
						<Text style={{
							...Fonts.fUtility,
							color: Colours.cGrey
						}}>{'Back'.toUpperCase()}</Text>
					</Button>
				</View>
			);
		} catch(err) {
			console.log(err);
			return null;
		}
	}
}

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		flex: 1
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	swiperStyle: {
	}
};

const buttonStyles = {
    button: {
        backgroundColor: Colours.cPrimary,
        padding: 12,
        paddingLeft: 18,
        paddingRight: 18,
        minWidth: 180,
		alignItems: 'center',
		margin: 20,
    },
    text: {
        ...Fonts.fPrimary,
        color: Colours.cWhite,
        fontSize: 14
    }
}

export default FinishProcess;
