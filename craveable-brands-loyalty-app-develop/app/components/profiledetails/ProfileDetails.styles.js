import Dimensions from 'Dimensions';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';

export default styles = {
	container: {
		backgroundColor: '#000'
	},
		textStyle: {
		fontSize: 20
	},
	topRowContainer: {
		flexDirection: 'row',
	},
	topRow: {
		paddingLeft: 4,
		paddingRight: 4,
		width: '50%',
		position: 'relative'
	},
	initStyle: {
		backgroundColor: Colours.cWhite,
		paddingTop: 20,
		paddingBottom: 50
	},
	mapContainer: {
		backgroundColor: Colours.cOffWhite,
		marginLeft: 20,
		marginRight: 20
	},
	mapTitleContainer: {
		flexDirection: 'row',
		padding: 10,
		alignItems: 'center',
	},
	mapTitle: {
		...Fonts.fUtility,
		color: Colours.cOffBlack,
		fontSize: 16
	},
	store: {
		...Fonts.fButtonText,
		color: Colours.cOffBlack,
		fontSize: 16
	},
	storeDistance: {
		...Fonts.fUtility,
		color: Colours.cOffBlack,
		fontSize: 12
	},
	textInput: {
		height: 40, 
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: Colours.cOffWhite
	},
	textInputColor: {
		color: Colours.cBlack
	},
	textError: {
		color: Colours.cRed,
		marginTop: 8,
		marginBottom: 10,
		...Fonts.fUtility
	},
	fieldName: {
		...Fonts.fUtility,
		fontSize: 12
	},
	editButton: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0
	},
	editButtonText: {
		...Fonts.fHeadingSmall,
		color: Colours.cWhite,
		textAlign: 'center'
	}
};