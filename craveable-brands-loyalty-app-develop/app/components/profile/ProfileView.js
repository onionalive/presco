import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, AsyncStorage, Platform } from 'react-native';
import AccountSettings from '../accountsettings/AccountSettings';
import Header from '../common/Header';
import ProfileDetails from '../profiledetails/ProfileDetails';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import {Styles} from './Profile.styles';
import { Tranxactor } from 'app/common';
import Config from 'craveable-brands-loyalty-app/app.config';
import SInfo from 'react-native-sensitive-info';
import Dimensions from 'Dimensions'
import { NavigationActions, addNavigationHelpers } from 'react-navigation';
/* user imports */

class Profile extends Component {
	state = {
		selectedIndex: 0,
		profileDetailsHeight: 0,
		accountSettingsHeight: 0
	};

	/**
	 * Update state on swiper index changes
	 */
	handleIndexChange = (index) => {
		this.setState({
			...this.state,
			selectedIndex: index
		});
    }

	/**
	 * Handle swiper after moment ends on swipe
	 */
	onMomentumScrollEnd = (e, state, context) => {
		this.setState({
			...this.state,
			selectedIndex: context.state.index,
		});
	}

	/**
	 * Update state based on measure method elements
	 * @param {*} e Event object
	 */
	setProfileDetailsHeight(e) {
		const profileDetails = this.profileDetails;
		profileDetails.measure( (fx, fy, width, height, px, py) => {
			if (this.state.profileDetailsHeight === 0) {
				this.setState({
					...this.state,
					profileDetailsHeight: height
				});
			}
		});
	}

	/**
	 * Update state based on measure method elements
	 * @param {*} e Event object
	 */
	setAccountSettingsHeight(e) {
		const accountSettings = this.accountSettings;
		accountSettings.measure( (fx, fy, width, height, px, py) => {
			if (this.state.accountSettingsHeight === 0) {
				this.setState({
					...this.state,
					accountSettingsHeight: height
				});
			}
		});
	}

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
						action: buttonTwoAction ? buttonTwoAction : null
					}
				],
				footer: footer ? footer : 'Forget about it',
				view: view ? view : 'ONE'
			});
		} catch(err) {
			console.log(err);
		}
	}

	logout = async () => {
		const { goClearActions, screenProps, navigation, appNav } = this.props;
		await navigation.dispatch(
			NavigationActions.back({key: appNav.routes[1].key})
		);
		await goClearActions();
	}

	render() {
		// console.log('PROFILE VIEW', this.props);
		try {
			const swiperHeight = this.state.selectedIndex === 0 ?
				this.state.profileDetailsHeight :
				this.state.accountSettingsHeight;
			
			const {
				textStyle,
				initStyle,
				flexCenter,
				activeTabStyle,
				activeTabTextStyle,
				tabStyle,
				tabTextStyle,
				tabsContainerStyle
			} = styles;
			const { navigation, firstName, lastName, loyaltyBalance, loyaltyStatus, defaultFavouiratieStore } = this.props; 
			
			// fix favouiratieStore here, pass default one for now
			return (
				<SafeAreaView style={{flex: 1}}>				
					<Header action={() => navigation.navigate('ModalTransactionsNav')} 
						statusAction={() => navigation.navigate('LoyaltyStatusNav')}
						firstName={firstName}
						loyaltyBalance={loyaltyBalance}
						loyaltyStatus={loyaltyStatus}
					/>
					<SegmentedControlTab
						values={['Profile details', 'Account settings']}
						selectedIndex={this.state.selectedIndex}
						onTabPress={this.handleIndexChange}
						borderRadius={0}
						activeTabStyle={activeTabStyle}
						activeTabTextStyle={activeTabTextStyle}
						tabStyle={tabStyle}
						tabTextStyle={tabTextStyle}
						tabsContainerStyle={tabsContainerStyle}
						/>
					{
						this.state.selectedIndex === 0 ?
							<ProfileDetails
								navigation={navigation}
								favouiratieStore={null}
								openNotification={this.openNotification}
							/> :
							<AccountSettings
								logoutAction={() => this.logout()}
								editPassword={() => navigation.navigate('EditPasswordPathway')}
								editPhone={() => navigation.navigate('EditPhonePathway')}
								deleteAccount={() => navigation.navigate('ModalDeleteAccountNav')}
								openNotification={this.openNotification}
							/>
					}
				</SafeAreaView>
			);
		} catch(err) {
			console.log(err);
			return null;
		}
	}
}
//={this.props.screenProps}

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
	tabsContainerStyle: {
		borderColor: Colours.cWhite,
		borderWidth: 0
	},
	tabStyle: {
		backgroundColor: Colours.cWhite,
		borderWidth: 0,
		borderBottomColor: Colours.cLightGrey,
		borderBottomWidth: 1,
		minHeight: 40
	},
	tabTextStyle: {
		...Fonts.fUtility,
		fontSize: 14,
		color: Colours.cBlack,
	},
	activeTabStyle: {
		backgroundColor: Colours.cWhite,
		borderBottomColor: Colours.cPrimary,
		borderWidth: 0,
		borderBottomWidth: 1
	},
	activeTabTextStyle: {
		color: Colours.cBlack,
	}
};

export default Profile;
