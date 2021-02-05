import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TouchableHighlight } from 'react-native';
import axios from 'axios';

/* user imports */

class Button extends Component {
	render() {
		const { title, action, underlayColor, style, children, accessibilityLabel, accessible } = this.props;
		const fallback = () => console.log('No action');
		const func = action ? action : fallback;

		return (
			<TouchableHighlight
				onPress={ () => {
					try {
						func(); 
					} catch(err) {
						console.log('Button click threw an error:', err);
					}
				}}
				activeOpacity={0.5}
				underlayColor={underlayColor ? underlayColor : 'rgba(255,255,255,0)'}
				style={style}
				accessible={accessible ? accessible : true}
				accessibilityLabel={accessibilityLabel ? accessibilityLabel : 'Button'}
			>
				{children}
			</TouchableHighlight>
		);
	}
}

export default Button;
