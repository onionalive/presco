import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image, AsyncStorage, KeyboardAvoidingView, ActivityIndicator, Platform, Keyboard } from 'react-native';
import axios from 'axios';

/* user imports */
import InputField from 'app/components/common/InputField';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import Button from 'app/components/common/Button';
import { Tranxactor } from 'app/common';
import SwiperContainer from 'app/components/swipercontainer/SwiperContainer';
import Config from 'craveable-brands-loyalty-app/app.config';
import SInfo from 'react-native-sensitive-info';
import * as Animatable from 'react-native-animatable';
import Signup from 'app/components/signup/SignUp';
import Dimensions from 'Dimensions';
import Images from 'app/img/Image';
const { loadingGradient, iconAlert, background } = Images;
import { setSessionTimeout } from 'app/reducers/login';
import NotificationBottom from '../common/NotificationBottom';

class LoginScreen extends Component {
	state = {
		login: '',
		password: '',
		showLogin: true,
		signInFailed: false,
		loading: false,
		success: false,
		errMsg: ''
	};

	/**
	 * Handle the login and store the appropriate 
	 * user data securely or as an Async storage
	 * item.
	 */
	login = async () => {
		/**
		 * Use this to check the current local state
		 * for login
		 */
		try {
			this.setState({ 
				...this.state,
				loading: true
			});

			const { navigation, setExpiration, updateProfile, updateMemberships, loginSucess, updateNotificationBottom, updateShowNotificationBottom } = this.props;
			const res = await Tranxactor.getToken({
				username: this.state.login,
				password: this.state.password
			});

			const { status, data } = res;

			if (res.status === 200) {
				SInfo.setItem('token', data.token, {});
				SInfo.setItem('masterToken', data.masterToken, {});
				const [userDetails, memberships] = [
					await Tranxactor.getUserDetails(data.token),
					// await Tranxactor.getUserMemberships(data.token),
					await Tranxactor.getIdentifierList(data.userId, data.token)
				];

				if (userDetails.status === 200) {
					try {
						const userInfo = userDetails.data;

						// check if user is activated
						if (userInfo.memberStatus.value !== 'Loyalty Member // Registered') {
							console.log('Check how things are going here');
							updateNotificationBottom({
								title: 'title - add to firebase',
								subtitle: 'subtitle - add to firebase',
								buttons: [
									{
										title: 'Dismiss',
										action: () => {
											navigation.navigate('FinishActivation', {
												username: this.state.login,
												password: this.state.password
											});
											updateShowNotificationBottom(false);
										}
									}
								],
								footer: 'Forget about it',
								view: 'ONE'
							});
							
							this.setState({ 
								...this.state,
								loading: false
							});
							return;
						}

						/** 
						 * Sync all the useful information we get with AsyncStorage
						 */
						// this.props.goSetSessionTimeout(data); // set refresh token timer
						await setExpiration(data.expiration); // store expiration in reducer
						await updateProfile(userInfo);
						AsyncStorage.setItem('loggedIn', 'true', () => console.log('loggedIn set'));
						AsyncStorage.setItem('userId', userInfo.id, () => console.log('userId set'));
						AsyncStorage.setItem('userName', userInfo.firstName, () => console.log('userName set'));
						AsyncStorage.setItem('userType', userInfo.type, () => console.log('userType set'));
					} catch(err) {
						console.log(err);
					}
				}

				if (memberships.status === 200) {
					try {
						/** 
						 * Sync all the useful information we get with AsyncStorage
						 */
						updateMemberships(memberships.data._embedded.memberIdentifiers);
					} catch(err) {
						console.log(err);
					}
				}

				this.setState({
					...this.state,
					loading: false,
					success: true
				});
				loginSucess();
			} else {
				// check different error code here
				const loginError = (res.response.status === 400 || res.response.status === 404);
				this.showError();
				this.setState({
					...this.state,
					signInFailed: true,
					loading: false,
					errMsg: loginError ? "We couldn't match the username or password" : 'Invalid username or password'
				});
				// Uncomment if you want to not have to sign in
				// this.props.navigation.navigate('Main');
				// this.props.screenProps.goTo('TabBar');
			}
		} catch(err) {
			console.log('LOGIN ERROR', err);
			this.setState({ 
				...this.state,
				loading: false
			});
		}
	}

	showError() {
		this.refs.loginButton.transitionTo({
			zIndex: 0
		});

		this.refs.errorButton.transitionTo({
			zIndex: 50
		});
	}

	hideError() {
		this.refs.errorButton.transitionTo({
			zIndex: 0
		});

		this.refs.loginButton.transitionTo({
			zIndex: 50
		});
	}

