import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import Colours from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import {Actions} from 'react-native-router-flux';

import Dimensions from 'Dimensions';
  
class PickerView extends Component {
	render() {
		const { button, font, notSelected } = styles;
		const { flexCenter } = Layout;
		const { text, action, selected, pickerFont } = this.props;

		return (
			<TouchableHighlight
			underlayColor='rgba(0,0,0,0)'
			onPress={action}
			style={this.props.styling}
			>
				<View style={[button, (selected) ? {} : notSelected]}>
					<Text style={pickerFont}>{text}</Text>
				</View>
			</TouchableHighlight>
		);
	}
};

export default PickerView;

const styles = {
	button: {
		backgroundColor: '#76CA44',
		borderRadius: 8,
		width: (Dimensions.get('window').width/3)-26,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 14
	},
	notSelected: {
		opacity: 0.6,
	},
};
