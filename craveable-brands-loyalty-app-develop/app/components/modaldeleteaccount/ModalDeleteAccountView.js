import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image } from 'react-native';
import axios from 'axios';

/* user imports */
import Images from 'app/img/Image';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import Dimensions from 'Dimensions';
import Button from 'app/components/common/Button';
import {
	DeleteAccountScreenOne,
	DeleteAccountScreenTwo,
	DeleteAccountScreenThree
} from 'app/components/modaldeleteaccount/ModalDeleteAccountScreens';
import Swiper from 'react-native-swiper';

class ModalDeleteAccount extends Component {

	state = { 
		selectedIndex: 0,
		newPhoneField: '',
		renderHelpButton: false
	};

	onIndexChanged(index) {
		if (index === this.refs.DeleteAccountSwiper.props.children.length - 1) {
			this.setState({
				...this.state,
				selectedIndex: index,
				renderHelpButton: true
			});
		} else {
			this.setState({
				...this.state,
				selectedIndex: index,
				renderHelpButton: false
			});
		}
	}

	/**
	 * Update field functions
	 */
	updateNewPhoneField = (text) => this.setState({ ...this.state, newPhoneField: text });
	updateNewPasswordConfirmField = (text) => {
		this.state.newPasswordField === text ?
			this.setState({ ...this.state, newPasswordConfirmField: text, passwordsMatch: true }) :
			this.setState({ ...this.state, newPasswordConfirmField: text, passwordsMatch: false }) ;
	}

	moveBack = () => {
		if (this.state.selectedIndex === 0) return;
		this.refs.DeleteAccountSwiper.scrollBy(-1);
	}

	moveForward = () => {
		if (this.state.selectedIndex === this.refs.DeleteAccountSwiper.props.children.length - 1) {
			return;
		} else {
			this.refs.DeleteAccountSwiper.scrollBy(1);
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
		try {
			const { textStyle, initStyle, flexCenter, inputField } = styles;
			const resizeMode = 'cover';
			const { navigation, copy } = this.props;
			const { renderHelpButton } = this.state;
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
							ref='DeleteAccountSwiper'
							onIndexChanged={(index) => this.onIndexChanged(index)}
						>
							<DeleteAccountScreenOne 
								action={this.dismiss}
								forward={() => this.moveForward()} 
								error={'error'}
								updateError={() => console.log('blah')}
								accountName={'accountName'}
								copy={copy.deleteAccount1}
							/>
							<DeleteAccountScreenTwo 
								action={() => console.log('blah')}
								forward={() => this.moveForward()} 
								updateAction={this.updateNewPhoneField}
								error={'error'}
								updateError={() => console.log('blah')}
								accountName={'accountName'}
								copy={copy.deleteAccount2}
							/>
							<DeleteAccountScreenThree 
								actionLeft={this.dismiss}
								forward={() => this.moveForward()} 
								error={'error'}
								updateError={() => console.log('blah')}
								accountName={'accountName'}
								copy={copy.deleteAccount3}
							/>
							{/* There will be a fourth screen here */}
						</Swiper>
					</View>
					{
						renderHelpButton ? 
						<Button 
							action={() => console.log('HELP')}
							style={{
								position: 'absolute',
								bottom: 20,
								left: 20
							}}
						>
							<Text style={{
								...Fonts.fUtility,
								color: Colours.cGrey
							}}>{'Help'.toUpperCase()}</Text>
						</Button> :
						(<Button 
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
						</Button>)
					}
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

export default ModalDeleteAccount;