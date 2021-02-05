import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';
import Colours from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

class ExtraRepaymentsPathwayView extends Component {

	state = { exampleState: [] };

	componentWillMount() {
		axios.get('https://rallycoding.herokuapp.com/api/music_albums')
			.then(response => this.setState({ exampleState: response.data }));
	}
  
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

export default ExtraRepaymentsPathwayView;
