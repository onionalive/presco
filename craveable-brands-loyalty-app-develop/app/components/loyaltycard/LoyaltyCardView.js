import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import Fonts from 'app/styles/Fonts';
/* user imports */
import Layout from 'app/styles/Layout';
import Card from 'app/components/common/Card';
import CardBack from 'app/components/common/CardBack';
import Images from 'app/img/Image';
const { rotatePhone, settingsWheel, base64Logo } = Images;

const { mb20 } = Layout;

class LoyaltyCard extends Component {	
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

			const { firstName, lastName, showBack, handlePress, mobileNumber, scanHelp } = this.props;
			const name = firstName && lastName ?
						`${firstName} ${lastName}` :
						'Customer'; 

			return (
				<View style={this.props.style}>
					<View style={upperCardContainer}>
						<Image source={rotatePhone} />
					</View>
					<TouchableOpacity
						onPress={() => handlePress()}>
						{showBack ? 
							<CardBack name={name} mobileNumber={mobileNumber} /> :
							<Card name={name} /> 
						}
					</TouchableOpacity>
					<View style={lowerTextContainer}>
						<View style={{ flex: 5 }}>
							<Text style={{
								...Fonts.fUtility,
								fontSize: 12,
								color: Colours.cGrey
							}}>{scanHelp}</Text>
						</View>
						<View style={{ 
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center'
						}}>
							<Image source={settingsWheel} />
						</View>
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
	
	export default LoyaltyCard;