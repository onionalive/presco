import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { Text, View, Dimensions, Platform, SafeAreaView, TouchableHighlight } from 'react-native';
import axios from 'axios';
import MapView from 'react-native-maps';
import Images from 'app/img/Image';
import _ from 'lodash';
import ModalHeader from 'app/components/common/ModalHeader';
import ActionSheet from 'react-native-actionsheet';
import Direction from 'app/common/Direction';
import { ifIphoneX } from 'react-native-iphone-x-helper';
const { width, height } = Dimensions.get('window');
const LATITUDE_DELTA = 0.045;
const LONGITUDE_DELTA = 0.02;
const direction = new Direction();
const CANCEL_INDEX = 0;
const options = [ 'Cancel', 'Maps', 'Google Maps'];
const menu_title = 'Open directions in';

const Button = (props) => {
	return(
		<TouchableHighlight onPress={props.action} underlayColor='transparent' style={props.styles.directionButto}>
        	<View>
         	 	<Text style={styles.buttonText}>{props.title}</Text>
       		</View>
     	</TouchableHighlight>
	)
}

class ModalMap extends Component {

	constructor (props) {
    	super(props)
	    const { navigation } = props;
		const { params } = navigation.state;
	    this.state = {
	      store: params.store,
	      region: null,
	      mapLoaded: false
	    }
	  }

	routeToStoreInfo = () => {
		const { navigation } = this.props;
		const { store } = this.state;
		navigation.navigate('ModalStoreInfoNav', { store });
	}

	componentDidMount() {
		const { store } = this.state;
		const initRegion = {
				latitude: parseFloat(store.latitude),
				longitude: parseFloat(store.longitude),
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
		}
    	this.setState({mapLoaded: true, region: initRegion})
  	}

	renderMapView = () => {
		const { navigation } = this.props;
		const { region } = this.state;
		const { initStyle, modalMargin, map } = styles;
		const containerStyle = Platform.OS === 'ios' ? modalMargin : {};
		return (
				<View style={ containerStyle }>
					<ModalHeader
					 	action={() => navigation.goBack(null)} 
						title='STORE LOCATION'
						img={Images.closeWhite}
					/>
					<MapView
						style={map}
						region={region}
						zoomEnabled={false}
						scrollEnabled={false}
						rotateEnabled={false}
					>
						<MapView.Marker
							coordinate={{
								latitude: region.latitude,
								longitude: region.longitude
							}}
							image={Images.mapPin}
							onPress={(e) => { e.stopPropagation(); this.routeToStoreInfo();}}
						/>
					</MapView>
					{ this.renderButton() }
					<ActionSheet
				    	ref={o => this.ActionSheet = o}
				        title={menu_title}
				        options={options}
				        cancelButtonIndex={CANCEL_INDEX}
				        onPress={this.handlePress}
				    />
				</View>
		)
	}

	handleDirectionAction = () => {
		const { store } = this.state;
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


	renderButton = () => {
	 	return (
	 		<View style={styles.buttomButtonContainer}>
				<TouchableHighlight onPress={() => this.routeToStoreInfo()} underlayColor='transparent' style={styles.infoButton}>
			        <View>
			          <Text style={styles.buttonText}>STORE INFO</Text>
			        </View>
			     </TouchableHighlight>
			     <TouchableHighlight onPress={() => this.handleDirectionAction()} underlayColor='transparent' style={styles.directionButton}>
			        <View>
			          <Text style={styles.buttonText}>DIRECTIONS</Text>
			        </View>
			     </TouchableHighlight>
		     </View>
	 	)
	 }

	render() {
		if(!this.state.mapLoaded) {
		     return null;
		 } else {
		     return this.renderMapView();
		 }
	}
}

const styles = {
	modalMargin: {
		marginTop: 20,
		backgroundColor: Colours.cWhite
	},
	 buttonText: {
        ...Fonts.fPrimary,
        color: Colours.cWhite,
        fontSize: 14
    },
    infoButton: {
    	flex: 1,
    	minHeight: 50,
    	// width: '50%',
    	backgroundColor: Colours.cBlack,
    	justifyContent: 'center',
		alignItems: 'center',
    },
    directionButton: {
    	flex: 1,
    	minHeight: 50,
    	// width: '50%',
    	backgroundColor: Colours.cPrimary,
    	justifyContent: 'center',
		alignItems: 'center',
    },

	buttomButtonContainer: {
        flex: 1,
        position: 'absolute',
        width: '100%',
    	bottom: 82,
    	flexDirection: 'row',
  		justifyContent: 'center',
		alignItems: 'center'
  	},
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		flex: 1
	},
	flexCenter: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	map: {
		// flex: 1,
		width: '100%',
		minHeight: height
	}
};

export default ModalMap;
