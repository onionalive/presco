import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import Button from 'app/components/common/Button';
import Layout from 'app/styles/Layout';
import Images from 'app/img/Image';
const { chevronDownWhite, iconOrange, iconSilver, iconGold, iconPlatinum, headerBackground } = Images;

import Config, { OPORTO, RED_ROOSTER } from 'craveable-brands-loyalty-app/app.config';
/**
 * Top bar common component - this may be used or replaced by
 * the default React Navigation settings.
 *
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
	/**
	 * Render Header
	 *
	 * @returns Component
	 * @memberof Header
	 */
	renderBadge(loyaltyStatus) {
		if (Config.theme === OPORTO) {
			switch(loyaltyStatus) {
				case 'Orange':
					return badge = iconOrange;
				case 'Silver':
					return badge = iconSilver;
				case 'Gold':
					return badge = iconGold;
				case 'Platinum':
					return badge = iconPlatinum;
				default:
					return;
			}
		} else if (Config.theme === RED_ROOSTER) {
			console.log('Update Red Rooster Icon switch');
			switch(loyaltyStatus) {
				case 'Orange':
					return badge = iconOrange;
				case 'Silver':
					return badge = iconSilver;
				case 'Gold':
					return badge = iconGold;
				case 'Platinum':
					return badge = iconPlatinum;
				default:
					return;
			}
		}
	}

	render() {
		const { headingStyle, viewStyle, lowerHeading, subheadingStyle, subheadingTextStyle, imageStyle, iconStyle, rowStyle } = styles;
		const { mr5 } = Layout;
		const { firstName, loyaltyBalance } = this.props;

		/**
		 * This needs to be changed back to this.props.loyaltyStatus
		 */
		const loyaltyStatus = 'Orange';
		let badge;

		return (
			<View style={[viewStyle]}>
				<Image style={imageStyle} source={headerBackground} />
				<View style={[rowStyle, {paddingHorizontal: 20}]}>
					<Image source={this.renderBadge(loyaltyStatus)} style={{marginTop: 12}} />
					<Text style={headingStyle}>Hi {firstName ? firstName : 'customer'}</Text>
				</View>
				<View style={[lowerHeading]}>
					<Button
						underlay='rgba(0,0,0,0)'
						action={() => this.props.statusAction()}
						accessibilityLabel={`Loyalty status: ${loyaltyStatus}. View loyalty status info.`}
					>
						<View style={rowStyle}>
							<Text style={subheadingStyle}><Text style={subheadingTextStyle}>Status:</Text> { loyaltyStatus ? `${loyaltyStatus}` : 'none'}</Text>
							<Image style={iconStyle} source={chevronDownWhite} />
						</View>
					</Button>
					<Button 
						underlay='rgba(0,0,0,0)'
						action={() => this.props.action()}
						accessibilityLabel={`Loyalty balance. You have $${(Math.floor(100 * Number(loyaltyBalance)) / 100).toFixed(2)}. View transactions.`}
					>
						<View style={rowStyle}>
							<Text style={subheadingStyle}><Text style={subheadingTextStyle}>Dollars:</Text> { loyaltyBalance ? `$${(Math.floor(100 * Number(loyaltyBalance)) / 100).toFixed(2)}` : '$0.00'}</Text>
							<Image style={iconStyle} source={chevronDownWhite} />
						</View>
					</Button>
				</View>
			</View>
		);
	}
};

/**
 * Styling for the Header
 */
const styles = {
	headingStyle: {
		fontSize: 20,
		color: Colours.cWhite,
		...Fonts.fHeadingMedium,
		backgroundColor: 'transparent',
		paddingHorizontal: 10,
		paddingTop: 15 
	},
	viewStyle: {
		backgroundColor: Colours.cOffBlack,
		height: 82,
		width: '100%',
		elevation: 2,
		zIndex: 10,
		justifyContent: 'space-between',
		flex: 1,
		maxHeight: 82
	},
	imageStyle: {
		backgroundColor: Colours.cBlack,
		flex: 1,
		resizeMode: 'cover',
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center'
	},
	lowerHeading: {
		flexDirection: 'row',
		paddingHorizontal: 54,
		paddingVertical: 10,
		backgroundColor: Colours.cOffBlack
	},
	subheadingStyle: {
		color: Colours.cOffWhite,
		...Fonts.fUtilityBold,
		letterSpacing: 0.1,
		lineHeight: 15,
	},
	subheadingTextStyle: {
		color: Colours.cPrimary
	},
	iconStyle: {
		height: 12,
		width: 12,
		marginLeft: 5,
		marginRight: 15
	},
	rowStyle: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
};

export default Header;
