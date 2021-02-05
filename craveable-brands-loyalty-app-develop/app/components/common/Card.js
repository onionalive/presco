import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';

/* user imports */
import Layout from 'app/styles/Layout';
const { mb20 } = Layout;
const base64Logo = require('app/common/logo.js');

class Card extends Component {
	render() {
		const { 
			textStyle, 
			cardContainer, 
			lowerTextContainer, 
			upperCardContainer,
			card,
			cardText,
			cardLeft,
			cardRight,
			cardDigits
		} = styles;

		const { name } = this.props;

		return (
			<View style={[card, mb20]} accessible={false}>
				<View style={cardLeft}>
					<Text style={cardDigits} accessible={false}>**** **** ****</Text>
					<Text style={cardText}>{name ? name : 'Customer'}</Text>
				</View>
				<View style={cardRight}>
					<QRCode
						value="Oporto Flame Rewards"
						size={80}
						logoBackgroundColor='black'
					/>
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
		marginBottom: 20,
		flexDirection: 'row'
	},
	upperCardContainer: {
		height: 40,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	card: {
		backgroundColor: Colours.cOffBlack,
		width: 300,
		height: 170,
		borderRadius: 12,
		padding: 20,
		position: 'relative',
		flexDirection: 'row'
	},
	cardLeft: {
		flex: 5,
		justifyContent: 'center'
	},
	cardRight: {
		flex: 3,
		justifyContent: 'center'
	},
	cardDigits: {
		color: Colours.cWhite,
		...Fonts.fUtility,
		fontSize: 22
	},
	cardText: {
		color: Colours.cWhite,
		...Fonts.fUtility,
		fontSize: 14
	}
};

export default Card;
