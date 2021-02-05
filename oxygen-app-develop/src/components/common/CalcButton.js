import React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import { Oxygen } from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import {Actions} from 'react-native-router-flux';
import Dimensions from 'Dimensions';
  
export default CalcButton = (props) => {

	const { textStyle, margin } = styles;
	const { flexCenter } = Layout;

	return (
		<View style={ [flexCenter, {height: props.height}] }>
			<TouchableHighlight style={flexCenter} underlayColor='rgba(0,0,0,0)' onPress={props.action}>
				<View style={[props.buttonStyle, margin]}>
					<Text style={[textStyle, props.buttonTextColour]}>{props.text}</Text>
				</View>
			</TouchableHighlight>
		</View>
	);
};

const styles = {
	textStyle: {
		fontSize: 40,
		fontWeight: 'bold',
		textAlign: 'center',
		fontFamily: 'ProximaNova-Bold'
	},
	margin: {
		marginLeft: 3,
		marginRight: 3,
		marginTop: 9,
	},
};