	renderLogin() {
		const { textStyle, initStyle, flexCenter, inputField } = styles;
		const { heading, username, password, button } = this.props.signIn;
		const { signInFailed, loading, success, errMsg } = this.state;
//
		const mainBody = () => (
			<View style={ [{
				marginLeft: 20,
				marginRight: 20,
				backgroundColor: Colours.cOffBlack,
				paddingTop: 20,
				paddingBottom: 60
			}] }>
				<Animatable.Image
					animation={loading ? fadeInOut : null}
					iterationCount="infinite"
					source={loadingGradient}
					style={{
						width: '100%',
						position: 'absolute',
						top: 0,
						opacity: loading ? 1 : 0
					}}
				></Animatable.Image>
				<Text style={{
					...Fonts.fHeadingMedium,
					color: Colours.cWhite,
					textAlign: 'center',
				}}>{heading}</Text>
				<InputField
					alt
					placeholder={username}
					keyboardType='email-address'
					onChangeText={(text) => {
						this.hideError();
						this.setState({
							...this.state,
							login: text,
							signInFailed: false,
							errMsg: ''
						});
					}}
				/>
				<InputField
					alt
					placeholder={password} 
					style={inputField}
					onChangeText={(text) => {
						this.hideError();
						this.setState({
							...this.state,
							password: text,
							signInFailed: false,
							errMsg: ''
						});
					}}
					secureTextEntry={true}
				/>
				{/*<Button action={() => this.login()}
					style={[buttonStyles.button]}
					underlayColor={Colours.cPrimaryUnderlay}>
					<Text style={buttonStyles.text}>{button}</Text>
				</Button>*/}
				<Animatable.View 
					key="loginButton"
					ref="loginButton"
					style={{
						position: 'absolute',
						width: '100%',
						bottom: 0,
						zIndex: 50
					}}
				>
					<Button 
						style={[buttonStyles.button, {
							backgroundColor: buttonColour
						}]} 
						action={loading ? () => console.log('Loading state') : () => this.login()}
						underlayColor={Colours.cPrimaryUnderlay}
					>
						<Text style={buttonStyles.text}>{button}</Text>
					</Button>
				</Animatable.View>
				<Animatable.View 
					key="errorButton"
					ref="errorButton"
					style={{
						position: 'absolute',
						width: '100%',
						bottom: 0,
						zIndex: 0
					}}
				>
					<Button 
						underlayColor={Colours.cNearlyBlackUnderlay}
						style={buttonStyles.error}
						action={loading ? () => console.log('Loading state') : () => this.login()}>
						<Image 
							source={iconAlert} 
							style={{
								width: 20,
								height: 20,
								justifyContent: 'center',
								alignItems: 'center'
							}}
						/>
					</Button>
				</Animatable.View>
			</View>
		);
		
		const resizeMode = 'cover';
		const fadeInOut = {
			0: {
			  opacity: 0
			},
			0.5: {
			  opacity: 1
			},
			1: {
			  opacity: 0
			},
		};

		const buttonColour = success ? 
				Colours.cGreen : 
				loading ? 
				Colours.cNearlyBlack : 
				Colours.cPrimary;
		// console.log(errMsg)
		const renderErrMsg = () => {
			if(!errMsg) return null;
			return (
				<View 
					style={{
						position: 'absolute',
						bottom: -10,
						width: '100%'
					}}>
						<Text
							style={{
								...Fonts.fUtility,
								color: Colours.cYellow,
								backgroundColor: Colours.cTransparent,
								textAlign: 'center'
							}}
						>{errMsg}</Text>
				</View>
			)
		}

		return (
			<Animatable.View 
				ref="login"
				style={[ initStyle, {
				justifyContent: 'center',
				position: 'absolute',
				width: '100%',
				height: '100%'
			}]}>
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
					source={background}
				/>
				{
					Platform.OS === 'ios' ?
					<KeyboardAvoidingView
						keyboardVerticalOffset={20}
						behavior={'position'}
						style={{position: 'relative'}}
						onStartShouldSetResponder={(e) => true}
        				onResponderRelease={(e) => Keyboard.dismiss()}
					>
						{mainBody()}
						{renderErrMsg()}
					</KeyboardAvoidingView> :
					<View
						style={{position: 'relative'}}
					>
						{mainBody()}
						{renderErrMsg()}
					</View>
				}
				<Button action={() => this.props.navigation.navigate('ForgetPassNav')}
					style={{
						position: 'absolute',
						bottom: 30,
						left: 10
					}}
					underlayColor={Colours.cTransparent}>
					<Text style={buttonStyles.text}>Forgot password?</Text>
				</Button>
				<Button action={() => this.props.navigation.navigate('HypeScreeNav')}
					style={{
						position: 'absolute',
						bottom: 30,
						right: 10
					}}
					underlayColor={Colours.cTransparent}>
					<Text style={buttonStyles.text}>Sign up</Text>
				</Button>
			</Animatable.View>
		);
	}

	render() {
		try {
			const { initStyle } = styles;
			const { showLogin } = this.state;
			const resizeMode = 'cover';
			return (
				<View style={ [initStyle, {
					justifyContent: 'center',
					position: 'relative'
				}] }>
					<Image
						style={{
							backgroundColor: 'rgba(0,0,0,0.9)',
							flex: 1,
							resizeMode,
							position: 'absolute',
							width: '100%',
							height: '100%',
							justifyContent: 'center'
						}}
						source={background}
					/>
					{this.renderLogin()}
				</View>
			);
		} catch(err) {
			console.log(err);
			return null;
		}
	}
}

const width = Dimensions.get('window').width;
let buttonWidth;
if (width > 370) {
	buttonWidth = 300;
} else {
	buttonWidth = 280;
}

const baseButton = {
	padding: 12,
	paddingLeft: 18,
	paddingRight: 18,
	paddingBottom: Platform.OS === 'android' ? 36 : 12,
	height: 40,
	minWidth: 180,
	alignItems: 'center',
	margin: 20
}

const signupButton = {
	width: buttonWidth,
	alignSelf: 'center'
}

const buttonStyles = {
    button: {
		...baseButton,
		backgroundColor: Colours.cPrimary,
	},
	error: {
		...baseButton,
		backgroundColor: Colours.cNearlyBlack,
	},
    text: {
        ...Fonts.fPrimary,
        color: Colours.cWhite,
        fontSize: 14
    }
}

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		flex: 1,
		backgroundColor: Colours.cOffBlack
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputField: {
		marginBottom: 20
	}
};

export default LoginScreen;
