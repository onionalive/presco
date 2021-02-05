import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
	 Text, AppState, KeyboardAvoidingView,
	 View, Platform, TouchableOpacity, ScrollView,
	 TextInput, Dimensions, Image, TouchableHighlight,
	 ActivityIndicator, SafeAreaView, Alert
} from 'react-native';
import axios from 'axios';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Swiper from 'react-native-swiper';
import Images from 'app/img/Image';
import isEmpty from 'lodash/isEmpty';
// import { Styles } from './StoreModal.styles';
import { Tranxactor } from 'app/common';
import Button from 'app/components/common/Button';
import ModalHeader from 'app/components/common/ModalHeader';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import CheckBox from 'react-native-check-box';
import StoreList from 'app/components/storelist/StoreList';
import StoreMap from 'app/components/storemap/StoreMap';
const { width, height } = Dimensions.get('window');
import StoreLocator from 'app/common/StoreLocator';
import Permissions from 'react-native-permissions';

class StoreModal extends Component {
	state = {
		selectedIndex: 0,
		search: '',
		searchError: '',
		storeHeaderHeight: 0,
		currentLocation: null,
		storelist: null,
		pickup: false,
		delivery: false,
		cartering: false,
		display_search: '',
		showEnableButton: false,
		appState: AppState.currentState
	};

	setPickup = () => {
		const { pickup } = this.state;
		this.setState({ pickup: !pickup })
	}

	setDelivery = () => {
		const { delivery } = this.state;
		this.setState({ delivery: !delivery })
	}

	setCartering = () => {
		const { cartering } = this.state;
		this.setState({ cartering: !cartering })
	}

	handleIndexChange = (index) => {
		this.setState({
			selectedIndex: index,
		});
    }

	handleAppStateChange = (nextAppState) => {
		if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
	      console.log('App has come to the foreground!');
	      this.checkPermission();
	    }
	    this.setState({appState: nextAppState});
	}

	componentDidMount() {
		AppState.addEventListener('change', this.handleAppStateChange);
		this.checkPermission();
	}

	componentWillUnmount() {
	    AppState.removeEventListener('change', this.handleAppStateChange);
	}

	onSearch = async () => {
		try{
			const { search } = this.state;
			const { stores } = this.props;
			if(search) {
				let result = await StoreLocator.searchStoresViaGoogle(search);
				const { error, location } = result;
				console.log('search result', result);
				if(error) {
					return this.setState({
						searchError: 'No Result !!!'
					})
				} 
				let region = {
					latitude: location.lat,
					longitude: location.lng
		     	}
			    console.log('current location: ', region);
			    this.updateCurrentLocation(stores, region, search);
			}
		} catch(err) {
			console.log(err);
		}
	}

	updateCurrentLocation = async (stores, region, display_search = '') => {
		let result;
	 	if(region && stores) {
	 		result = await StoreLocator.filterClosestStores(stores, region);
			// console.log(result);
			this.setState({
		        currentLocation: region,
		      	storelist: result,
		      	searchError: '',
		      	display_search
		 	})
		}
	}


	getResultByCurrentLocation = async () => {
		let getResultByDefault = this.getResultByDefault;
		const { stores } = this.props;
		await navigator.geolocation.getCurrentPosition((position) => {
	     	let region = {
	        	latitude:       position.coords.latitude,
	        	longitude:      position.coords.longitude
	     	}
	     	console.log('current location: ', region);
	     	this.updateCurrentLocation(stores, region);
		}, (error) => {
			console.log(error);
			getResultByDefault(false);
		});
	}
