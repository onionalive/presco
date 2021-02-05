import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Platform, Text, View, Image, AsyncStorage, TouchableHighlight, Linking, Alert } from 'react-native';
import { Oxygen } from '../../styles/colours';
import Layout from '../../styles/layout';
import Typography from '../../styles/typography';
import axios from 'axios';

import Dimensions from 'Dimensions';

// components
import FlexContainer from '../common/FlexContainer';
import BrokerButton from '../common/BrokerButton';
import CalculatorButton from '../common/CalculatorButton';
import { profileStyles, homeFontStyles } from '../../styles/profile';

class HomeView extends Component {

	componentDidMount() {
		const isSmall = Dimensions.get('window').height <= 568;
		this.props.updateSizing(isSmall);
	}

	alertCall() {
		const {storedPhone, storedFullName} = this.props;
		const phoneUrl = `tel: ${storedPhone}`;

		Linking.canOpenURL(phoneUrl).then(supported => {
			if (supported) {
				Alert.alert(
					`Call ${storedFullName}?`,
					`Would you like to leave the app to call ${storedPhone}?`,
					[
						{text: 'Cancel', style: 'cancel'},
						{text: 'OK', onPress: () => Linking.openURL(phoneUrl)},
					]
				)
			} else {
				this.phoneError();
			}
		}).catch(err => this.phoneError(err));
	}

	phoneError(err = false) {
		if (err) {
			console.log(err);
		}

		Alert.alert(
			`Error`,
			`Sorry your device is unable to make phone calls`,
			[
				{text: 'OK'}
			]
		);
	}

	getFavourite() {
		AsyncStorage.getItem('StoredID', (err, result) => {
			if (err) {
				this.props.setFavourite(0, false)
			};
			if (result) {
				const dict = JSON.parse(result);
				this.props.setFavourite(dict.id, true, dict.fullName, dict.email, dict.phone, dict.image);
			}
			return;
		});
	}

	renderSavedBroker() {
		const { storedFullName, storedId, storedImage, storedPhone, storedEmail, isIdSet } = this.props;

		const { parentContainer,
			container,
			optionsContainer,
			bioContainer,
			imageStyles,
			profileInfo,
			headingContainer,
			aboutContainer,
			callBtn,
			emailBtn,
			btnImage
		} = profileStyles;

		const email = `mailto: ${storedEmail}`;

		const { flexCenter } = Layout;
		const { textStyle, name, job, about, description, btnTitles } = homeFontStyles;

		return (
			<View style={storedBrokerStyles.container}>
				<View style={storedBrokerStyles.borderBottom}>
					<Text style={storedBrokerStyles.title}>Contact your favourite broker</Text>
				</View>
				<View style={storedBrokerStyles.profile}>
					<View style={storedBrokerStyles.profileImage}>
						<Image style={storedBrokerStyles.imageStyles} source={{uri: storedImage}} />
					</View>
					<View style={storedBrokerStyles.profileInfo}>
						<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
							<Text style={ storedBrokerStyles.name }>{storedFullName.length > 18 ? storedFullName.substr(0, 16) + '...' : storedFullName}</Text>
						</View>
						<View style={storedBrokerStyles.optionsContainer}>
							<TouchableHighlight
								underlayColor='rgba(0,0,0,0)'
								onPress={() => this.alertCall()}
								style={{ flexGrow: 1 }}
							>
								<View style={storedBrokerStyles.row}>
									<Image style={storedBrokerStyles.rowImage} source={require('../../img/btn_call_white.png')} />
									<Text style={storedBrokerStyles.btnTitles}>Call</Text>
								</View>
							</TouchableHighlight>
							<TouchableHighlight
									underlayColor='rgba(0,0,0,0)'
									onPress={() => Linking.openURL(email)}
									style={{ flexGrow: 1 }}
								>
								<View style={storedBrokerStyles.row}>
									<Image style={storedBrokerStyles.rowImage} source={require('../../img/btn_email_white.png')} />
									<Text style={storedBrokerStyles.btnTitles}>Email</Text>
								</View>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</View>
		);
	}

