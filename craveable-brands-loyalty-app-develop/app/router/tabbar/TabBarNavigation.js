/**
 * Navigation configuration
 */

import { TabNavigator, TabBarBottom } from 'react-navigation';
import React from 'react';
import { Image } from 'react-native';

import TabOneNavigation from 'app/components/home/Home';
import TabTwoNavigation from '../../components/profile/Profile';
import TabThreeNavigation from '../../components/offers/Offers';
// import TabFourNavigation from '../../components/more/More';

// Tab-Navigators
// import TabOneNavigation from '../tabone/TabOneNavigation';
// import TabTwoNavigation from '../tabtwo/TabTwoNavigation';
// import TabThreeNavigation from '../tabthree/TabThreeNavigation';
import TabFourNavigation from '../tabfour/TabFourNavigation';

import Images from 'app/img/Image';
const { homeIcon, homeActiveIcon, profileIcon, profileActiveIcon, offersIcon, offersActiveIcon, offersNewIcon, moreIcon, moreActiveIcon } = Images;
import Colours from 'app/styles/Colours';

const routeConfiguration = {
  Home: {
  	screen: TabOneNavigation,
	navigationOptions: {
		tabBarIcon: obj => {
				const image = obj.focused ? homeActiveIcon : homeIcon;
				return (
					<Image style={{ width: 24, height: 24 }} source={image}/>
				)
		},
	}
  },
  Profile: {
  	screen: TabTwoNavigation,
  	navigationOptions: {
		tabBarIcon: obj => {
				const image = obj.focused ? profileActiveIcon : profileIcon;
				return (
					<Image style={{ width: 24, height: 24 }} source={image}/>
				)
		},
	}
  },
  Offers: {
  	screen: TabThreeNavigation,
  	navigationOptions: ({navigation, screenProps}) => {
			return ({
				tabBarIcon: (obj) => {
					const notif = screenProps.offerNotification;
					const inactiveImage = notif ? offersNewIcon : offersIcon;
					const image = obj.focused ? offersActiveIcon : inactiveImage;
					return (
						<Image style={{ width: 24, height: 24 }} source={image}/>
					)
				}
			})
		}
  },
  More: {
  	screen: TabFourNavigation,
  	navigationOptions: {
		tabBarIcon: obj => {
				const image = obj.focused ? moreActiveIcon : moreIcon;
				return (
					<Image style={{ width: 24, height: 24 }} source={image}/>
				)
		},
	}
  },
}
const tabBarConfiguration = {
	//...other configs
	initialRouteName: 'Home',
	tabBarOptions:{
	// tint color is passed to text and icons (if enabled) on the tab bar
		activeTintColor: Colours.cPrimary,
		inactiveTintColor: Colours.cWhite,
		// background color is for the tab component
		activeBackgroundColor: Colours.cOffBlack,
			inactiveBackgroundColor: Colours.cOffBlack,
			style: {
				backgroundColor: Colours.cOffBlack
			}
	},
	swipeEnabled: true,
	showIcon: true,
	animationEnabled: true,
	tabBarPosition: 'bottom',
	tabBarComponent: TabBarBottom
}
export default TabNavigator(routeConfiguration,tabBarConfiguration);
