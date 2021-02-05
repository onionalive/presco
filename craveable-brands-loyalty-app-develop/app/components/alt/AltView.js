import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

/* user imports */
class Alt extends Component {
	render() {
		const { textStyle, initStyle, flexCenter } = styles;

		return (
			<View style={ [flexCenter, initStyle] }>
				<Text style={ textStyle }>Alt</Text>
				<TouchableOpacity
				onPress={ () => this.props.navigation.goBack() }
				style={{
				  padding:20,
				  borderRadius:20,
				  backgroundColor:'purple',
				  marginTop:20
				}}>
				<Text>{'Go back a screen'}</Text>
			  </TouchableOpacity>
			</View>
		);
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
		justifyContent: 'center',
		alignItems: 'center'
	},
};

export default Alt;
