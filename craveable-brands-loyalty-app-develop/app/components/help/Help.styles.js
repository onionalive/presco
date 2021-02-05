import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';

export default mainStyles = {
	mainHeading: {
		...Fonts.fHeadingMedium,
		color: Colours.cWhite,
		marginBottom: 10
	},
	subheading: {
		...Fonts.fUtility,
		color: Colours.cWhite
	},
	headingContainer: {
		marginTop: 80,
		marginBottom: 40,
		alignItems: 'center'
	},
	buttonText: {
		color: Colours.cWhite,
		...Fonts.fUtility
	},
	initStyle: {
		backgroundColor: Colours.cOffBlack,
		padding: 20,
		flex: 1
	},
	flexCenter: {
		justifyContent: 'space-around',
		flexDirection: 'column',

	},
	buttonContainerView: {
		paddingBottom: 30
	},
	que: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 0.5,
		borderBottomColor: Colours.cGrey
	},
	ans: {
		padding: 15
	},
	button: {
        backgroundColor: Colours.cPrimary,
        padding: 12,
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: 4,
        minWidth: 180,
        alignItems: 'center',
        marginBottom: 10
    }
};