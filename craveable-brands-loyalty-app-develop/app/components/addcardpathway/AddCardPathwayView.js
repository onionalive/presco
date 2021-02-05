import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image } from 'react-native';
import axios from 'axios';
import PushNotification from 'react-native-push-notification';

/* user imports */
import Tranxactor from 'app/common/Tranxactor';
import {
	CameraScan,
	MergeCards,
	EnterIdentPassword,
	EnterAcceptorPassword,
	AddCardSuccess
} from 'app/components/addcardpathway/AddCardScreens';
// import * as Animatable from 'react-native-animatable';
// import Swiper from 'react-native-swiper';
import Images from 'app/img/Image';
import Button from 'app/components/common/Button';
/* user imports */
import Colours from 'app/styles/Colours';
import Swiper from 'react-native-swiper';

class AddCardPathway extends Component {

	state = { 
		selectedIndex: 0,
		identDonor: '',
		passwordDonor: '',
		passwordAcceptor: '',
		flAddNewCard: null,
		error: ''
	};

	/**
	 * Navigation reset
	 */
	dismiss = () => {
		const { navigation } = this.props;
		navigation.goBack(null);
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
		this.refs.AddCardSwiper.scrollBy(-1);
	}

	moveForward = () => {
		if (this.state.selectedIndex === this.refs.AddCardSwiper.props.children.length - 1) {
			// console.log('THE END');
			return;
		} else {
			this.refs.AddCardSwiper.scrollBy(1);
		}
	}

	handleBack = () => {
		if (this.state.selectedIndex === 0) {
			this.props.action();
		} else {
			this.moveBack();
		}
	}

	updateIdentDonor = (value) => this.setState({ ...this.state, identDonor: value });
	updatePasswordDonor = (value) => this.setState({ ...this.state, passwordDonor: value });
	updatePasswordAcceptor = (value) => this.setState({ ...this.state, passwordAcceptor: value });
	updateFLAddCardType = (value) => this.setState({ ...this.state, flAddNewCard: value });
	updateError = (text) => this.setState({...this.state, error: text});

	openNotification = (data, userInfo = null) => {
		try {
			const { 
				title, 
				subtitle, 
				buttonOne, 
				buttonTwo, 
				buttonOneAction, 
				buttonTwoAction, 
				footer, 
				view 
			} = data;
	
			// CHECK NotificationBottom.js for types
			// TODO: Update notif type names to make more sense
			this.props.updateNotificationBottom({
				title: title,
				subtitle: subtitle,
				buttons: [
					{
						title: buttonOne ? buttonOne : 'Dismiss',
						action: buttonOneAction ? buttonOneAction : null
					},
					{
						title: buttonTwo ? buttonTwo : 'OK',
						action: buttonTwoAction ? buttonTwoAction : () => console.log('buttonTwo')
					}
				],
				footer: footer ? footer : 'Forget about it',
				view: view ? view : 'ONE'
			});
	
			// PushNotification.localNotification({
			// 	/* Android Only Properties */
			// 	// tag: 'some_tag', // (optional) add tag to message
	
			// 	// /* iOS only properties */
			// 	// This is if we want bottom notifications
			// 	userInfo: { 
			// 		type: 'BOTTOM'
			// 	}, // (optional) default: null
	
			// 	/* iOS and Android properties */
			// 	title: "Error", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
			// 	message: "The name field cannot be empty", // (required)
			// 	playSound: false, 
			// 	soundName: 'default', 
			// });
		} catch(err) {
			console.log(err);
		}
	}

	addCard = async (data) => {
		try {
			const data = await Tranxactor.addCard();
			if (data) {
				this.moveForward();
			} else {
				this.dismiss();
				this.openNotification(data);
			}
		} catch(err) {
			this.openNotification({
				title: 'Oops! There was an error.',
				subtitle: err.message,
				buttonTwo: null
			});
		}
	}

	updateSuccess = async (token, userId) => {
		const { getLoyaltyCards, refreshProfile } = this.props;
		await getLoyaltyCards(userId, token);
		await refreshProfile(token);
		this.moveForward();
	}


	render() {
		try {
			const { textStyle, initStyle, flexCenter, swiperStyle } = styles;
			const { 
				identAcceptor,
				updateNotificationBottom,
				getLoyaltyCards,
				copy
			} = this.props;

			const {
				identDonor,
				passwordDonor,
				passwordAcceptor,
				flAddNewCard,
				error
			} = this.state;

			const resizeMode = 'cover';
			const cardData = {
				identDonor,
				passwordDonor,
				identAcceptor,
				passwordAcceptor,
				flAddNewCard
			}

			if (__DEV__) console.log('### Add Card data:', cardData);

			return (
				<View style={{ 
					flex: 1,
					height: '100%',
					width: '100%',
					backgroundColor: Colours.cOffBlack
				}}>
					<Image
						style={{
							backgroundColor: 'rgba(255,255,255,0.1)',
							flex: 1,
							resizeMode,
							position: 'absolute',
							width: '100%',
							height: '100%',
							justifyContent: 'center'
						}}
						source={Images.background}
					/>
					<View style={{
						flex: 1,
					}}>
						<Swiper
							loop={false}
							scrollEnabled={false}
							showsPagination={false}
							removeClippedSubviews={false}
							ref='AddCardSwiper'
							onIndexChanged={(index) => this.onIndexChanged(index)}
						>
							<CameraScan
								copy={copy} 
								action={this.moveForward}
								backward={this.moveBack}
								forward={this.moveForward}
								updateAction={this.updateIdentDonor}
							/>
							<EnterIdentPassword
								copy={copy.verifyPassword1} 
								action={this.moveForward}
								backward={this.moveBack}
								forward={this.moveForward}
								updateAction={this.updatePasswordDonor}
								error={error}
								updateError={this.updateError}
								updateFLAddCardType={this.updateFLAddCardType}
							/>
							<EnterAcceptorPassword
								copy={copy.verifyPassword2} 
								updateAction={this.updatePasswordAcceptor}
								error={error}
								updateError={this.updateError}
								data={cardData}
								updateNotificationBottom={updateNotificationBottom}
								updateSuccess={this.updateSuccess}
								updateFailure={this.dismiss}
							/>
							<AddCardSuccess
								copy={copy.mergeSuccess} 
								action={this.dismiss}
								backward={this.moveBack}
								forward={this.moveForward}
							/>
						</Swiper>
					</View>
					<Button
						action={() => {
							this.state.selectedIndex === 0 ?
								this.props.navigation.goBack(null) :
								this.moveBack();
						}}
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

export default AddCardPathway;
