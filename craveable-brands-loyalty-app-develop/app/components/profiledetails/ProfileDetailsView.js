import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, KeyboardAvoidingView, TextInput, DatePickerIOS, TouchableOpacity, ScrollView, DatePickerAndroid, Platform, ActivityIndicator
 } from 'react-native';
import axios from 'axios';
import Colours from 'app/styles/Colours';
/* user imports */
import InputField from 'app/components/common/InputField';
import SwiperContainer from 'app/components/swipercontainer/SwiperContainer';
import Layout from 'app/styles/Layout';
import Fonts from 'app/styles/Fonts';
import Map from 'app/components/map/Map';
import Button from 'app/components/common/Button';
import LoyaltycardContainer from 'app/components/loyaltycardContainer/LoyaltyCardContainer'
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
import styles from './ProfileDetails.styles';
import Tranxactor from 'app/common/Tranxactor';
import SInfo from 'react-native-sensitive-info';
import Permissions from 'react-native-permissions';
import StoreLocator from 'app/common/StoreLocator';
import { isBoolean, isEmpty } from 'lodash';

const { pl20, pr20, p20, pb10, mr10, pt20, mb10, mb20 } = Layout;
/**
 * TODO: 
 * 1. Edit what happens in the case that the field is empty
 * 
 * @class ProfileDetails
 * @extends {Component}
 */
class ProfileDetails extends Component {
	constructor (props) {
	    super(props);
	    const birthdate = props.birthday ? new Date(props.birthday) : null;
	    this.state = {
	    	loading: false,
			editable: false,
			showErrorFirstName: false,
			showErrorLastName: false,
			showErrorBirthday: false,
			showErrorAddress: false,
			editedFirstName: props.firstName,
			editedLastName: props.lastName,
			editedAddress: props.address,
			showDatePicker: false,
			editedBirthday: birthdate,
			favorStoreDistance: null
		};
	}

	checkPermission = (store) => {
		if(!store) return;
		Permissions.check('location').then(response => {
		     if(response === 'authorized') {
		      	this.getFavoriteStoreDistance(store);
		     }
	    })
	}

	getFavoriteStoreDistance = async (store) => {
		if(!store.latitude || !store.longitude) return;
		navigator.geolocation.getCurrentPosition(({coords}) => {
	     	let region = {
	        	latitude:  coords.latitude,
	        	longitude: coords.longitude
	     	}

	     	let distance = StoreLocator.getDistance(store, region);
	     	console.log(distance);
	     	this.setState({	favorStoreDistance: distance });
	    }, (error) => {
			console.log(error);
		});
	}

	componentDidMount() {
		// this.checkPermission(this.props.favouiratieStore);
	}

	componentWillReceiveProps(nextProps) {
		console.log('hehe')
    	if(this.props.favouiratieStore !== nextProps.favouiratieStore && !isEmpty(nextProps.profile.id)) {
	     	this.checkPermission(nextProps.favouiratieStore);
	    }
    	if(nextProps.profile !== this.props.profile && !isEmpty(nextProps.profile.id)){
    		console.log('update value!!');
    		const birthdate = nextProps.profile.birthDate ? new Date(nextProps.profile.birthDate) : null;
    		this.setState({
    			editedAddress: nextProps.profile.address1,
    			editedLastName: nextProps.profile.lastName,
    			editedFirstName: nextProps.profile.firstName,
    			editedBirthday: birthdate
    		})
    	}
  	}

	getCardList = async () => {
		try {
		  const { id, getLoyaltyCards} = this.props;	
	      const token = await SInfo.getItem('token', {});
	   //    console.log(token)
		  // console.log(id)
		  if(id && token) {
			getLoyaltyCards(id, token);
		  }
	    } catch (err) {
	      // console.log('There is no Token')
	    }
	}

