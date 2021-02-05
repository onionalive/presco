import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, ScrollView, SafeAreaView, Image, AsyncStorage } from 'react-native';
import { Styles } from './Home.styles';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import SwiperContainer from 'app/components/swipercontainer/SwiperContainer';
import Tranxactor from 'app/common/Tranxactor';
import Header from 'app/components/common/Header';
import LoyaltyCard from 'app/components/loyaltycard/LoyaltyCard';
import ProgressBar from 'app/components/common/ProgressBar';
import TierIndicator from 'app/components/tierindicator/TierIndicator';
import Button from 'app/components/common/Button';
import Landscape from 'app/components/landscape/Landscape';
import PushNotification from 'react-native-push-notification';
import QrCodeView from 'app/components/common/QrCodeView';
import Background from 'app/img/header.png';
import Dimensions from 'Dimensions'; 
import Direction from 'app/common/Direction';
import SInfo from 'react-native-sensitive-info';
import last from 'lodash/last'

const direction = new Direction();

const { initTest } = Tranxactor;
const LANDSCAPE       			= 'LANDSCAPE'; 
const PORTRAIT         			= 'PORTRAIT'; 
const PORTRAITUPSIDEDOWN  		= 'PORTRAITUPSIDEDOWN'; 
const UNKNOWN        			= 'UNKNOWN'; 

import { addNavigationHelpers, NavigationActions } from 'react-navigation';

/* user imports */
class Home extends Component {
	state = {
		onlineButtonPy: 0,
		rotate: true,
		show: false,
		lastPress: 0,
		showBack: false,
		showBack: false, 
		orientation: null 
	};

	/**
	 * Measure the offsets and position of the
	 * 'Order Online' button for each device.
	 * @param {*} e Event object
	 */
	findOffest(e) {
		const onlineButton = this.nodeOne;
		onlineButton.measure( (fx, fy, width, height, px, py) => {
			this.setState({
				...this.state,
				oninleButtonPy: py + height
			});
		});
	}

	/**
	 * Handle local notifications
	 * Refer to the following repo for more info
	 * https://github.com/zo0r/react-native-push-notification
	 */
	openNotification = () => {
		PushNotification.localNotification({
			/* Android Only Properties */
			// tag: 'some_tag', // (optional) add tag to message

			// /* iOS only properties */
			userInfo: { 
				type: 'BOTTOM',
				view: 'TWO',
			}, // (optional) default: null

			/* iOS and Android properties */
			title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
			message: "My Notification Message", // (required)
			playSound: false, 
			soundName: 'default', 
		});
	}

	/**
	 * Open order now link
	 * - This needs to be updated to the favourite store link
	 */
	orderNow = () => {
		direction.launchUrl('https://www.oporto.com.au');
	}

	/**
	 * On a scroll, determine whether or not the view
	 * is passed the delta y value on the ScrollView
	 * that requires us to show an absolute 'Order
	 * online' button.
	 * @param {*} e Scroll event object
	 */
	onScroll(e) {
		const offset = e.nativeEvent.contentOffset.y;

		if (offset > this.state.onlineButtonPy) {
			// console.log('Show online button now');
		} else {
			// console.log('Hide button');
		}
	}

	/**
	 * Handle when the primary card at the top of the HomeView
	 * component is tapped. Use delta to determine whether or
	 * not the tap is singular or double.
	 */
	cardTap() {
		const delta = new Date().getTime() - this.state.lastPress;
		let updateShowBack = this.state.showBack;

		if (delta < 200) {
			// double tap happend
			updateShowBack = this.state.showBack ? false : true;
		}

		this.setState({
			...this.state,
			showBack: updateShowBack,
			lastPress: new Date().getTime()
		});
	}

	async componentDidMount() {
		try {
			const token = await SInfo.getItem('token', {});
			const userId = await AsyncStorage.getItem('userId');
			if(token && userId) {
				this.props.updateStores();
				this.props.getOffersActive(userId, token);
				this.props.getOffersExpired(userId, token);
				this.props.getLoyaltyCards(userId, token);
			}
	    } catch (err) {
	      console.log(err)
	    }
	}

