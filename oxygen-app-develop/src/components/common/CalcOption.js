import React from 'react';
import { Platform, Text, View, TouchableHighlight, Image } from 'react-native';
import Dimensions from 'Dimensions';
import { Oxygen } from '../../styles/colours';
import { DeviceHeight, DeviceWidth } from '../../styles/sizing';
import Layout from '../../styles/layout';

import {Actions} from 'react-native-router-flux';

const CalcOption = (props) => {

	const {
		imageContainer,
		imageContainerSmall,
		imageContainerNormal,
		mainText,
		mainTextSizeNormal,
		mainTextSizeSmall,
		mainButton,
		mainButtonSmall
	} = styles;

	const { flexCenter } = Layout;
	const currentHeight = Dimensions.get('window').height;

	let buttonStyles = mainButton;
	let fontSize;
	let imageContSize;

	switch (true) {
		case (currentHeight === DeviceHeight.iPad):
			buttonStyles = mainButtonSmall;
			fontSize = mainTextSizeSmall;
			imageContSize = imageContainerSmall;
			break;
		case (currentHeight >= DeviceHeight.iPhone7Plus):
			buttonStyles = mainButton;
			fontSize = mainTextSizeNormal;
			iimageContSize = imageContainerNormal;
			break;
		default:
			break;
	}

	return (
		<View style={[imageContainer, imageContSize]}>
			<TouchableHighlight
				underlayColor='rgba(0,0,0,0)'
				onPress={props.next}
			>
				<Image style={ buttonStyles } source={props.img} />
			</TouchableHighlight>
			<View style={{ alignItems: 'center', width: 160 }}>
				<Text style={[mainText, fontSize]}>{props.text}</Text>
			</View>
		</View>
	);
};

export default CalcOption;

const styles = {
	imageContainer: {
		flex: 1,
		height: Dimensions.get('window').height/6,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainerSmall: {
		height: Dimensions.get('window').height/6,
	},
	imageContainerNormal: {
		height: Platform.OS === 'android' ? Dimensions.get('window').height/6 : Dimensions.get('window').height/4,
	},
	mainText: {
		color: Oxygen.grey,
		marginTop: Platform.OS === 'android' ? Dimensions.get('window').height/120 : Dimensions.get('window').height/60,
		marginBottom: Dimensions.get('window').height/60,
		fontSize: 17,
		textAlign: 'center',
		fontFamily: 'ProximaNova-Bold'
	},
	mainTextSizeNormal: {
		fontSize: 17,
	},
	mainTextSizeSmall: {
		fontSize: 12,
	},
	mainButton: {
		width: 91,
		height: 94,
	},
	mainButtonSmall: {
		width: 71,
		height: 74,
	}
};
