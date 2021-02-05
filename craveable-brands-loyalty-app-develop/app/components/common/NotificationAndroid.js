import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Animated, SafeAreaView } from 'react-native';
import axios from 'axios';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import Dimensions from 'Dimensions';
import { ifIphoneX } from 'react-native-iphone-x-helper';
class Notification extends Component {

	state = {
		offset: new Animated.ValueXY(),
		mounted: false
	};

	open() {
		Animated.spring(                  // Animate over time
			this.state.offset,            // The animated value to drive
			{
				toValue: { x:0, y: 0 },                   // Animate to opacity: 1 (opaque)
				// duration: 270,              // Make it take a while
			}
		).start();

		setTimeout(() => {
			Animated.spring(                  // Animate over time
				this.state.offset,            // The animated value to drive
				{
					toValue: { x:0, y: -90 },                   // Animate to opacity: 1 (opaque)
					// duration: 270,              // Make it take a while
				}
			).start(this.props.setNotificationFalse());
		}, 5000);
	}

	componentWillReceiveProps(props) {
		if (props.showNotification) {
			this.open();
		}
	}

	componentDidMount() {
		Animated.spring(                  // Animate over time
			this.state.offset,            // The animated value to drive
			{
				toValue: { x:0, y: -110 },                   // Animate to opacity: 1 (opaque)
				// duration: 270,              // Make it take a while
			}
		).start(this.props.setNotificationFalse())
		
		setTimeout(() => {
			this.setState({
				mounted: true
			})
		}, 500);
	}

	render() {
		const { notificationText } = this.props;
		const { offset, mounted } = this.state;
		const { notification, textStyle } = styles;

		return (
			<Animated.View style={[offset.getLayout(), {
				zIndex: 10000,
				minHeight: 80,
				position: 'absolute',
				width: '100%'
			}]}>
				<View style={notification}>
					<Text style={textStyle}>{notificationText}</Text>
				</View>
			</Animated.View>
		);
	}
}

const styles = {
	textStyle: {
		...Fonts.fUtility,
		color: Colours.cWhite,
		padding: 10
	},
	notification: {
		backgroundColor: 'rgba(22,22,22,1)',
		paddingTop: 10,
		height: 80,
		width: '100%',
		position: 'absolute',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		left: 0,
		top: 0
	}
};

export default Notification;
