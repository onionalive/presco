import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Linking, Platform } from 'react-native';
import axios from 'axios';
import MapView from 'react-native-maps';
import Images from 'app/img/Image';
const LATITUDE_DELTA = 0.045;
const LONGITUDE_DELTA = 0.02;
/* user imports */

class Map extends Component {
	/**
	 * Handle the map pressed. The default values there
	 * will need to be updated with state or args.
	 */
	handleMapPress = () => {
		const { navigation, favouriteStore } = this.props;
		navigation.navigate('ModalStoreMapNav', { store: favouriteStore });
	}

	render() {
		const { textStyle, initStyle, flexCenter } = styles;
		const favouriteStore = this.props.favouriteStore;
		const region = {
			latitude: parseFloat(favouriteStore.latitude),
			longitude: parseFloat(favouriteStore.longitude),
			latitudeDelta: LATITUDE_DELTA,
			longitudeDelta: LONGITUDE_DELTA
		}

		return (
			<View style={initStyle}>
				<MapView
					style={styles.map}
					region={region}
					zoomEnabled={false}
					scrollEnabled={false}
					rotateEnabled={false}
					onPress={this.handleMapPress}
				>
					<MapView.Marker
						coordinate={{
							latitude: parseFloat(region.latitude),
							longitude: parseFloat(region.longitude),
						}}
						image={Images.mapPin}
					/>
				</MapView>
			</View>
		);
	}
}

const styles = {
	textStyle: {
		fontSize: 20
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	map: {
		width: '100%',
		minHeight: 190
	}
};

export default Map;
