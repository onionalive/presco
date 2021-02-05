import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Animated, Easing } from 'react-native';
import axios from 'axios';
import Colours from 'app/styles/Colours';

/* user imports */

class ProgressBar extends Component {

	state = {
		level: new Animated.Value(0),
		progress: 0
	};

	componentDidMount() {
		const { progress } = this.props;
		const update = progress ? progress : 0;
		this.setState({
			...this.state,
			progress: update ? update : 0
		})
	}

	// setBarLength(event) {
	// 	console.log('event properties: ', event);
	// 	console.log('width: ', event.nativeEvent.layout.width)
	// }

	setBarLength(event) {
		const { progress } = this.state;
		Animated.timing(                  // Animate over time
			this.state.level,            // The animated value to drive
			{
				toValue: event.nativeEvent.layout.width * progress,                   // Animate to opacity: 1 (opaque)
				duration: 800,              // Make it take a while
				easing: Easing.Out,
			}
		).start();
	}

	render() {
		const { level } = this.state;
		const { textStyle, initStyle, flexCenter } = styles;

		return (
			<View onLayout={(event) => this.setBarLength(event)}
				style={{
				height: 8,
				width: '100%',
				backgroundColor: Colours.cBlack
			}}>
				<Animated.View style={{
					height: '100%',
					width: level,
					backgroundColor: Colours.cPrimary
				}}></Animated.View>
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

export default ProgressBar;