//,{enableHighAccuracy: false, timeout: 10000, maximumAge: 3000}
	getResultByDefault = (showButton = true) => {
		const { stores } = this.props;
		let storewrapper = [];
		stores.forEach((store) => {
			let st = {
				store: store,
				title: store.title,
				id: store.id,
				latitude: store.latitude,
				longitude: store.longitude
			};
		    storewrapper.push(st)
		});
		this.setState({storelist: storewrapper, showEnableButton: showButton})
	}

	checkPermission = () => {
		Permissions.check('location').then(response => {
		     if(response === 'authorized') {
		      	this.getResultByCurrentLocation();
		     } else {
		      	this.getResultByDefault();
		     }
	    })
	}

	setStoreHeaderHeight(e) {
		const storeList = this.storeHeader;
		storeList.measure( (fx, fy, width, height, px, py) => {
			console.log(`storeHeader: ${height}`);
			this.setState({
				...this.state,
				storeHeaderHeight: height
			});
		});
	}

	filterStores = (storelist) => {
		const { pickup, delivery, cartering } = this.state;
		let result = storelist;
		if(pickup || cartering) {
			result = result.filter((store) => {
				if (store.store && !isEmpty(store.store.pickupUrl)) {
					return store;
				}
			})
		}

		if(delivery) {
			result = result.filter((store) => {
				if (store.store && !isEmpty(store.store.deliveryUrl)) {
					return store;
				}
			})
		}

		return result;
	}

	renderNoResult = () => {
		return (
			<View style= {styles.noResultContainer}>
				<Text style={styles.noResultText}>Could not find that location. Please refine your search and try again</Text>
			</View>
		)
	}

	openSettings = () => {
		Alert.alert(
		  'Enable Location Service from Settings?',
		  '',
		  [
		    {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
		    {text: 'OK', onPress: () => Permissions.openSettings()},
		  ],
		  { cancelable: false }
		)
	}


	enableAction = async () => {
		await this.setState({ showEnableButton: false });
		await Permissions.request('location', 'always').then(response => {
			 console.log(response);
	       if(response === 'authorized') {
	       		this.getResultByCurrentLocation();
	       } else if(Permissions.canOpenSettings() && Platform.OS === 'ios'){
	       		this.openSettings();
	       }
	    })
	}

	renderDisplayView = (displayHeight, result, navigation) => {
		const { selectedIndex, showEnableButton } = this.state;
		return (
			<View
				style={{height: displayHeight}}
			>
				{
					selectedIndex === 0 ? 
						<StoreList
							storeList={result}
							navigation={navigation}
							showEnableButton={showEnableButton}
							enableAction={this.enableAction}
						/> : 
						<StoreMap
							storeList={result}
							navigation={navigation}
							mapHeight={displayHeight}
						/>
				}
			</View>
		)
	}

	onChangeText = (text) => {
		if(isEmpty(text)) {
			this.setState({
				search: '',
				searchError: ''
			});
		} else {
			this.setState({
				search: text
			});
		}
	}

	onPressClear = async () => {
		await this.checkPermission();
		this.setState({
			search: '',
			searchError: '',
			display_search: ''
		});
	}

	renderActivityIndicator = () => {
		return(
			<View style={styles.flexCenter}>
		        <ActivityIndicator
		          size='large'
		          style={{marginTop: 100 }}
	        	/>
	      	</View>
		)
	}


	render() {
		const { navigation } = this.props;
		const displayHeight = height - this.state.storeHeaderHeight - 20;
		// console.log(`swiperHeight: ${swiperHeight}`)
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
			iconTextfix,
			checkBoxContainer,
			checkBoxIconStyle,
			searchBoxContainer,
			checkBoxStyle,
			checkBoxText,
			searchResultText,
			closeIcon,
			iconStyle,
			searchContainer,
			closeiconStyle
		} = styles;

		const {
				activeTabStyle,
				activeTabTextStyle,
				tabStyle,
				tabTextStyle,
				tabsContainerStyle
			} = tabStyles;
		const { storelist, search, searchError, display_search, selectedIndex } = this.state;
		let result = this.filterStores(storelist);
		// console.log('result', result);
		// const display_content = isEmpty(searchError) ? this.renderSwiper(swiperHeight, result, navigation) : this.renderNoResult();
		let display_content;
		if(!storelist){
			display_content = this.renderActivityIndicator();
		} else if(isEmpty(searchError)) {
			display_content = this.renderDisplayView(displayHeight, result, navigation);
		} else {
			display_content = this.renderNoResult();
		}

		const containerStyle = Platform.OS === 'ios' ? [initStyle, modalMargin] : initStyle;
		return (
			<SafeAreaView style={containerStyle}>
				<View
					ref={node => this.storeHeader = node}
					onLayout={(event) => this.setStoreHeaderHeight(event)}
				>
					<ModalHeader action={() => navigation.goBack(null)} 
							title='LOCATIONS'
							img={Images.closeWhite}
					/>
					<View style={searchBoxContainer}>
						<KeyboardAvoidingView 
							style={searchContainer}
							behavior="padding"
						>
							<View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
								<Image source={Images.search} style={[iconStyle, {marginRight:10, marginLeft: 20}]}/>
								<TextInput 
									returnKeyType='search'
									editable={true}
									style={{width:  width * 0.7}}
									placeholder='Search by Name or Postcode'
									placeholderTextColor={Colours.cBlack}
									onChangeText={this.onChangeText}
									value={search}
									onSubmitEditing={ () => this.onSearch() }
									underlineColorAndroid='transparent'
								/>
							</View>
							<TouchableHighlight onPress={() => this.onPressClear()} underlayColor='transparent' style={closeIcon}>
	        					<Image source={Images.closeBlack} style={closeiconStyle}/>
	      					</TouchableHighlight>
						</KeyboardAvoidingView>
					</View>
					<View style={checkBoxContainer}>
						<CheckBox
						 	style={checkBoxStyle}
						    rightText='PICK-UP'
						    rightTextStyle={checkBoxText}
						    onClick={()=> this.setPickup()}
						    isChecked={false}
						    checkedImage={<Image source={Images.ticked} style={checkBoxIconStyle}/>}
            				unCheckedImage={<Image source={Images.unticked} style={checkBoxIconStyle}/>}
						 />
						 <CheckBox
						 	style={checkBoxStyle}
						    rightText='DELIVERY'
						    rightTextStyle={checkBoxText}
						    onClick={()=> this.setDelivery()}
						    isChecked={false}
						    checkedImage={<Image source={Images.ticked} style={checkBoxIconStyle}/>}
            				unCheckedImage={<Image source={Images.unticked} style={checkBoxIconStyle}/>}
						 />
						 <CheckBox
						 	style={checkBoxStyle}
						    rightText='CARTERING'
						    rightTextStyle={checkBoxText}
						    onClick={()=> this.setCartering()}
						    isChecked={false}
						    checkedImage={<Image source={Images.ticked} style={checkBoxIconStyle}/>}
            				unCheckedImage={<Image source={Images.unticked} style={checkBoxIconStyle}/>}
						 />
					</View>
					{!!display_search && (<View style={{ margin: 10}}><Text style={searchResultText}>Showing stores near: {display_search}</Text></View>)}
					{!searchError && <SegmentedControlTab
										values={['List', 'Map']}
										selectedIndex={this.state.selectedIndex}
										onTabPress={this.handleIndexChange}
										borderRadius={0}
										activeTabStyle={activeTabStyle}
										activeTabTextStyle={activeTabTextStyle}
										tabStyle={tabStyle}
										tabTextStyle={tabTextStyle}
										tabsContainerStyle={tabsContainerStyle}
									/>}
				</View>
				{display_content}
			</SafeAreaView>
		)
	}
}

