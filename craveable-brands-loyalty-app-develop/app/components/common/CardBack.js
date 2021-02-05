import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image } from 'react-native';
import axios from 'axios';

/* user imports */
import Layout from 'app/styles/Layout';
import Images from 'app/img/Image';
// import OportoLogo from 'app/img/icons/logo.png';
const { mb20 } = Layout;

/**
 * The back side of the Card component
 */
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

		// console.log('BACK OF THE CARD', this.props);

		const { name, mobileNumber } = this.props;

		return (
			<View style={[card, mb20]}>
				<View style={{
					position: 'relative',
					height: 20,
					flexDirection: 'row'
				}}>
					<Image 
						source={Images.logo}
						style={{
							flexShrink: 1,
							width: 60,
							height: 20,
							justifyContent: 'flex-start'
						}}
						resizeMode={'contain'}
					/>
				</View>
				<Text style={cardText}>{name ? name : 'Customer'}</Text>
				<View style={{
					flexDirection: 'row'
				}}>
					{/* Come back here and abstract into row components */}
					<View style={cardLeft}>
						<Text style={cardText}>Card number:</Text>
						<Text style={cardText}>Date issued:</Text>
						<Text style={cardText}>Store issued:</Text>
						<Text style={cardText}>Linked mobile number:</Text>
					</View>
					<View style={cardRight}>
						<Text style={{ color: Colours.cWhite }}>To do</Text>
						<Text style={{ color: Colours.cWhite }}>To do</Text>
						<Text style={{ color: Colours.cWhite }}>To do</Text>
						<Text style={{ color: Colours.cWhite }}>{mobileNumber ? mobileNumber : 'No number'}</Text>
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
		justifyContent: 'space-between'
	},
	cardLeft: {
		flex: 1
	},
	cardRight: {
		flex: 1
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
