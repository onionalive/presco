import Colours from 'app/styles/Colours';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';
import { StyleSheet } from 'react-native';

export const Styles = {
		textStyle: {
		fontSize: 20
	},
	modalMargin: {
		marginTop: ifIphoneX ? 20 : 0,
		backgroundColor: Colours.cOffBlack
	},
	initStyle: {
		flex: 1
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	headingTextStyle: {
		color: Colours.cWhite,
		...Fonts.fHeadingMedium,
		backgroundColor: 'transparent',
		marginLeft: 5,
		marginRight: 5,
		// marginTop: ifIphoneX ? 20 : 0,
		fontSize: 24,
		letterSpacing: 0.1
	},
	promoHeadingTextStyle: {
		fontSize: 28,
		letterSpacing: 0.2
	},
	headingStyle: {
		position: 'absolute',
		bottom: 0,
		backgroundColor: Colours.cOffBlack,
		height: 80,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	promoHeadingStyle: {
		paddingHorizontal: 40,
		position: 'absolute',
		top: 60,
		backgroundColor: 'transparent',
	},
	headerStyle: {
		backgroundColor: Colours.cOffBlack,
		height: 300,
		width: '100%',
		elevation: 2,
		zIndex: 10,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative'
	},
	promoHeaderStyle: {
		height: 380
	},
	imageStyle: {
		backgroundColor: Colours.cBlack,
		flex: 1,
		resizeMode: 'cover',
		width: '100%',
		height: '100%',
		justifyContent: 'center'
	},
	imageOverlayStyle: {
		flex: 1,
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0
	},
	overlayStyle: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.3)'
	},
	lowerHeading: {
		flexDirection: 'row'
	},
	subheadingStyle: {
		color: Colours.cOffWhite
	},
	borderStyle: {
		width: '100%',
		backgroundColor: Colours.cLightGrey,
		height: 1,
		marginBottom: 20
	},
	bodyTextStyle: {
		...Fonts.fBodyText,
		color: Colours.cOffBlack,
		lineHeight: 22.4
	},
	utilityTextStyle: {
		...Fonts.fUtility,
		lineHeight: 16.8,
		color: Colours.cGrey
	},
	boldText: {
		...Fonts.fUtilityBold,
		fontSize: 12,
		color: Colours.cOffBlack
	},
	termsText: {
		color: Colours.cWhite,
		textAlign: 'center',
		...Fonts.fUtility,
		fontSize: 14,
		lineHeight: 20
	},
	termsHeading: {
		...Fonts.fUtilityBold,
		fontSize: 14,
		lineHeight: 20,
		textDecorationLine: 'underline'
	},
	centreText: {
		textAlign: 'center'
	},
	backgroundWhite: {
		backgroundColor: Colours.cWhite
	},
	backgroundOffWhite: {
		backgroundColor: Colours.cOffWhite
	},
	backgroundGrey: {
		backgroundColor: Colours.cGrey
	},
	backgroundOffBlack: {
		backgroundColor: Colours.cOffBlack
	},
	paddingStyle: {
		paddingVertical: 25,
		paddingHorizontal: 32
	},
	rowWrapperStyle: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center'
	}
};