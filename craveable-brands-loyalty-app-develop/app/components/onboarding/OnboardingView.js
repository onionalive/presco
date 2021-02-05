import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, PushNotificationIOS, Platform } from 'react-native';
import axios from 'axios';
import SwiperContainer from 'app/components/swipercontainer/SwiperContainer';
import { NavigationActions } from 'react-navigation';
import SInfo from 'react-native-sensitive-info';
import Camera from 'app/components/common/Camera';
import QRCodeScreen from 'app/components/common/QRCodeScreen';
import Dimensions from 'Dimensions';

/* user imports */
import Button from 'app/components/common/Button';
import Notification from 'app/components/common/Notification';

class Onboarding extends Component {
	/**
	 * Benefits stack state should eventually be decoupled
	 * with FireStore.
	 */
	state = {
		selectedIndex: 0,
		benefitsStack: [
			{
				subTitle: 'Monotonectally simplify enabled models with 24/365 sources.'
			},
			{
				subTitle: 'Monotonectally simplify enabled models with 24/365 sources.'
			},
			{
				subTitle: 'Monotonectally simplify enabled models with 24/365 sources.'
			},
			{
				subTitle: 'Monotonectally simplify enabled models with 24/365 sources.'
			},
			{
				subTitle: 'Monotonectally simplify enabled models with 24/365 sources.'
			}
		],
		name: 'Testing'
	};

	dismiss = () => {
		const {navigation, appNav} = this.props;

		// Note: this is hacky. Given current UX flow the init second last route
		// will only be login nav the first and only time onboarding shows.
		appNav.routes[appNav.routes.length - 2].routeName === 'LoginNav'  ?
			navigation.navigate('Main') :
			navigation.goBack(null);
	}

	/**
	 * Use this to handle index changes and when to request for
	 * push notifications, camera notifications, locations notifications etc.
	 * @param {*} index Swiper index
	 */
	onIndexChanged(index) {
		if (index === 3) {
			PushNotificationIOS.requestPermissions();
		}
		this.setState({
			...this.state,
			selectedIndex: index,
		});
	}

	moveBack = () => {
		this.refs.OnboardingSwiper.scrollBy(-1);
	}

	moveForward = () => {
		this.refs.OnboardingSwiper.scrollBy(1);
	}

	// componentDidMount() {
	// 	SInfo.setItem('key2', 'value2', {});
	// }

	// componentDidUpdate() {
	// 	SInfo.getAllItems('key2').then(values => {
	// 		console.log(values) //value1, value2
	// 	});
	// }

	render() {
		const {
			textStyle,
			initStyle,
			flexCenter,
			swiperStyle
		} = styles;
	const {slides, button } = this.props.stackCopy;

		return (
			<View style={{
				backgroundColor: Colours.cOffBlack,
				flex: 1,
				alignItems: 'center'
			}}>
				<View style={{
					position: 'absolute',
					top: 20,
					width: '100%'
				}}>
					<SwiperContainer
						onboarding
						dotsAlt
						slides={slides}
						navigation={this.props.navigation}
						ref='OnboardingSwiper'
					/>
				</View>
				<View style={{
					position: 'absolute',
					bottom: 20,
					width: '100%'
				}}>
					<Button action={this.dismiss}
						style={buttonStyles.button}
						underlayColor={Colours.cPrimaryUnderlay}>
						<Text style={buttonStyles.text}>{button}</Text>
					</Button>
				</View>
			</View>
		);
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
};

const width = Dimensions.get('window').width;
let buttonWidth;
if (width > 370) {
	buttonWidth = 300;
} else {
	buttonWidth = 280;
}

const buttonStyles = {
	button: {
		backgroundColor: Colours.cPrimary,
		padding: 12,
		paddingLeft: 18,
		paddingRight: 18,
		paddingBottom: Platform.OS === 'android' ? 36 : 12,
		height: 40,
		width: buttonWidth,
		alignItems: 'center',
		margin: 20,
		alignSelf: 'center'
	},
	text: {
		...Fonts.fPrimary,
		color: Colours.cWhite,
		fontSize: 14
	}
};

export default Onboarding;
