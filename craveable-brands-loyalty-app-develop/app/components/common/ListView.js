import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';
import axios from 'axios';

/* user imports */
class ListView extends Component {
	render() {
		const { textStyle, initStyle, flexCenter } = styles;

		return (
			<View style={ [flexCenter, initStyle] }>
				{this.props.children}
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

export default ListView;
