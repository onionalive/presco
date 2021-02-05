import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';
import Colours from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import axios from 'axios';

class OtherIncomeView extends Component {

	state = { exampleState: [] };
	
	render() {

		const { textStyle, initStyle } = styles;
		const { flexCenter } = Layout;

		return (
			<View style={ [flexCenter, initStyle] }>
				<Text style={ textStyle }>Ready to roll!</Text>
			</View>
		);
	}
}

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		height: 100
	}
};

export default OtherIncomeView;