export default StoreModal;

const styles = {
	searchContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		alignItems: 'center'
	},
	noResultContainer: {
		margin: 20
	},
	searchBoxContainer: {
		width: '100%',
		flexDirection: 'row',
		minHeight: 50,
		justifyContent: 'flex-start',
		alignItems: 'center',	
		backgroundColor: Colours.cWhite
	},
	checkBoxIconStyle: {
		width: 15,
		height: 15
	},
	checkBoxStyle: {
		flex: 1,
		padding: 10
	},
	checkBoxContainer: {
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: Colours.cLightGrey,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	checkBoxText: {
		...Fonts.fBodyText,
		color: Colours.cOffBlack,
		fontSize: 10
	},
	searchResultText: {
		...Fonts.fBodyText,
		color: Colours.cGrey,
		fontSize: 14
	},

	iconTextfix: {
		marginLeft: -10
	},
	textStyle: {
		fontSize: 20
	},
	searchIcon: {
		width: 20,
		height: 20
	},
	iconStyle: {
		width: 25,
		height: 25
	},
	closeiconStyle: {
		width: 20,
		height: 20
	},
	closeIcon: {
		marginRight: 20
	},
	iconText: {
		...Fonts.fBodyText,
		color: Colours.cOffBlack,
		fontSize: 10,
		marginTop: 10,
		marginBottom: 10
	},
	noResultText: {
		...Fonts.fBodyText,
		color: Colours.cRed,
		fontSize: 14,
	},
	modalMargin: {
		marginTop: ifIphoneX ? 20 : 0,
		backgroundColor: Colours.cWhite
	},
	infoContent: {
		width: '100%',
		backgroundColor: Colours.cLightGrey,
	},
	topIconContent:{
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: Colours.cWhite,
		width: '100%',
		// height: 50
	},
	flexCenter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	initStyle: {
		flex: 1
	},
	flexContent: {
   		backgroundColor: Colours.cWhite
	},
	headingTextStyle: {
		color: Colours.cWhite,
		...Fonts.fHeadingMedium,
		backgroundColor: 'transparent',
		marginLeft: 5,
		marginRight: 5,
		// marginTop: ifIphoneX ? 20 : 0,
		fontSize: 24
	},
	headingStyle: {
		position: 'absolute',
		bottom: 0,
		backgroundColor: Colours.cOffBlack,
		height: 80,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerStyle: {
		backgroundColor: Colours.cOffBlack,
		height: 260,
		width: '100%',
		elevation: 2,
		zIndex: 10,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative'
	},
	lowerHeading: {
		flexDirection: 'row'
	},
	subheadingStyle: {
		color: Colours.cOffWhite
	},
	boldText: {
		marginBottom: 10,
		...Fonts.fUtilityBold,
		// lineHeight: 24,
		fontSize: 16,
		color: Colours.cOffBlack
	},
	borderStyle: {
		width: '100%',
		backgroundColor: Colours.cLightGrey,
		height: 1,
		marginBottom: 20
	},
	bodyTextStyle: {
		marginBottom: 10,
		...Fonts.fBodyText,
		fontSize: 14,
		color: Colours.cOffBlack,
		// lineHeight: 18
	},
	utilityTextStyle: {
		...Fonts.fUtility,
		lineHeight: 16.8,
		color: Colours.cGrey
	},
	centreText: {
		textAlign: 'center'
	},
	backgroundWhite: {
		backgroundColor: Colours.cWhite
	},
	backgroundOffWhite: {
		backgroundColor: Colours.cOffWhite
	},
	backgroundGrey: {
		backgroundColor: Colours.cGrey
	},
	paddingStyle: {
		paddingVertical: 25,
		paddingHorizontal: 32
	}
};

const tabStyles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		flex: 1
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	tabsContainerStyle: {
		borderColor: Colours.cWhite,
		borderWidth: 0
	},
	tabStyle: {
		backgroundColor: Colours.cWhite,
		borderWidth: 0,
		borderBottomColor: Colours.cLightGrey,
		borderBottomWidth: 1,
		minHeight: 40
	},
	tabTextStyle: {
		...Fonts.fUtility,
		fontSize: 14,
		color: Colours.cBlack,
	},
	activeTabStyle: {
		backgroundColor: Colours.cWhite,
		borderBottomColor: Colours.cPrimary,
		borderWidth: 0,
		borderBottomWidth: 1
	},
	activeTabTextStyle: {
		color: Colours.cBlack,
	}
};