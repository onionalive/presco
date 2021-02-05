import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, AsyncStorage, TextInput, ScrollView } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import axios from 'axios';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import Button from 'app/components/common/Button';
import Tranxactor from 'app/common/Tranxactor';
import SInfo from 'react-native-sensitive-info';
import { NavigationActions } from 'react-navigation';
// import InputField from 'app/components/common/InputField';

/* user imports */
import Layout from 'app/styles/Layout';

const {p20, pl20, pr20, pb10, p10, pt10, mb10, mb20} = Layout;


/**
 * Account Settings handles App > Profile > Accounts Settings 
 * 
 * TODO: Update the verified/unverified states
 * 
 * @class AccountSettings
 * @extends {Component}
 */
class AccountSettings extends Component {

	state = { 
		selectedIndex: 0,
		editable: false,
		editedEmailAddress: ''
	};

	/**
	 * Update the current index based on swipe
	 */
	handleIndexChange = (index) => {
		this.setState({
			...this.state,
			selectedIndex: index,
			editable: false
		});
	}
	
	/**
	 * Update the ability to edit specific fields
	 * based on the state.
	 */
	updateEditable = async () => {
		const { editable } = this.state;

		if (editable) {
			const { 
				editedEmailAddress 
			} = this.state;

			const updatedData = {};
			let sendUpdate = false;

			if (editedEmailAddress !== '') {
				updatedData.emailAddress = editedEmailAddress;
				sendUpdate = true;
			}

			if (sendUpdate) {
				console.log('update email!!', editedEmailAddress)
				// const token = await SInfo.getItem('token', {});
				// const userInfo = Tranxactor.updateUserDetails(id, token, updatedData)
				// // console.log('userInfo', userInfo);
				// this.props.updateProfile(userInfo.data);

				// this.props.openNotification({
				// 	title: 'Success',
				// 	subtitle: 'Account have been updated',
				// 	buttonTwoAction: 'close'
				// });
			}
		}

		this.setState({
			...this.state,
			editable: editable ? false : true
		});
	}

	renderContactDetails() {
		const {
			heading,
			headingText,
			bodyText,
			borderTop,
			borderBottom,
			textSection,
			underlineTransparent
		} = styles;

		const {
			email,
			phone
		} = this.props;

		return (
			<View style={[p20, pb10, pt10]}>
				<View style={[heading, borderBottom, pb10, mb20]}>
					<Text style={[headingText]}>Contact details</Text>
				</View>
				<View style={[textSection, underlineTransparent]}>
					<Text style={{
						...Fonts.fUtility,
						fontSize: 12,
						marginBottom: 8
					}}>Email</Text>
					<Text style={[bodyText]}>{ email ? email : 'Email' }</Text>
				</View>
				<View style={[textSection, underlineTransparent]}>
					<Text style={{
						...Fonts.fUtility,
						fontSize: 12,
						marginBottom: 8
					}}>Password</Text>
					<Text style={[bodyText]}>********</Text>
				</View>
				<View style={[textSection, underlineTransparent]}>
					<Text style={{
						...Fonts.fUtility,
						fontSize: 12,
						marginBottom: 8
					}}>Mobile</Text>
					<Text style={[bodyText]}>{ phone ? phone : 'Mobile'}</Text>
				</View>
			</View>
		);
	}

	renderContactDetailsEditable() {
		const {
			heading,
			headingText,
			bodyText,
			borderTop,
			borderBottom,
			underline,
			textSection,
			underlineVerified,
			underlineUnverified,
			textInput
		} = styles;

		const placeholderTextColor = this.props.placeholderTextColor ?
			this.props.placeholderTextColor :
			Colours.cGrey;

		const textInputColor = {
			color: this.props.alt ? Colours.cWhite : Colours.cBlack
		}
		
		const underlineColor = {
			borderBottomColor: this.props.underlineColor ? 
					this.props.underlineColor :
					Colours.cWhite
		}

		const isFocused = this.state.focused ?
			underlineColor :
			null;

		const action = this.props.onChangeText ? 
			(text) => this.props.onChangeText(text) :
			(text) => {
				this.setState({
					editedEmailAddress: text
				});
			}

		const {
			email,
			phone,
			editPassword,
			editPhone
		} = this.props;
		
		return (
			<View style={[p20, pb10, pt10]}>
				<View style={[heading, borderBottom, pb10, mb20]}>
					<Text style={[headingText]}>Contact details</Text>
				</View>
				{/*
					THE FOLLOWING SHOULD BE REFACTORED
				*/}
				<View style={[underline, textSection]}>
					<Text style={{
						...Fonts.fUtility,
						fontSize: 12,
						marginBottom: 8
					}}>Email</Text>
					<TextInput
						editable={false}
						placeholderTextColor={placeholderTextColor}
						style={[bodyText]}
						onChangeText={action}
						placeholder={email}
						keyboardType={'email-address'}
						autoCapitalize={'none'}
						onFocus={() => {
							this.setState({
								...this.state,
								focused: true
							});
							if (this.props.onFocus) this.props.onFocus();
						}}
						onBlur={() => {
							this.setState({
								...this.state,
								focused: false
							});
							if (this.props.onBlur) this.props.onBlur();
						}}
					/>
				</View>
				<View style={[underline, textSection]}>
					<Text style={{
						...Fonts.fUtility,
						fontSize: 12,
						marginBottom: 8
					}}>Password</Text>
					<Button
						action={() => editPassword()}
						>
						<Text style={[bodyText]}>********</Text>
					</Button>
				</View>
				<View style={[underline, textSection]}>
					<Text style={{
						...Fonts.fUtility,
						fontSize: 12,
						marginBottom: 8
					}}>Mobile</Text>
					<Button
						action={() => {
							console.log('Uncomment editPhone func when ready to update.');
							// editPhone()
						}}
						>
						<Text style={[bodyText]}>{ phone ? phone : 'Mobile'}</Text>
					</Button>
				</View>
			</View>
		);
	}

