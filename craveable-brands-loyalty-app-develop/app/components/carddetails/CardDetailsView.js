import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import axios from 'axios';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Swiper from 'react-native-swiper';
import { Tranxactor } from 'app/common';
import Button from 'app/components/common/Button';
import QrCodeView from 'app/components/common/QrCodeView';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import Layout from 'app/styles/Layout';
const { p20, mb20 } = Layout;
import Images from 'app/img/Image';
const {rotatePhone, closeWhite} = Images;

class CardDetails extends Component {
	state = {
		selectedIndex: 0,
		storeListHeight: 0,
		storeMapHeight: 0
	};

	render() {
		const { navigation, firstName, lastName, phone, primaryCardID } = this.props;
		const { 
			initStyle, 
			flexCenter, 
			containerStyle, 
			whiteText,
			nameHeading,
			cardNumber,
			boldText,
			phoneNumber,
			helperText,
			rowStyle
		} = styles;
		const cardID = primaryCardID || 'XXX XXXX XXXX XXXX XXXX';

		return (
			<View style={[initStyle, flexCenter, containerStyle, p20]}>
				<QrCodeView
					size={180}
					value={primaryCardID}
				/>
				<View style={{
					position: 'absolute',
					right: 20,
					top: 44,
				}}>
					<Button 
						action={() => this.props.navigation.goBack(null)} 
						accessibilityLabel={'Close modal'}
					>
						<Image source={closeWhite} />
					</Button>
				</View>
				<Text style={[whiteText, nameHeading, {marginVertical: 30}]}>{firstName} {lastName}</Text>
				<Text style={[whiteText, cardNumber, {marginBottom: 30}]}>{cardID}</Text>
				<Text style={[whiteText, boldText]}>Mobile number linked with account:</Text>
				<Text style={[whiteText, phoneNumber, mb20]}>{phone}</Text>
				<View style={rowStyle}>
					<Image style={{marginRight: 10, marginTop: 7}} source={rotatePhone} />
					<Text style={[whiteText, helperText]}>{`Having trouble scanning?\nTurn your phone sideways`}</Text>
				</View>
			</View>
		);
	}
}

const styles = {
	initStyle: {
		flex: 1
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	containerStyle: {
		backgroundColor: Colours.cOffBlack,
		height: '100%',
	},
	whiteText: {
		color: Colours.cWhite,
		textAlign: 'center'
	},
	nameHeading: {
		...Fonts.fHeadingLarge,
		letterSpacing: 0.3,
	},
	cardNumber: {
		...Fonts.fBodyText,
		fontSize: 24,
		lineHeight: 27.4,
		letterSpacing: 0.2
	},
	boldText: {
		...Fonts.fUtilityBold,
		fontSize: 14,
		lineHeight: 27.4,
		letterSpacing: 0.1
	},
	phoneNumber: {
		...Fonts.fUtility,
		fontSize: 14,
		lineHeight: 27.4,
		letterSpacing: 0.1
	},
	helperText: {
		...Fonts.fUtility,
		lineHeight: 16.8,
		letterSpacing: 0.1,
		textAlign: 'left'
	},
	rowStyle: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 20
	}
};

export default CardDetails;