	onLayout = (e) => {
		const {width, height} = Dimensions.get('window');
		const { dispatch, navigation, onboardingState, appNav } = this.props; 
		const showsLandscape = appNav.routes.filter(route => route.routeName === 'LandscapeNav'); 
		const last_route = last(appNav.routes)
		// console.log(last_route)
		if (width < height && showsLandscape.length && last_route.routeName !== 'Main') {
			navigation.dispatch(
				NavigationActions.back({key: null})
			);
		} else if (width > height && last_route.routeName !== 'LandscapeNav') {
			navigation.navigate('LandscapeNav');
		}
	}

	render() {
		const {
			textStyle,
			flexCenter,
			initStyle,
			orderOnlineView,
			orderOnlineButtonView,
			orderOnlineButton,
			backgroundImageStyle
		} = styles;
		const { showBack } = this.state;
		const { navigation, firstName, lastName, loyaltyBalance, promotions, loyaltyStatus, primaryCardID } = this.props;
		const { scanHelp, tierHelp, headingPromotions, headingOffers } = this.props.copy;
		const orderButton = this.props.copy.orderButton ? this.props.copy.orderButton.toUpperCase() : "ORDER ONLINE";

		// console.log('HOME PROPS', this.props);

		return (
			<SafeAreaView
				onLayout={this.onLayout}
			>
				<Header 
					action={() => this.props.navigation.navigate('ModalTransactionsNav')}
					statusAction={() => this.props.navigation.navigate('LoyaltyStatusNav')}
					firstName={firstName}
					loyaltyBalance={loyaltyBalance}
					loyaltyStatus={loyaltyStatus}
				/>
				<ScrollView
					style={Styles.scrollView}
					scrollEventThrottle={800}
					onScroll={(e) => this.onScroll(e)}
				>
					<View style={ [initStyle, flexCenter] }>
						<View style={{backgroundColor: Colours.cBlack}}>
							<Button
								action={() => this.props.navigation.navigate('ModalCardDetailsNav')}
								underlayColor={Colours.cNearlyBlackUnderlay}
							>
								<QrCodeView 
									size={170}
									value={primaryCardID}
								/>
							</Button>
						</View>
						<View style={orderOnlineView}
							ref={node => this.nodeOne = node}
							onLayout={(event) => this.findOffest(event)}>
							<Image style={backgroundImageStyle} source={Background} />
							<Button action={this.orderNow}>
								<View style={orderOnlineButtonView}>
									<Text style={orderOnlineButton}>{ orderButton }</Text>
								</View>
							</Button>
						</View>
						<SwiperContainer
							alt
							offer
							navigation={this.props.navigation}
							title={headingOffers}
							ref='OfferSwiper'
							navigationAction={() => {
								// need to update this to new designs
								this.props.navigation.navigate('Offers');
							}}
						/>
						<SwiperContainer
							alt
							promo
							navigation={this.props.navigation}
							ref='PromotionsSwiper'
							slides={promotions}
							title={headingPromotions}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		flex: 1,
		backgroundColor: Colours.cWhite,
		// marginBottom: 20
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	orderOnlineView: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colours.cBlack,
		width: '100%',
		height: 50
	},
	orderOnlineButtonView: {
		backgroundColor: Colours.cPrimary,
		paddingVertical: 6,
		paddingLeft: 18,
		paddingRight: 18,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: Colours.cPrimary,
		minWidth: 140,
		alignSelf: 'center'
	},
	orderOnlineButton: {
		color: Colours.cWhite,
		...Fonts.fHeadingSmall,
		fontSize: 12,
		textAlign: 'center'
	},
	backgroundImageStyle: {
		flex: 1,
		resizeMode: 'cover',
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center'
	}
};

export default Home;
