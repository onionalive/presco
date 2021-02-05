import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image, ScrollView, Linking, Platform, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Button from 'app/components/common/Button';
import Colours from 'app/styles/Colours';
import moment from 'moment';
/* user imports */
import SwiperContainer from 'app/components/swipercontainer/SwiperContainer';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import ModalHeader from 'app/components/common/ModalHeader'
import Images from 'app/img/Image';
import titleize from 'titleize';
import { isBoolean, isEmpty } from 'lodash';
import styles from './StoreInfo.styles';
import Direction from 'app/common/Direction';
import ActionSheet from 'react-native-actionsheet';
const direction = new Direction();
const CANCEL_INDEX = 0;
const options = [ 'Cancel', 'Maps', 'Google Maps'];
const menu_title = 'Open directions in';
import { NavigationActions } from 'react-navigation';

const IconContent = (props) => {
	const { img, action, accessLable, title, textStyle, imgStyle } = props
	const iconTextStyle = textStyle ? [styles.iconText, textStyle] : styles.iconText;
	const imageStyle = imgStyle ? [styles.iconStyle, imgStyle] : styles.iconStyle;
	return (
		<TouchableOpacity onPress={() => action()}>
		   <View style={{marginTop:10}}>
				<Image source={img} style={imageStyle}/>
				<Text style={iconTextStyle}>{title}</Text>
			</View>
		</TouchableOpacity>
	 );
}

class StoreInfoView extends Component {
	constructor (props) {
	    super(props)
	    const { navigation } = props;
		const { params } = navigation.state;
	    this.state = {
	      store: params.store
	    }
	  }


	checkOpeningHours = (opening_hours) => {
		let now = moment();
		// Let's see if the store is open today
		let today_key = now.format('dddd').toLowerCase();
		let today_hours = opening_hours[today_key];
		if(!today_hours){
			return null;
		}
		if(today_hours === true){
			//open 24 hours today
			return 'Open Now';
		} else {
			//check now with today's opening hours
			if(!isBoolean(today_hours)) {
				let today_open = today_hours.open.split(":");
				let today_close = today_hours.close.split(":");
				let open = moment().hour(today_open[0]).minute(today_open[1]).seconds(0)
				let close;
				if(today_close[0] < 12){
					close = moment().add(1, 'days').hour(today_close[0]).minute(today_close[1]).seconds(0)
				} else {
					close = moment().hour(today_close[0]).minute(today_close[1]).seconds(0)
				}
				if(now.isBetween(open, close)) {
					return 'Open Now';
				}
			}
			// Store is not open today. Let's see if the store is still open from yesterday.
			// Note - this is only possible if the store closes after midnight in the AM
			let yesterday_key =  moment().subtract(1, 'days').format('dddd').toLowerCase();
			let yesterday_hours = opening_hours[yesterday_key];
			if(yesterday_hours && !isBoolean(yesterday_hours)) {
				let yesterday_close = yesterday_hours.close.split(":");
				if(yesterday_close[0] < 12) {
					let _close = moment().hour(yesterday_close[0]).minute(yesterday_close[1]).seconds(0)
					if(_close > now) {
						return 'Open Now';
					}
				}
			}
		}
		//not fit in all the situation above, store closed
		return "Closed Now";
	}

	callStore = (phone) => {
		const url = 'tel:' + String(phone).replace(/[^\d]/g, "");
		direction.launchUrl(url);
	}

	openPickupLink = (url) => {
		if(url) {
			direction.launchUrl(url);
		}
	}

	getTimeString = (time) => {
		if(!time) {
			return null
		}
		const time_array = time.split(':');
		let time_info;
		if(time_array.length > 1){
			time_info = moment({hour: time_array[0] ,minute: time_array[1]})
		}
		return time_info && time_info.format('H:mm A')
	}

	renderHours = (opening_hours) => {
		if(!opening_hours || isEmpty(opening_hours)) {
			return null
		}
		return Object.keys(opening_hours).map((date, index) => {
			let date_value = opening_hours[date]
			let date_info;
			if(date_value === true){
				date_info = '24 Hours'
			} else if(date_value === false){
				date_info = 'Closed'
			} else {
				date_info = `${this.getTimeString(date_value.open)} - ${this.getTimeString(date_value.close)}`
			}
			return (
				<View style={{flexDirection: 'row', justifyContent:'flex-start'}} key={index}>
					<Text key={index} style={[styles.bodyTextStyle, {flex:1}]}>{titleize(date)}:</Text>
					<Text style={{flex:2, marginLeft: -10}} >{date_info}</Text>
				</View>	
			);
		});
	}