	render() {
		const {
			textStyle,
			initStyle,
			flexCenter,
			activeTabStyle,
			activeTabTextStyle,
			tabStyle,
			tabTextStyle,
			tabsContainerStyle,
			heading,
			headingText,
			bodyText,
			borderTop,
			borderBottom,
			deleteText
		} = styles;

		const { editable } = this.state;
		const { deleteAccount, logoutAction } = this.props;
		// disable editing contact details for now
		return (
			<ScrollView>
				<View style={ [initStyle] }>
					{
						editable ?
						this.renderContactDetailsEditable() :
						this.renderContactDetails()
					}
					<View style={{
						marginBottom: 20
					}}>
						<View style={[heading, borderTop]}>
							<Button action={() => console.log('Some contact preference here')}>
								<Text style={[bodyText, p10, pl20, pr20]}>Contact preferences</Text>
							</Button>
						</View>
						<View style={[heading, borderTop]}>
							<Button action={() => logoutAction()}>
								<Text style={[bodyText, p10, pl20, pr20]}>Logout</Text>
							</Button>
						</View>
						<View style={[heading, borderTop]}>
							<Button action={() => deleteAccount()}>
								<Text style={[bodyText, p10, pl20, pr20, deleteText]}>Delete account</Text>
							</Button>
						</View>
					</View>
					<View style={{
						justifyContent: 'flex-end'
					}}>
						<Button
							action={this.updateEditable}
							style={{
								width: '100%',
								height: 50,
								backgroundColor: editable ? Colours.cGreen : Colours.cPrimary,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{
								...Fonts.fHeadingSmall,
								color: Colours.cWhite,
								textAlign: 'center'
							}}>{editable ? 'Save' : 'Edit Details'}</Text>
						</Button>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		backgroundColor: Colours.cWhite,
		minHeight: '100%',
		paddingTop: 10
	},
	tabsContainerStyle: {
		borderColor: Colours.cWhite,
		borderWidth: 0
	},
	tabStyle: {
		backgroundColor: Colours.cWhite,
		borderWidth: 0
	},
	tabTextStyle: {
		color: Colours.cBlack,
	},
	activeTabStyle: {
		backgroundColor: Colours.cWhite,
		borderBottomColor: Colours.cPrimary,
		borderWidth: 0,
		borderBottomWidth: 4
	},
	activeTabTextStyle: {
		color: Colours.cBlack,
	},
	heading: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	borderTop: {
		borderTopWidth: 0.5,
		borderTopColor: Colours.cLightGrey
	},
	borderBottom: {
		borderBottomWidth: 0.5,
		borderBottomColor: Colours.cLightGrey,
		marginBottom: 0.5
	},
	headingText: {
		...Fonts.fUtility,
		color: Colours.cGrey,
		fontSize: 12
	},
	bodyText: {
		...Fonts.fUtility,
		color: Colours.cBlack,
		fontSize: 14
	},
	deleteText: {
		color: Colours.cRed
	},
	underline: {
		borderBottomWidth: 0.5,
		borderBottomColor: Colours.cLightGrey,
	},
	underlineTransparent: {
		borderBottomWidth: 0.5,
		borderBottomColor: Colours.cTransparent,
	},
	underlineVerified: {
		borderBottomWidth: 0.5,
		borderBottomColor: Colours.cGreen,
	},
	underlineUnverified: {
		borderBottomWidth: 0.5,
		borderBottomColor: Colours.cPrimary,
	},
	textSection: {
		paddingBottom: 6,
		marginBottom: 20
	},
	textInput: {
		height: 40, 
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: Colours.cOffWhite
	}
};

export default AccountSettings;
