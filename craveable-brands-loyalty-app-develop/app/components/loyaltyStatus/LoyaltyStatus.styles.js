import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import { ifIphoneX } from 'react-native-iphone-x-helper';

export default mainStyles = {
	mainHeading: {
		...Fonts.fHeadingMedium,
		fontSize: 24,
		color: Colours.cWhite,
		marginBottom: 10
	},
	modalMargin: {
		marginTop: ifIphoneX ? 20 : 0,
		flex: 1,
		backgroundColor: Colours.cOffBlack
	},
	subheading: {
		...Fonts.fUtilityBold,
		color: Colours.cWhite,
		textAlign: 'center',
		marginBottom: 10
	},
	textStyle: {
		...Fonts.fUtility,
		color: Colours.cWhite,
		textAlign: 'center',
		lineHeight: 16
	},
	headerStyle: {
		backgroundColor: Colours.cOffBlack,
		height: 62,
		width: '100%',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 24,
		paddingBottom: 10,
		elevation: 2,
		zIndex: 10,
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	flexCenter: {
		justifyContent: 'space-around',
		flexDirection: 'column',
	},
};