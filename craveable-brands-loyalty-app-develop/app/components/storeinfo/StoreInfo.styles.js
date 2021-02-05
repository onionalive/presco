import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
const mainStyles = {
	iconTextfix: {
		marginLeft: (Platform.OS === 'ios' ? -10 : 0)
	},
	textStyle: {
		fontSize: 20
	},
	iconStyle: {
		width: 25,
		height: 25
	},
	iconText: {
		...Fonts.fBodyText,
		color: Colours.cOffBlack,
		fontSize: 10,
		marginTop: 10,
		marginBottom: 10
	},
	modalMargin: {
		marginTop: ifIphoneX ? 20 : 0,
		backgroundColor: Colours.cWhite
	},
	infoContent: {
		width: '100%',
		backgroundColor: Colours.cLightGrey,
	},
	topIconContent:{
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: Colours.cWhite,
		width: '100%',
		// height: 50
	},
	flexCenter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	initStyle: {
		flex: 1
	},
	flexContent: {
		flex: 1,
		alignItems: 'flex-start',
    	justifyContent: 'flex-start',
   		flexDirection: 'column',
	},
	headingTextStyle: {
		color: Colours.cWhite,
		...Fonts.fHeadingMedium,
		backgroundColor: 'transparent',
		marginLeft: 5,
		marginRight: 5,
		// marginTop: ifIphoneX ? 20 : 0,
		fontSize: 24
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
	headerStyle: {
		backgroundColor: Colours.cOffBlack,
		height: 260,
		width: '100%',
		elevation: 2,
		zIndex: 10,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative'
	},
	lowerHeading: {
		flexDirection: 'row'
	},
	subheadingStyle: {
		color: Colours.cOffWhite
	},
	boldText: {
		marginBottom: 10,
		...Fonts.fUtilityBold,
		// lineHeight: 24,
		fontSize: 16,
		color: Colours.cOffBlack
	},
	borderStyle: {
		width: '100%',
		backgroundColor: Colours.cLightGrey,
		height: 1,
		marginBottom: 20
	},
	bodyTextStyle: {
		marginRight: 10,
		marginBottom: 10,
		...Fonts.fBodyText,
		fontSize: 14,
		color: Colours.cOffBlack,
		// lineHeight: 18
	},
	utilityTextStyle: {
		...Fonts.fUtility,
		lineHeight: 16.8,
		color: Colours.cGrey
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
	paddingStyle: {
		paddingVertical: 25,
		paddingHorizontal: 32
	}
};

export default mainStyles;