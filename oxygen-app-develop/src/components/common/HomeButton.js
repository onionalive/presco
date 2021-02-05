import React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import Colours from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import {Actions} from 'react-native-router-flux';
  
export default HeaderRight = () => {

	const { textStyle, initStyle, image } = styles;
	const { flexCenter } = Layout;

	return (
		<View>
			<TouchableHighlight 
				onPress={() => Actions.home({type: "reset"})}
				underlayColor='rgba(0,0,0,0)'
			>
				<Image 
				source={require('../../img/home-button.png')}
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
	image: {
		position: 'absolute',
		top: 14,
		right: 32,
		width: 26,
		height: 29,
	}
};
