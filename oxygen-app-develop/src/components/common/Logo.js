import React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import Colours from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import {Actions} from 'react-native-router-flux';
  
export default HeaderLeft = () => {

	const { textStyle, initStyle, headerLogo } = styles;
	const { flexCenter } = Layout;

	return (
		<View>
			<TouchableHighlight 
				onPress={() => Actions.home({type: "reset"})}
				underlayColor='rgba(0,0,0,0)'
			>
				<Image 
				style={headerLogo}
				source={require('../../img/oxygen_logo.png')}
				/>
			</TouchableHighlight>
		</View>
	);
};

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		height: 100
	},
	headerLogo: {
		width: 111,
		height: 27,
 	},
};
