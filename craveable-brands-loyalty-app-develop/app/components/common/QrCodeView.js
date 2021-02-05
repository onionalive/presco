import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Dimensions } from 'react-native';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import Images from 'app/img/Image';

class QrCodeView extends Component {

	setNativeProps = (nativeProps) => {
		this._root.setNativeProps(nativeProps);
	}

	render() {
		let width = Dimensions.get('window').width
		let margin = 8
		const styles = {
			cardContainer: {
			marginVertical: 13,
			marginHorizontal: margin,
			backgroundColor: Colours.cWhite,
			justifyContent: 'center',
			alignItems: 'center',
			width: width - 2 * margin,
			borderRadius: 12,
			padding: 20,
			flexDirection: 'row'
			},
		};
		const { value, size } = this.props;
		// console.log('PRCODE Value', value);
		return (
			<View style={styles.cardContainer} accessible={false} ref={component => this._root = component} {...this.props}>
				<QRCode
					value={ value || "Oporto Flame Rewards" }
					size={size}
					logo={{uri: Images.base64Logo}}
					logoSize={40}
					logoBackgroundColor='black'
				/>
			</View>
		);
	};
}

export default QrCodeView;
