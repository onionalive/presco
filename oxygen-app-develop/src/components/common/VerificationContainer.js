import React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import Colours from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import {Actions} from 'react-native-router-flux';
  
const VerificationContainer = (props) => {

	const { container, shareIcon, tickPos } = styles;
	const { flexCenter } = Layout;

	const { prev, next, tick } = props;

	const icon = props.tick ? require('../../img/tick-active.png') : require('../../img/tick-inactive.png');

	return (
		<View style={container}>
			<TouchableHighlight
				onPress={next}
				underlayColor='rgba(0,0,0,0)'
			>
				<Image
				  style={tickPos}
				  source={icon}
				/>
			</TouchableHighlight>
		</View>
	);
};

export default VerificationContainer;

const styles = {
	container: {
		height: 40,
		justifyContent: 'flex-end',
		flexDirection: 'row',
		paddingTop: 10
	},
};
