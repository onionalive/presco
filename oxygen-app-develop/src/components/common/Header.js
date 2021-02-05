import React, { Component } from 'react';
import { Platform, Text, View, TouchableHighlight, Image } from 'react-native';
import { Oxygen } from '../../styles/colours';
import Layout from '../../styles/layout';

// components
import Logo from './Logo';
import HomeButton from './HomeButton';

class Header extends Component {
	render() {
		const { textStyle, viewStyle, flex, right, left, dummy, container } = styles;
		const { flexCenter } = Layout;

		return (
			<View style={[viewStyle]}>
				{ this.props.returnArrow &&
					this.props.returnArrow ? <TouchableHighlight
					onPress={this.props.prev}
					underlayColor='rgba(0,0,0,0)'>
						<Image
						style={[left]}
						source={require('../../img/arrow-return-white.png')}
						/>
					</TouchableHighlight> : <View style={[dummy]}></View> }
				<Logo />
				<HomeButton/>
			</View>
		);
	}
};

const styles = {
	textStyle: {
		fontSize: 20
	},
	viewStyle: {
		backgroundColor: Oxygen.blue,
		height: 62,
		paddingTop: Platform.OS === 'android' ? 20 : 25,
		paddingLeft: 20,
		paddingRight: 20,
		elevation: 2,
		zIndex: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	left: {
		width: 31,
		height: 30,
		resizeMode: 'contain'
	},
	dummy: {
		width: 31,
		height: 30
	},
	flex: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10
	},
};

export default Header;