	/**
	 * Update the ability to edit specific fields
	 * based on the state.
	 */
	updateEditable = async () => {
		const { 
			editable, 
			showErrorFirstName, 
			showErrorLastName,
			showErrorBirthday,
			showErrorAddress
		} = this.state;
		if (
			showErrorFirstName ||
			showErrorLastName ||
			showErrorBirthday ||
			showErrorAddress
		) {
			this.props.openNotification({
				title: 'Error',
				subtitle: 'All edit fields must be valid before you can save.'
			});
			return;
		}

		if (editable) {
			const { id } = this.props;
			const token = await SInfo.getItem('token', {});
			if(!id || !token){
				this.resetState();
				this.updateProfileFailure();
				return;
			}

			const {
				editedFirstName,
				editedLastName,
				editedAddress,
				editedBirthday
			} = this.state;

			const updatedData = {};
			let sendUpdate = false;
			
			if (editedFirstName !== '') {
				updatedData.firstName = editedFirstName;
				sendUpdate = true;
			}
			if (editedLastName !== '') {
				updatedData.lastName = editedLastName;
				sendUpdate = true;
			}
			if (editedBirthday !== '') {
				updatedData.birthDate = editedBirthday;
				sendUpdate = true;
			}
			if (editedAddress !== '') {
				updatedData.address1 = editedAddress; // address1 ???
				sendUpdate = true;
			}
			if (sendUpdate) {
				console.log('send data!!!')
				console.log(updatedData);
				try {
					this.setState({loading: true});
					const userInfo = await Tranxactor.updateUserDetails(id, token, updatedData);
					console.log(userInfo);
					if(userInfo.status === 200){
						this.updateProfileSuccess();
						this.props.updateProfile(userInfo.data);	
					} else {
						// error message handling here
						// console.log(userInfo.response); this.updateProfileFailure(userInfo.response.data.errorMessage);
						this.updateProfileFailure();
						this.resetState();
					}
				} catch (err){
					this.updateProfileFailure();
					this.resetState();
				}
			}
		} else {
			this.setState({
				editable: !this.state.editable
			});
		}
	}

	resetState = () => {
		const { firstName, lastName, birthday, address } = this.props;
		const _birthdate = birthday ? new Date(birthday) : null;
		this.setState({
			showErrorFirstName: false,
			showErrorLastName: false,
			showErrorBirthday: false,
			showErrorAddress: false,
			editedFirstName: firstName,
			editedLastName: lastName,
			editedAddress: address,
			editedBirthday: _birthdate
		})
	}

	updateProfileSuccess = () => {
		this.props.openNotification({
			title: 'Success',
			subtitle: 'Profile details have been updated'
		});
		this.setState({
			editable: false,
			showDatePicker: false,
			loading: false
		});
	}

	updateProfileFailure = (msg = null) => {
		this.props.openNotification({
			title: 'Failure',
			subtitle: msg || 'Unable to update Profile details'
		});
		this.setState({
			editable: false,
			showDatePicker: false,
			loading: false
		});
	}

	renderError(message) {
		const { textError } = styles;
		return (
			<Text style={textError}>Error: {message}</Text>
		);
	} 

	datePickerAction = async () => {
		const { showDatePicker, editedBirthday } = this.state;
		if(Platform.OS === 'ios'){
			// show datepicker for ios 
			this.setState({...this.state, showDatePicker: !showDatePicker});
		} else {
			console.log(editedBirthday);
			const date = editedBirthday ? editedBirthday :  new Date();
			const {action, year, month, day} = await DatePickerAndroid.open({
			    date: date,
			    mode: 'spinner'
			});
		  	if (action === DatePickerAndroid.dismissedAction) {
			    return;
			}
			let new_date = new Date(year, month, day);
		    this.setState({editedBirthday: new_date});
		}
	}


	renderTouchable() {
		const { textInput, fieldName } = styles;
		const { showDatePicker, editable, editedBirthday } = this.state;
		const containStyle = Platform.OS === 'ios' ? textInput : [textInput, { height: 60 }];
		return (
			<TouchableOpacity style={containStyle}
				onPress={() => this.datePickerAction()}> 
				<Text style={[ mb10, fieldName ]}>{showDatePicker ? 'Save birthday' : 'Edit birthday'}</Text>
				<Text style={[
					textInput, {
					opacity: showDatePicker ? 0 : 1,
					color: Colours.cGrey
				}]}>
					{ !this.state.editedBirthday ? 'Add your birthday' : moment(this.state.editedBirthday).format('DD/MM/YYYY')  }
				</Text>
			</TouchableOpacity>
		);
	}

	renderView() {
		const { textInput, fieldName } = styles;
		const containStyle = Platform.OS === 'ios' ? textInput : [textInput, { height: 60 }];
		return (
			<View style={containStyle}>
				<Text style={[ mb10, fieldName ]}>Birthday</Text>
				<Text style={textInput}>
					{ !this.state.editedBirthday ? 'Add your birthday' : moment(this.state.editedBirthday).format('DD/MM/YYYY') }
				</Text>
			</View>
		);
	}

	showDatePicker = () => {
		if(Platform.OS === 'ios'){
			const { editedBirthday, editable } = this.state;
			const date = editable && editedBirthday ? editedBirthday : new Date();
			return (
				<DatePickerIOS 
					style={{height: 150, zIndex: 10, marginBottom: 40, paddingBottom: 40}}
					date={date}
					onDateChange={(birthdate) => {
						this.setState({...this.state, editedBirthday: birthdate})
					}}
					mode="date"/>
			);
		} else {
			  return null;
		}
	}

