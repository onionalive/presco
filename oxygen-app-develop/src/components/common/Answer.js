import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import Colours from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import {Actions} from 'react-native-router-flux';

import Dimensions from 'Dimensions';
  
class Answer extends Component {
	render() {
		const { button, font, notSelected } = styles;
		const { flexCenter } = Layout;
		const { text, action, selected } = this.props;

		return (
			<View>
				<TouchableHighlight
	            underlayColor='rgba(0,0,0,0)'
	            onPress={action}
	          >
	            <View style={[button, (selected) ? {} : notSelected]}>
	              <Text style={font}>{text}</Text>
	            </View>
	          </TouchableHighlight>
			</View>
		);
	}
};

export default Answer;

const styles = {
	button: {
		backgroundColor: '#76CA44',
		borderRadius: 4,
		width: Dimensions.get('window').width - 60,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		padding: 14,
	},
	notSelected: {
		opacity: 0.6,
	},
	font: {
		color: '#fff',
		fontSize: 24,
		textAlign: 'center',
		fontFamily: 'ProximaNova-Bold'
	},
};
