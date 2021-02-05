import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { Text, View, Dimensions, Platform } from 'react-native';
import axios from 'axios';
import MapView from 'react-native-maps';
import Images from 'app/img/Image';
import find from 'lodash/find';

const { width, height } = Dimensions.get('window');
const LATITUDE_DELTA = 0.045;
const LONGITUDE_DELTA = 0.02;

class StoreMapView extends Component {

	constructor (props) {
    	super(props)
    	const { storeList } = props;
		const store1 = this.findNextStoreWithLocation(storeList);
		const region = {
			latitude: parseFloat(store1.latitude),
			longitude: parseFloat(store1.longitude),
			latitudeDelta: LATITUDE_DELTA,
			longitudeDelta: LONGITUDE_DELTA,
		}
	    this.state = {
		     region: region,
		     mapLoaded: false
	    }
	}

	handleMarkerPress = (store) => {
		if(store.id && store.title) {
			const { navigation } = this.props;
			navigation.navigate('ModalStoreInfoNav', { store });
		}
	}

    onRegionChangeComplete = (region) => {
    	if (!this.state.mapLoaded) return;
		this.setState({ region });
	}

	findNextStoreWithLocation = (storeList) => {
		return find(storeList, (store) => { return store.latitude && store.longitude })
	}

  	componentWillReceiveProps(nextProps) {
    	if(this.props.storeList !== nextProps.storeList) {
      		const store1 = this.findNextStoreWithLocation(nextProps.storeList);
			const region = {
					latitude: parseFloat(store1.latitude),
					longitude: parseFloat(store1.longitude),
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA,
			};
      		this.setState({region});
    	}
  	}

	renderMarkers = ( stores ) => {
		return stores.map((store, index) => {
			if(!store.latitude || !store.longitude){
				return
			}
			return (
				<MapView.Marker
					coordinate={{
						latitude: parseFloat(store.latitude),
						longitude: parseFloat(store.longitude)
					}}
					image={Images.mapPin}
					key={index}
					onPress={(e) => { e.stopPropagation(); this.handleMarkerPress(store.store); }}
				>
	            </MapView.Marker>
			);
		});
	}

	render() {
		const { textStyle, initStyle, flexCenter, map } = styles;
		const { storeList, mapHeight } = this.props;
		const { region } = this.state;
		return (
			<View style={flexCenter}>
				<MapView
					onMapReady={() => {
			            this.setState({ mapLoaded: true });
			        }}
			        initialRegion={region}
					style={[map, {minHeight: mapHeight}]}
					cacheEnable={Platform.OS === 'android'}		
          			region={region}
          			onRegionChangeComplete={this.onRegionChangeComplete}
				>
					{this.renderMarkers(storeList)}
				</MapView>
			</View>
		)
	}
}

const styles = {
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
		width: '100%',
	}
};

export default StoreMapView;