	render() {
		// console.log(this.state);
		const { textStyle, initStyle, flexCenter, topRow, topRowContainer,
		mapContainer, mapTitleContainer, mapTitle, store, storeDistance, textInput, textInputColor, textError, fieldName, editButton, editButtonText } = styles;
		const { firstName, lastName, navigation, favouiratieStore } = this.props;
		const { editable, showErrorFirstName, showErrorLastName, showErrorBirthday, showErrorAddress, showDatePicker, favorStoreDistance, editedFirstName, editedLastName, editedAddress } = this.state;

		return (
			<ScrollView>
				<View style={ [initStyle] }>
					<View style={[pl20, pr20]}>
						<Text style={fieldName}>First name</Text>
						<KeyboardAvoidingView behavior="padding">
							<TextInput 
								underlineColorAndroid='transparent'
								editable={editable}
								style={[textInput, textInputColor]}
								placeholder={firstName ? firstName : "First name"}
								placeholderTextColor={editable ? Colours.cGrey : Colours.cBlack}
								onChangeText={(text) => {
									this.setState({
										...this.state, 
										editedFirstName: text,
										showErrorFirstName: text.length === 0 ? true : false
									});
								}}
								value={editedFirstName}
							/>
						</KeyboardAvoidingView>
						<Text style={[textError, {
							opacity: showErrorFirstName ? 1 : 0
						}]}>Error: The name field cannot be empty</Text>
						<Text style={fieldName}>Last name</Text>
						<KeyboardAvoidingView 
							behavior="padding"
						>
							<TextInput 
								underlineColorAndroid='transparent'
								editable={editable}
								style={[textInput, textInputColor]}
								placeholder={lastName ? lastName : "Last name"}
								placeholderTextColor={editable ? Colours.cGrey : Colours.cBlack}
								onChangeText={(text) => {
									this.setState({
										...this.state, 
										editedLastName: text,
										showErrorLastName: text.length === 0 ? true : false
									});
								}}
								value={editedLastName}
							/>
						</KeyboardAvoidingView>
						<Text style={[textError, {
							opacity: showErrorLastName ? 1 : 0
						}]}>Error: The last name field cannot be empty</Text>
						<KeyboardAvoidingView 
							behavior="padding"
						>
							{ editable ? this.renderTouchable() : this.renderView() }
							{showDatePicker ? this.showDatePicker() : null}
						</KeyboardAvoidingView>
						<Text style={[textError, {
							opacity: showErrorBirthday ? 1 : 0
						}]}>Error: The birthday field cannot be empty</Text>
						<Text style={fieldName}>Your delivery address</Text>
						<KeyboardAvoidingView 
							behavior="padding"
						>
							<TextInput 
								underlineColorAndroid='transparent'
								editable={editable}
								placeholder="Enter address"
								placeholderTextColor={editable ? Colours.cGrey : Colours.cBlack}
								style={[textInput, textInputColor]}
								onChangeText={(text) => {
									this.setState({
										...this.state, 
										editedAddress: text,
										showErrorAddress: text.length === 0 ? true : false
									});
								}}
								value={editedAddress}
							/>
						</KeyboardAvoidingView>
						<Text style={[textError, {
							opacity: showErrorAddress ? 1 : 0
						}]}>Error: The address field cannot be empty</Text>
					</View>
					{favouiratieStore && <View><Text style={[p20, pb10, mapTitle]}>Your favourite store</Text>
						<View style={mapContainer, mb20}>
							<View style={mapTitleContainer}>
								<Text style={[mr10, store]}>{favouiratieStore.title.toUpperCase()}</Text>
								<Text style={[mr10, storeDistance]}>|</Text>
								{favorStoreDistance && <Text style={[mr10, storeDistance]}>{favorStoreDistance.toFixed(1)}km away</Text>}
							</View>
							<Map 
								favouriteStore={favouiratieStore}
								navigation={navigation}
							/>
						</View>
					</View>}	
					<LoyaltycardContainer 
						ref='loyaltycardContainer'
						navigation={this.props.navigation}
						editable={editable}
						updateCardSuccess={this.updateProfileSuccess}
						updateCardFailure={this.updateProfileFailure}
						openNotification={this.props.openNotification}
						getCardList={this.getCardList}
					/>
					<Button 
						action={this.updateEditable}
						style={[editButton, {backgroundColor: editable ? Colours.cGreen : Colours.cPrimary}]}
						underlayColor={editable ? Colours.cGreenUnderlay : Colours.cPrimaryUnderlay}
					>
						{this.state.loading ? (<ActivityIndicator size='small' color="white" />) : (<Text style={editButtonText}>{editable ? 'Save' : 'Edit Details'}</Text>)}
					</Button>
				</View>
			</ScrollView>
		);
	}
}

export default ProfileDetails;
