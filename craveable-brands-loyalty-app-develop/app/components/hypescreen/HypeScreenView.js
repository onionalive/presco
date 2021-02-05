import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { bindActionCreators } from 'redux';
import { Text, View, Platform, Image, Dimensions } from 'react-native';
import axios from 'axios';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import SwiperContainer from 'app/components/swipercontainer/SwiperContainer';
import Button from 'app/components/common/Button';
import Signup from 'app/components/signup/SignUp';
import Images from 'app/img/Image';
const { loadingGradient, iconAlert, background } = Images;
import { NavigationActions } from 'react-navigation';
const {width, height} = Dimensions.get('window');

/* user imports */
class HypeScreenView extends Component {

	routeAction = () => {
		const { appNav, navigation } = this.props;
		const LoginNav = appNav.routes.filter(route => route.routeName === 'LoginNav');
		// console.log(LoginNav)
		if (LoginNav.length > 0) {
			return navigation.goBack(null);
		} else {
			navigation.navigate('LoginNav');
		}
	}

	renderSignUp() {
		const { textStyle, initStyle, flexCenter, inputField } = styles;
		const { navigation , hype } = this.props;
		const { button, login } = hype;
		const resizeMode = 'cover';
		
		return (
			<Animatable.View 
				ref="signup" 
				style={ [ initStyle, {
				justifyContent: 'center',
				alignItems: 'center'
			}] }>
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
				<View style={ [{
					position: 'absolute',
					top: 20,
					width: '100%'
				}] }>
					<SwiperContainer 
						signup
						dotsAlt
						slides={login.slides}
						navigation={navigation} 
						ref='SignupSwiper'
					/>
				</View>
				<View style={{
					position: 'absolute',
					bottom: 20,
					width: '100%'
				}}>
					<Button action={() => {
						this.refs.signup.transitionTo({
							opacity: 0
						});

						setTimeout(() => {
							this.refs.signupscreens.transitionTo({
								top: 0
							}, 270, 'ease-out');
						}, 270);
					}}
						style={[buttonStyles.button, signupButton]}
						underlayColor={Colours.cPrimaryUnderlay}>
						<Text style={buttonStyles.text}>{button}</Text>
					</Button>
					<View style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'center'
					}}>
						<Text style={{
							...Fonts.fUtility,
							textAlign: 'center',
							backgroundColor: Colours.cTransparent,
							color: Colours.cWhite,
							marginRight: 10
						}}>{login.copy}</Text>
						<Button action={() => this.routeAction()}
							underlayColor={Colours.cTransparent}>
							<Text style={{
								...Fonts.fUtility,
								textAlign: 'center',
								backgroundColor: Colours.cTransparent,
								color: Colours.cWhite,
								textDecorationLine: 'underline'
							}}>{login.link}</Text>
						</Button>
					</View>
				</View>
			</Animatable.View>
		);
	}

	renderSignupScreens() {
		return (
			<Animatable.View 
				ref="signupscreens"
				style={ {
					height: '100%',
					width: '100%',
					backgroundColor: Colours.cTransparent,
					position: 'absolute',
					top: Dimensions.get('window').height,
					zIndex: 60
				} }>
				<Signup
					action={() => {
						this.refs.signupscreens.transitionTo({
							top: Dimensions.get('window').height
						}, 270, 'ease-out');

						this.refs.signup.transitionTo({
							opacity: 1,
							zIndex: 50
						});
					}}
					navigation={this.props.navigation}
				/>
			</Animatable.View>
		);
	}

	render() {
		try {
			const { initStyle } = styles;
			const resizeMode = 'cover';
			return (
				<View style={ [initStyle, {
					justifyContent: 'center'
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
					{this.renderSignUp()}
					{this.renderSignupScreens()}
				</View>
			);
		} catch(err) {
			console.log(err);
			return null;
		}
	}
}


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

export default HypeScreenView;
