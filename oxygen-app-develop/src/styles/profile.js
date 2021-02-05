import { Oxygen } from './colours';
import Dimensions from 'Dimensions';

export const mainStyles = {
	container: {
		backgroundColor: Oxygen.blue
	},
	aboutContainer: {
		paddingLeft: 20,
		paddingRight: 20,
	},
	optionsContainer: {
		marginBottom: 20,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	parentContainer: {
		position: 'relative',
		paddingTop: 30,
		backgroundColor: Oxygen.blue
	},
	headingContainer: {
		alignItems: 'center',
		paddingTop: 10,
		marginBottom: 36,
	},
	imageStyles: {
		alignItems: 'center',
		width: 160, 
		height: 160, 
		borderRadius: 80,
		borderWidth: 3,
		borderColor: '#fff',
		zIndex: 2 
	},
	blueUnderline: {
		flexDirection: 'row',
		marginTop: 5,
		borderWidth: 1,
		borderColor: 'transparent',
		borderBottomColor: Oxygen.blue,
	},
	imageSquare: {
		height: 12,
		width: 12,
		marginTop: 3,
		resizeMode: 'contain',
		justifyContent: 'center',
	},
	inlineText: {
		marginLeft: 5,
		justifyContent: 'center',
	},
	profileInfo: {
		backgroundColor: Oxygen.white,
		marginTop: -90,
		paddingTop: 90,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
		borderRadius: 4,
	},
	callBtn: {
		justifyContent: 'center',
		marginRight: 30,
	},
	emailBtn: {
		justifyContent: 'center',
		marginLeft: 30,
	}
};

export const profileStyles = {
	container: {
		backgroundColor: Oxygen.blue
	},
	aboutContainer: {
		paddingLeft: 20,
		paddingRight: 20,
	},
	optionsContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	parentContainer: {
		position: 'relative',
		paddingTop: 30,
		backgroundColor: Oxygen.blue
	},
	headingContainer: {
		alignItems: 'center',
		paddingTop: 10,
		marginBottom: 10,
	},
	imageStyles: {
		alignItems: 'center',
		width: Dimensions.get('window').width / 3, 
		height: Dimensions.get('window').width  / 3, 
		borderRadius: Dimensions.get('window').width / 6,
		zIndex: 2 
	},
	btnImage: {
		width: 60, 
		height: 60, 
	},
	profileInfo: {
		backgroundColor: Oxygen.white,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
		borderRadius: 4,
	},
	callBtn: {
		justifyContent: 'center',
		marginRight: 30,
	},
	emailBtn: {
		justifyContent: 'center',
		marginLeft: 30,
	}
};

export const homeFontStyles = {
	textStyle: {
		fontSize: 20,
		fontFamily: 'ProximaNova-Regular'
	},
	name: {
		fontSize: 20,
		color: Oxygen.blue,
		fontFamily: 'ProximaNova-Bold'
	},
	description: {
		fontSize: 17,
		lineHeight: 20,
		color: Oxygen.grey
	},
	btnTitles: {
		textAlign: 'center',
		color: Oxygen.blue,
		fontFamily: 'ProximaNova-Semibold'
	}
}

export const fontStyles = {
	textStyle: {
		fontSize: 20,
		fontFamily: 'ProximaNova-Regular'
	},
	name: {
		fontSize: 36,
		color: Oxygen.blue,
		fontFamily: 'ProximaNova-Bold'
	},
	location: {
		fontSize: 20,
		fontStyle: 'italic',
		color: Oxygen.grey,
		fontFamily: 'ProximaNova-RegularIt',
		textAlign: 'center',
		paddingLeft: 10,
		paddingRight: 10
	},
	about: {
		fontSize: 28,
		color: Oxygen.blue,
		fontFamily: 'ProximaNova-Bold'
	},
	description: {
		fontSize: 17,
		lineHeight: 20,
		color: Oxygen.grey
	},
	favourite: {
		fontSize: 13,
		lineHeight: 20,
		color: Oxygen.blue,
		fontFamily: 'ProximaNova-Bold'
	},
	btnTitles: {
		textAlign: 'center',
		color: Oxygen.blue,
		fontFamily: 'ProximaNova-Semibold'
	}
}