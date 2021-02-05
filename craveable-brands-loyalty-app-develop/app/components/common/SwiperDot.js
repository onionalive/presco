import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';
import axios from 'axios';

/* user imports */

class SwiperDot extends Component {
	render() {
		const { dot, activeDot, altDot, altActiveDot } = styles;
		const { alt } = this.props;
		const activeDotStyles = alt ?
			[altDot, altActiveDot] :
			[dot, activeDot];
		const dotStyles = alt ?
			[altDot] :
			[dot];

		if (this.props.active) {
			return (
				<View style={activeDotStyles}></View>
			);
		} else {
			return (
				<View style={dotStyles}></View>
			);
		}
	}
}

const styles = {
	active: {
		backgroundColor: 'blue'
	},
	dot: {
		backgroundColor:'rgba(0,0,0,0.2)', bottom: 10, width: 20, height: 4,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 10, marginBottom: 3
	},
	activeDot: {
		backgroundColor:'rgba(0,0,0,1)', bottom: 10, width: 20, height: 4,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 10, marginBottom: 3
	},
	altDot: {
		backgroundColor:'rgba(255,255,255,0.2)', bottom: 10, width: 20, height: 4,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 10, marginBottom: 3
	},
	altActiveDot: {
		backgroundColor:'rgba(255,255,255,1)', bottom: 10, width: 20, height: 4,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 10, marginBottom: 3
	}
};

export default SwiperDot;
