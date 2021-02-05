import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, PanResponder, Animated, Dimensions } from 'react-native';
import axios from 'axios';

/* user imports */
const { width, height } = Dimensions.get('window');
class CardStackAnimator extends Component {
	state = {
		multiplier: 0
	};

	// open() {
	// 	const { multiplier } = this.state;
	// 	Animated.timing(                  // Animate over time
	// 		this.state.height,            // The animated value to drive
	// 		{
	// 			toValue: 47,                   // Animate to opacity: 1 (opaque)
	// 			duration: 270,              // Make it take a while
	// 		}
	// 	).start();

	// 	this.setState({
	// 		...this.state,
	// 		open: false
	// 	});
	// }

	/**
	 * Set up all delta Responder methods and handlers
	 */
	componentWillMount() {
		let { onTossRight, onTossLeft, index } = this.props;
		this.pan = new Animated.ValueXY();
		this.height = new Animated.Value(300 + (index * 10));
		this.top = new Animated.Value(100 - (index * 5));

		this.cardPanResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
				onPanResponderMove: Animated.event([
					null,
					{ dx: this.pan.x, dy: this.pan.y },
				]),
			onPanResponderRelease: (e, { dx }) => {
				const absDx = Math.abs(dx);
				const direction = absDx / dx;

				if (absDx > 120) {
					Animated.decay(this.pan, {
					velocity: { x: 3 * direction, y: 0 },
					deceleration: 0.995,
					}).start(dx > 0 ? onTossRight : onTossLeft);
				} else {
					Animated.spring(this.pan, {
					toValue: { x: 0, y: 0 },
					friction: 4.5,
					}).start();
				}
			},
		});
	}
	
	componentWillReceiveProps({ toss, onTossRight, onTossLeft }) {
		if (toss && !this.props.toss) {
			if (toss === 'left') {
				return Animated.timing(this.pan, {
					toValue: { x: 3 * -180, y: 0 },
					duration: 400,
				}).start(onTossLeft);
			}

			return Animated.timing(this.pan, {
				toValue: { x: 3 * 180, y: 0 },
				duration: 400,
				}).start(onTossRight);
		} else {
			const update = this.state.multiplier + 1;
			const multiplier = update + this.props.index;

			// Animated.timing(                  // Animate over time
			// 	this.height,            // The animated value to drive
			// 	{
			// 		toValue: 200 + (multiplier * 10),                   // Animate to opacity: 1 (opaque)
			// 		duration: 400,              // Make it take a while
			// 	}
			// ).start();

			// Animated.timing(                  // Animate over time
			// 	this.top,            // The animated value to drive
			// 	{
			// 		toValue: 100 - (multiplier * 5),                   // Animate to opacity: 1 (opaque)
			// 		duration: 400,              // Make it take a while
			// 	}
			// ).start();

			this.setState({
				multiplier: update
			});
		}
	}
	
	render() {
		let { children, style, index, toss } = this.props;
		const multiplier = this.state.multiplier;

		const rotateCard = this.pan.x.interpolate({
			inputRange: [-200, 0, 200],
			outputRange: ['10deg', '0deg', '-10deg'],
		});
		const animatedStyle = {
			transform: [
				{ translateX: this.pan.x },
				{ translateY: this.pan.y },
				{ rotate: rotateCard },
			],
		};

		const heightAndOffset = {
			height: this.height,
			top: this.top,
		}
			
		return (
			<Animated.View
				{...this.cardPanResponder.panHandlers}
				style={[styles.card, animatedStyle, style, heightAndOffset ]}
			>
				{React.cloneElement(children, { toss, multiplier })}
			</Animated.View>
		);
	}
}
	
const styles = {
	card: {
		position: 'absolute',
		width: width - 60,
		margin: 10,
	},
};

export default CardStackAnimator;
