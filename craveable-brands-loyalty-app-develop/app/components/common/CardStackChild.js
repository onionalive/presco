import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, Image, View, Animated } from 'react-native';
import axios from 'axios';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';

/* user imports */
class CardStackChild extends Component {
	componentWillMount() {
		const { index } = this.props;

		this.marginRight = new Animated.Value(index * 10);
	}

	componentWillReceiveProps({ toss, index, multiplier }) {

		// if (!toss) {
		// 	console.log('made it here then', this.marginRight + (multiplier * 10));
		// 	const dx = (index * 10) + (multiplier * 10);
		// 	Animated.timing(                  // Animate over time
		// 		this.marginRight,            // The animated value to drive
		// 		{
		// 			toValue: dx,                   // Animate to opacity: 1 (opaque)
		// 			duration: 270,              // Make it take a while
		// 		}
		// 	).start();
		// }
	}

	render() {
		const { image, title, subTitle, index, multiplier } = this.props;		
		// const adjust = () => {
		// 	Animated.timing(                  // Animate over time
		// 		this.height,            // The animated value to drive
		// 		{
		// 			toValue: 47,                   // Animate to opacity: 1 (opaque)
		// 			duration: 270,              // Make it take a while
		// 		}
		// 	).start();
		// }

		return (
			<Animated.View style={[styles.container, {
				marginRight: this.marginRight,
				left: 20,
				padding: 10,
				shadowColor: "#000000",
				shadowOpacity: 0.25,
				shadowRadius: 5,
				shadowOffset: {
					height: 3,
					width: 0
				},
			}]}>
				<Text style={styles.name}>{title}</Text>
				<Text style={styles.subTitle}>{subTitle}</Text>
			</Animated.View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: Colours.cOffWhite,
	},
	textContainer: {
		backgroundColor: 'transparent',
		alignItems: 'center',
		position: 'absolute',
		left: 0,
		bottom: 0,
		marginLeft: 10,
		paddingBottom: 10,
		alignItems: 'flex-start',
	},
	text: {
		margin: 20,
	},
	name: {
		...Fonts.fHeadingLarge,
		color: 'black',
		paddingTop: 60,
		paddingLeft: 10,
		paddingRight: 10,
		marginBottom: 30
	},
	subTitle: {
		fontSize: 15,
		color: 'black',
		paddingLeft: 10,
		paddingRight: 10,
	},
};

export default CardStackChild;
