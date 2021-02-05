import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';
import axios from 'axios';
import Colours from 'app/styles/Colours';
import Layout from 'app/styles/Layout';
import Fonts from 'app/styles/Fonts';

/* user imports */

class TierIndicator extends Component {

	state = { exampleState: [] };

	render() {
		const { textStyle, initStyle, flexCenter } = styles;
		const { pl20 } = Layout;
		const { tierHelp } = this.props;

		return (
			<View style={ [flexCenter, initStyle] }>
				<Text style={ [pl20, textStyle] }>{tierHelp}</Text>
			</View>
		);
	}
}

const styles = {
	textStyle: {
		fontSize: 12,
		color: Colours.cOffWhite,
		...Fonts.fUtility
	},
	initStyle: {
		width: '100%',
		height: 40,
		backgroundColor: Colours.cBlack,
		justifyContent: 'center'
	},
};

export default TierIndicator;
