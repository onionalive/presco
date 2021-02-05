import React from 'react';
import { Text, View, TouchableHighlight, Image, Linking } from 'react-native';
import Colours from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import {Actions} from 'react-native-router-flux';
  
const ShareContainer = (props) => {

	const { container, shareIcon, tick } = styles;
	const { flexCenter } = Layout;

	const { prev, subject } = props;

	// email data
	const emailBody = props.emailBody;
	const emailUrl = `mailto: email@email.com?subject=${subject}&body=${emailBody}`;

	return (
		<View style={container}>
			<TouchableHighlight 
				onPress={prev} 
				underlayColor='rgba(0,0,0,0)'>
					<Image
					style={[shareIcon]}
					source={require('../../img/arrow-return.png')}
					/>
			</TouchableHighlight>
		</View>
	);
};

export default ShareContainer;

const styles = {
	container: {
		flex: 1,
		marginTop: 10,
		zIndex: 10
	},
	shareIcon: {
		position: 'absolute',
		top: 0,
		left: 20,
		width: 33, 
		height: 32,
	},
	tick: {
		position: 'absolute',
		top: 0,
		right: 20,
	}
};