  // sortWeekDays = (opening_hours) => {
	// 	if(!opening_hours || opening_hours.length < 1) {
	// 		return null
	// 	}
	// 	var sorter = {
	// 	  "monday": 1,
	// 	  "tuesday": 2,
	// 	  "wednesday": 3,
	// 	  "thursday": 4,
	// 	  "friday": 5,
	// 	  "saturday": 6,
	// 	  "sunday": 7
	// 	};
	// 	var sorted_dates = [];
	// 	Object.keys(opening_hours).forEach(function(key) {
	// 	  var value = opening_hours[key];
	// 	  var index = sorter[key.toLowerCase()];
	// 	  sorted_dates[index] = {
	// 	    key: titleize(key),
	// 	    value: value
	// 	  };
	// 	});
	// 	return sorted_dates
	// }

	handleDirectionAction = (store) => {
		if(Platform.OS === 'ios'){
			this.ActionSheet.show();
		} else {
			// open Google map for android
			direction.openMap(store, 'google');
		}
  	}

	handlePress = (i) => {
		const { store } = this.state;
		if(i == 1){
			// ios -> apple map
			direction.openMap(store, 'apple');
		} else if (i == 2) {
			// open google map
			direction.openMap(store, 'google');
		}
	}

	render() {
		const { navigation, appNav } = this.props;
		const { store } = this.state;
		const {
			address,
			suburb,
			title,
			state,
			postcode,
			opening_hours,
			phone,
			close_today,
			pickupUrl,
			latitude,
			longitude
		} = store;
		// const orderedDate = this.sortWeekDays(opening_hours);
		const open_info = this.checkOpeningHours(opening_hours);
		const { 
			textStyle, 
			initStyle, 
			flexCenter,
			topIconContent,
			headingTextStyle,
			headerStyle,
			modalMargin,
			backgroundWhite,
			backgroundOffWhite,
			bodyTextStyle,
			utilityTextStyle,
			centreText,
			boldText,
			paddingStyle,
			borderStyle,
			iconTextfix
		} = styles;

		console.log(appNav);

		const containerStyle = Platform.OS === 'ios' ? [initStyle, modalMargin] : initStyle;
		let imgStyle = Platform.OS === 'ios' ? {} : {marginLeft: 10};
		return (
			<ScrollView style={ containerStyle }>
				<View style={styles.flexContent}>
					<ModalHeader action={() => navigation.goBack(null)} 
						title='STORE INFO'
						img={Images.closeWhite}
					/>
					<View style={topIconContent}>
						<IconContent 
							img={Images.call}
							action={() => this.callStore(phone)}
							accessibilityLabel={'Call'}
							title='Call'
						/>
						<IconContent 
							img={Images.order}
							action={() => this.openPickupLink(pickupUrl)}
							accessibilityLabel={'Order'}
							title='Order'
						/>
						<IconContent 
							img={Images.direction}
							action={() => this.handleDirectionAction(store)}
							accessibilityLabel={'Direction'}
							title='Direction'
							textStyle={iconTextfix}
							imgStyle={imgStyle}
						/>	
						<IconContent 
							img={Images.star}
							action={() => {}}
							accessibilityLabel={'Favourite'}
							title='Favourite'
							textStyle={iconTextfix}
							imgStyle={imgStyle}
						/>
					</View>
					<View style={styles.infoContent}>
						<View style={{marginLeft: 30, marginTop: 30, marginBottom: 10}}>
							<Text style={boldText}>{title}</Text>
							<Text style={bodyTextStyle}>{address}</Text>
							<Text style={bodyTextStyle}>{suburb} {state} {postcode}</Text>
						</View>
						{opening_hours && <View style={{marginLeft: 30, marginTop: 10, marginBottom: 10}}>
							 <Text style={boldText}>Opening Hours: {open_info}</Text>
							{this.renderHours(opening_hours)}
						 </View>}
					</View>
					<View style={flexCenter}>
						<SwiperContainer
							alt
							offer
							navigation={navigation}
							screenProps={this.props.screenProps}
							title='Offers'
							ref='OfferSwiper'
							navigationAction={async () => {
								// TODO: This calls a no op since the component is being dismounted and need to change
								const returnToTabbar = NavigationActions.back({key: appNav.routes[1].routes[1].key});
								const navigateToOffers = NavigationActions.navigate({ routeName: 'Offers' });

								await this.props.navigation.dispatch(returnToTabbar);
								await this.props.navigation.dispatch(navigateToOffers);
							}}
						/>
					</View>
					<ActionSheet
				    	ref={o => this.ActionSheet = o}
				        title={menu_title}
				        options={options}
				        cancelButtonIndex={CANCEL_INDEX}
				        onPress={this.handlePress}
				    />
				</View>
			</ScrollView>

		)
	}
}

export default StoreInfoView;