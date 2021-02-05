import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { bindActionCreators } from 'redux';
import { Text, View, Platform, Image, Dimensions } from 'react-native';
import axios from 'axios';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import SwiperContainer from 'app/components/swipercontainer/SwiperContainer';
import Button from 'app/components/common/Button';
import FinishProcess from 'app/components/signup/FinishProcess';
import Images from 'app/img/Image';
const { loadingGradient, iconAlert, background } = Images;
import { NavigationActions } from 'react-navigation';
const {width, height} = Dimensions.get('window');

/* user imports */
class FinishSignUpActivationView extends Component {

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
					<FinishProcess
						action={() => {
							this.props.navigation.goBack(null);
						}}
						navigation={this.props.navigation}
					/>
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

export default FinishSignUpActivationView;