	render() {

		const { isIdSet, small } = this.props;

		const { text, byline, oxygenLogo, bylineSm, oxygenLogoSm, terms, termsContainer } = styles;
		const { flexContainer, mainBackground, flexContainerTop } = container;
		const { flexCenter } = Layout;
		const currentHeight = Dimensions.get('window').height;

		// console.log(currentHeight);

		// const termsBounds = currentHeight < 680 ?

		this.getFavourite();

		return (
			<View style={mainBackground}>
				<View style={isIdSet ? flexContainerTop : flexContainer}>
					<Image
						style={isIdSet ? oxygenLogoSm : oxygenLogo}
						source={require('../../img/oxygen_logo_blue.png')}
					/>
					<Text style={isIdSet ? bylineSm : byline}>Home loans made simple.</Text>
					<BrokerButton action={() => this.props.updateLoading(false)} width={Dimensions.get('window').width/1.2} resize={isIdSet} />
					<CalculatorButton resize={isIdSet} />
					{ isIdSet &&
						this.renderSavedBroker() }
					<View style={termsContainer}>
						<Text style={terms}>© 2017 Copyright McGrath Oxygen Home Loans Pty Ltd</Text>
						<Text style={terms}>ACN 103 177 377</Text>
						<Text style={terms}>Australian Credit Licence Number&nbsp;390351</Text>
					</View>
				</View>
			</View>
    	);
	}
}

const storedBrokerStyles = {
	container: {
		backgroundColor: Oxygen.blue,
		marginTop: 10,
		width: Dimensions.get('window').width - 40,
		position: 'absolute',
		bottom: 90,
		borderRadius: 4
	},
	profile: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 100,
	},
	profileImage: {
		flexGrow: 3,
		alignItems: 'center'
	},
	profileInfo: {
		flexGrow: 4,
		alignItems: 'center',
		height: 100,
		paddingTop: 10,
		paddingBottom: 10
	},
	title: {
		textAlign: 'center',
		color: Oxygen.white,
		height: 40,
		fontSize: 17,
		lineHeight: Platform.OS === 'android' ? 30 : 40,
		fontFamily: 'ProximaNova-Semibold'
	},
	borderBottom: {
		borderWidth: 1,
		borderColor: 'transparent',
		borderBottomColor: '#229FCC',
		marginLeft: 10,
		marginRight: 10,
	},
	imageStyles: {
		alignItems: 'center',
		width: 60,
		height: 60,
		borderRadius: 30,
		borderWidth: 2,
		borderColor: Oxygen.white,
		zIndex: 2,
		shadowColor: Oxygen.darkBlue,
		shadowOpacity: 1,
		shadowRadius: 6,
		shadowOffset: {width: 10, height: 10}
	},
	optionsContainer: {
		backgroundColor: Oxygen.blue,
		flexDirection: 'row'
	},
	name: {
		lineHeight: 30,
		height: 30,
		color: Oxygen.white,
		fontSize: 20,
		fontFamily: 'ProximaNova-Semibold',
		flexGrow: 1
	},
	btnStyles: {
		color: Oxygen.white
	},
	row: {
		position: 'relative',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 50,
		paddingLeft: 50
	},
	rowImage: {
		position: 'absolute',
		height: 40,
		width: 40,
		resizeMode: 'contain',
		left: 0,
		top: 5,
		bottom: 5
	},
	rowText: {
		textAlign: 'center',
	},
	btnTitles: {
		textAlign: 'center',
		alignSelf: 'center',
		color: Oxygen.white,
		fontSize: 17,
		fontFamily: 'ProximaNova-Semibold',
	}
}

const container = {
	flexContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		paddingLeft: 20,
		paddingRight: 20,
	},
	flexContainerTop: {
		justifyContent: 'center',
		alignItems: 'center',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		paddingTop: 30,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 232
	},
	mainBackground: {
		backgroundColor: '#fff',
		flex: 1,
	}
};

const styles = {
	text: {
		color: '#fff',
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	termsContainer: {
		position: 'absolute',
		bottom: Platform.OS === 'android' ? 34 : 20,
		width: Dimensions.get('window').width - 40
	},
	terms: {
		color: Oxygen.grey,
		fontSize: 10,
		textAlign: 'center',
	},
	byline: {
		marginBottom: 30,
		color: '#9c9c9c',
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	bylineSm: {
		marginBottom: 30,
		color: '#9c9c9c',
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	oxygenLogo: {
		marginBottom: 10,
	},
	oxygenLogoSm: {
		height: 32,
		width: 131,
		resizeMode: 'contain'
	}
};

export default HomeView;
