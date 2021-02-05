/**
 * Landscrape view depends on orientation
 * and will always show the customer QR code
 * when landscape is enabled
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Platform } from 'react-native';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import QrCodeView from 'app/components/common/QrCodeView';
/**
 * Screen brightness needs a Java fix
 */
// import ScreenBrightness from 'react-native-screen-brightness';

const base64Logo = require('app/common/logo.js');
/* user imports */
class Landscape extends Component {

	state = {
		brightness: 0
	};

	componentDidMount() {
		// ScreenBrightness.getBrightness().then(brightness => {
		// 	console.log('brightness', brightness);
		// 	this.setState({
		// 		brightness: brightness
		// 	});
		// 	ScreenBrightness.setBrightness(1);
		// });
	}

	componentWillUnmount() {
		// ScreenBrightness.setBrightness(this.state.brightness);
	}

	render() {
		const { textStyle, initStyle, flexCenter } = styles;
		const { primaryCardID } = this.props;
		const size = Platform.OS === 'ios' ? 270 : 250;
		return (
			<View style={ [flexCenter, initStyle] }>
				<QrCodeView
					size={size}
					value={primaryCardID}
				/>
				<Text style={textStyle}>Screen brightness is temporarily increased</Text>
			</View>
		);
	}
}

const styles = {
	textStyle: {
		...Fonts.fUtility,
		fontSize: 16,
		color: Colours.cBlack,
		marginTop: -15
	},
	initStyle: {
		flex: 1,
		backgroundColor: Colours.cWhite
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
};

export default Landscape;
