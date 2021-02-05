import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image } from 'react-native';
import axios from 'axios';

/* user imports */
import Button from 'app/components/common/Button';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import Dimensions from 'Dimensions';
import Images from 'app/img/Image';

import {
	RequestToken,
	RequestSent
} from 'app/components/editpasswordpathway/EditPathwayScreens';
import Swiper from 'react-native-swiper';

class EditPasswordPathway extends Component {

	state = { 
		selectedIndex: 0,
		oldPasswordField: '',
		newPasswordField: '',
		newPasswordConfirmField: '',
		passwordsMatch: false
	};

	onIndexChanged(index) {
		// console.log('indexChange', index); 
		this.setState({
			...this.state,
			selectedIndex: index
		});
	}

	/**
	 * Update field functions
	 */
	updateOldPasswordField = (text) => this.setState({ ...this.state, oldPasswordField: text });
	updateNewPasswordField = (text) => this.setState({ ...this.state, newPasswordField: text });
	updateNewPasswordConfirmField = (text) => {
		this.state.newPasswordField === text ?
			this.setState({ ...this.state, newPasswordConfirmField: text, passwordsMatch: true }) :
			this.setState({ ...this.state, newPasswordConfirmField: text, passwordsMatch: false }) ;
	}

	moveBack = () => {
		if (this.state.selectedIndex === 0) return;
		this.refs.EditPasswordSwiper.scrollBy(-1);
	}

	moveForward = () => {
		if (this.state.selectedIndex === this.refs.EditPasswordSwiper.props.children.length - 1) {
			// console.log('THE END');
			return;
		} else {
			this.refs.EditPasswordSwiper.scrollBy(1);
		}
	}

	dismiss = () => this.props.navigation.goBack(null);

	handleBack = () => {
		if (this.state.selectedIndex === 0) {
			this.dismiss();
		} else {
			this.moveBack();
		}
	}

	render() {
		if (__DEV__) console.log('@@@ EDIT PASSWORD STATE', this.state);
		try {
			const { textStyle, initStyle, flexCenter, inputField } = styles;
			const resizeMode = 'cover';
			const { navigation, copy, emailAddress, updateNotificationBottom } = this.props;
			const { passwordsMatch } = this.state;
			return (
				<View style={ [initStyle, {
					justifyContent: 'center'
				}] }>
					{/*
						We should think of way to improve loading this bg three times	
					*/}
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
							ref='EditPasswordSwiper'
							onIndexChanged={(index) => this.onIndexChanged(index)}
						>
							<RequestToken 
								action={() => this.moveForward()}
								forward={() => this.moveForward()} 
								error={'error'}
								updateError={() => console.log('blah')}
								copy={{
									heading: 'Change password',
									body: 'To reset your password, select the button below and an email will be sent to you!',
									button: 'Send email'
								}}
								emailAddress={emailAddress}
								updateNotificationBottom={updateNotificationBottom}
							/>
							<RequestSent 
								action={() => this.dismiss()}
								forward={() => this.moveForward()} 
								error={'error'}
								updateError={() => console.log('blah')}
								copy={{
									heading: 'Email sent',
									body: 'Check your emails and follow the instructions to change your account password',
									button: 'Dismiss'
								}}
							/>
						</Swiper>
					</View>
					<Button 
						action={() => this.handleBack()}
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

const baseButton = {
	padding: 12,
	paddingLeft: 18,
	paddingRight: 18,
	height: 40,
	minWidth: 180,
	alignItems: 'center',
	margin: 20
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

export default EditPasswordPathway;
