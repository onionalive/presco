import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';
import axios from 'axios';

/* user imports */

class CardView extends Component {

	state = { exampleState: [] };

	render() {
		const { textStyle, cardContainer, lowerTextContainer, upperTextContainer } = styles;

		return (
			<View>
				<View style={upperTextContainer}></View>
				<Text style={ textStyle }>Ready to roll!</Text>
				<View style={lowerTextContainer}>
					<Text>Having trouble scanning? Turn your mobile sideways or double tap for card info</Text>
				</View>
			</View>
		);
	}
}

const styles = {
	textStyle: {
		fontSize: 20
	},
	cardContainer: {
		height: 360
	},
	lowerTextContainer: {
		height: 60
	},
	upperTextContainer: {
		height: 40
	}
};

export default CardView;
