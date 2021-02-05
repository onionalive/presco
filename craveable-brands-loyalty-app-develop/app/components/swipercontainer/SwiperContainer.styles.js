import Dimensions from 'Dimensions';
import Colours from 'app/styles/Colours';

export default mainStyles = {
	container: {
		backgroundColor: Colours.cBlack,
		height: 300
	},
	item: {
		height: 180,
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		backgroundColor: Colours.cBlack
	},
	header: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '90%',
	},
	headerUnderline: {
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '90%',
		borderBottomWidth: 1,
		borderBottomColor: Colours.cLightGrey
	},
	textStyle: {
		...Fonts.fUtility,
		fontSize: 16,
		color: Colours.cOffBlack,
		lineHeight: 20,
		letterSpacing: 0.1
	},
	loyaltyHeading: {
		...Fonts.fUtility,
		fontSize: 12
	},
	linkStyle: {
		...Fonts.fUtility,
		color: Colours.cGrey,
		lineHeight: 16.8,
		letterSpacing: 0.1
	},
	container: {
		width: '100%',
		minHeight: 300,
		position: 'relative'
	},
	containerAlt: {
		backgroundColor: Colours.cOffWhite,
		height: 340
	},
	containerAltWhite: {
		backgroundColor: Colours.cWhite
	},
	swiperContainer: {
		marginLeft: 20,
		marginRight: 20,
	},
	flexCenter: {
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	swiperStyle: {
		height: 220
	},
	signupStylesSmall: {
		height: 500,
		alignItems: 'center'
	},
		signupStyles: {
		height: 520,
		alignItems: 'center'
	},
		signupItemSmall: {
		height: 385,
		width: 280,
		backgroundColor: Colours.cOffWhite,
		padding: 40,
		alignSelf: 'center',
		alignItems: 'center'
	},
	signupItem: {
		height: 417,
		width: 300,
		backgroundColor: Colours.cOffWhite,
		padding: 40,
		alignSelf: 'center',
		alignItems: 'center'
	},
	swiperDots: {
		flexDirection: 'row',
		position: 'absolute',
		bottom: 20
	},
	signupDots: {
		bottom: 45
	},
	onboardDots: {
		bottom: 40
	},
	cardItem: {
		paddingTop: 20
	},
	onboardingStylesSmall: {
		height: 500,
		alignItems: 'center'
	},
	onboardingStyles: {
		height: 520,
		alignItems: 'center'
	},
	onboardItemSmall: {
		backgroundColor: Colours.cOffWhite,
		width: 280,
		height: 390,
		alignItems: 'center',
		padding: 40,
		alignSelf: 'center'
	},
	onboardItem: {
		backgroundColor: Colours.cOffWhite,
		width: 300,
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
