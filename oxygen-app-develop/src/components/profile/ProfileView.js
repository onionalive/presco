import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Platform, Text, View, Image, ScrollView, TouchableHighlight, Linking, Alert, AsyncStorage } from 'react-native';
import { Oxygen } from '../../styles/colours';
import Layout from '../../styles/layout';
import Typography from '../../styles/typography';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

import Header from '../common/Header';
import Dimensions from 'Dimensions';
import { mainStyles, fontStyles } from '../../styles/profile';

class ProfileView extends Component {

	alertCall() {
		const { phone } = this.props;
		const phoneUrl = `tel: ${phone}`
		Linking.canOpenURL(phoneUrl).then(supported => {
			console.log(supported);
			if (supported) {
				Alert.alert(
					`Call ${this.props.fullName}?`,
					`Would you like to leave the app to call ${phone}?`,
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

	_addStorage = async () => {
		const { id, fullName, email, phone, image } = this.props;
		try {
			const storedID = {
				id: id,
				fullName: fullName,
				email: email,
				phone: phone,
				image: image
			};
			await AsyncStorage.setItem('StoredID', JSON.stringify(storedID), () => {
				this.props.setFavourite(id, true, fullName, email, phone, image)
			});
		} catch (error) {
			console.log('AsyncStorage error: ' + error.message);
		}

	}

	_removeStorage = async () => {
		try {
			await AsyncStorage.removeItem('StoredID', () => {
				this.props.setFavourite();
			});
		} catch (error) {
			console.log('AsyncStorage error: ' + error.message);
		}
	}

	favourite() {
		const { isIdSet, storedId, id } = this.props;
		if (isIdSet && storedId === id) {
			this._removeStorage();
		} else {
			this._addStorage();
		}
	}

	render() {

		const { parentContainer,
			container,
			optionsContainer,
			bioContainer,
			imageStyles,
			imageSquare,
			blueUnderline,
			inlineText,
			profileInfo,
			headingContainer,
			aboutContainer,
			callBtn,
			emailBtn
		} = mainStyles;

		const { flexCenter } = Layout;
		const { textStyle, name, location, about, description, btnTitles, favourite } = fontStyles;

		const { fullName, primaryLocation, email, phone, image, bio, id, isIdSet, storedId } = this.props;

		const phoneUrl = `tel: ${phone}`;
		const emailUrl = `mailto: ${email}`;

		const thumbnail = (image)? image : 'https://facebook.github.io/react/img/logo_og.png';

		const favouriteText = (storedId === id) ? 'My favourite broker': 'Set as my favourite broker';

		return (
			<View style={ container }>
				<Header returnArrow={true} prev={() => Actions.pop()} />
				<ScrollView style={{ borderRadius: 4 }}>
					<View style={ [parentContainer, flexCenter, { minHeight: Dimensions.get('window').height }] }>
						<Image style={imageStyles} source={{uri: thumbnail}} />
						<View style={profileInfo}>
							<View style={ headingContainer }>
								<Text style={ name }>{fullName}</Text>
								<Text style={ location }>{primaryLocation}</Text>
								<TouchableHighlight
									underlayColor='rgba(0,0,0,0)'
									onPress={() => this.favourite()}
								>
									<View style={ blueUnderline }>
										<Image style={ imageSquare } source={storedId === id ? require('../../img/btn_fav_active.png') : require('../../img/btn_fav.png')} />
										<Text style={ [favourite, inlineText] }>{favouriteText}</Text>
									</View>
									</TouchableHighlight>
							</View>
							<View style={optionsContainer}>
								<View style={callBtn}>
									<TouchableHighlight
										underlayColor='rgba(0,0,0,0)'
										style={{ marginBottom: 10 }}
										onPress={() => this.alertCall()}
									>
										<Image source={require('../../img/btn_call.png')} />
									</TouchableHighlight>
									<Text style={btnTitles}>Call</Text>
								</View>
								<View>
									<TouchableHighlight
										underlayColor='rgba(0,0,0,0)'
										style={{ marginBottom: 10 }}
										onPress={() => Linking.openURL(emailUrl)}
									>
										<Image source={require('../../img/btn_email.png')} />
									</TouchableHighlight>
									<Text style={btnTitles}>Email</Text>
								</View>
							</View>
							<Text style={[textStyle, description, aboutContainer]}>{bio}</Text>
							<Text style={[textStyle, description, aboutContainer]}>Phone: {phone}</Text>
							<Text style={[textStyle, description, aboutContainer, {marginBottom: Platform.OS === 'android' ? 60 : 20}]}>Email: {email}</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default ProfileView;
