import Dimensions from 'Dimensions';
import Colours from 'app/styles/Colours';

export default mainStyles = {
	item: {
		height: 180,
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		backgroundColor: Colours.cBlack
	},
	header: {
		marginTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	leftTextStyle: {
		marginLeft: 10,
		...Fonts.fUtility,
		fontSize: 10,
		color: Colours.cBlack
	},
	rightTextStyle: {
		...Fonts.fUtility,
		fontSize: 12,
		color: Colours.cGrey
	},
	textStyle: {
		...Fonts.fUtility,
		fontSize: 14,
		color: Colours.cGrey
	},
	containerAlt: {
		backgroundColor: Colours.cOffWhite
	},
	swiperContainer: {
		marginLeft: 20,
		marginRight: 20
	},
	container: {
		width: '100%',
		minHeight: 300,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative'
	},
	flexCenter: {
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	swiperStyle: {
		height: 220
	},
	signupStyles: {
		height: 520,
		paddingBottom: 30
	},
	signupItem: {
		height: 417,
		backgroundColor: Colours.cOffWhite,
		width: '100%',
		alignItems: 'center'
	},
	swiperDots: {
		flexDirection: 'row',
		position: 'absolute',
		bottom: 20
	},
	signupDots: {
		bottom: 0
	},
	cardItem: {
		paddingTop: 20,
	},
	onboardingStyles: {
		height: 520,
		alignItems: 'center'
	},
	onboardItem: {
		backgroundColor: Colours.cOffWhite,
		width: 320,
		height: 425,
		alignItems: 'center',
		padding: 40,
		alignSelf: 'center'
	},
	onboardHeading: {
		...Fonts.fHeadingMedium,
		textAlign: 'center',
		marginBottom: 10
	},
	onboardingText: {
		...Fonts.fBodyText,
		textAlign: 'center',
		lineHeight: 22.4
	},
};
