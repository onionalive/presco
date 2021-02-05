import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Animated, Image } from 'react-native';
import axios from 'axios';
import Fonts from 'app/styles/Fonts';
import Button from 'app/components/common/Button';
import Images from 'app/img/Image';
const { chevronRightBlack, offer } = Images;
import * as Animatable from 'react-native-animatable';

/* user imports */

class Accordian extends Component {

	state = {
		height: new Animated.Value(47),
		open: false
	};

	open() {
		const { open } = this.state;
		if (!open) {
			Animated.timing(                  // Animate over time
				this.state.height,            // The animated value to drive
				{
					toValue: 116,                   // Animate to opacity: 1 (opaque)
					duration: 270,              // Make it take a while
				}
			).start();

			this.refs.chevron.transitionTo({
				transform: [{ rotate: '90deg'}]
			});

			this.setState({
				...this.state,
				open: true
			});
		} else {
			Animated.timing(                  // Animate over time
				this.state.height,            // The animated value to drive
				{
					toValue: 47,                   // Animate to opacity: 1 (opaque)
					duration: 270,              // Make it take a while
				}
			).start();

			this.refs.chevron.transitionTo({
				transform: [{ rotate: '0deg'}]
			});

			this.setState({
				...this.state,
				open: false
			});
		}
	}

	renderValue(item) {
		switch (item.transactionType.id) {
			case '1':
				return `$${item.purchaseValue.toFixed(2)}`;
			case '21':
				return `+$${item.loyaltyValue.toFixed(2)}`;
			default:
				return '';
		}
	}

	render() {
		const { height } = this.state;
		const { textStyle, initStyle, flexCenter, accordian, button, accordianTextStyle, boldTextStyle } = styles;
		const { item } = this.props;
		
		return (
			<Animated.View style={ [flexCenter, accordian, {height: height}] }>
				<Button action={() => this.open() } underlayColor='rgba(0,0,0,0)' style={button}>
					<View>
						<View style={{ flexDirection: 'row', height: 47, alignItems: 'center' }}>
							<View style={{width: 46}}>
								<Animatable.Image 
									ref="chevron"
									style={{height: 17, width: 17, alignSelf: 'center'}} source={chevronRightBlack} 
								/>
							</View>
							<Text style={[ textStyle, {flex: 5} ]}>{item.transactionDateTime}</Text>
							<View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
								<Text style={ boldTextStyle }>{this.renderValue(item)}</Text>
								{this.props.offer &&<Image style={{height: 24.5, width: 24, marginLeft: 10, alignSelf: 'center'}} source={Offer} />
								}
							</View>
						</View>
						<View style={{ flexDirection: 'row', height: 69, alignItems: 'center' }}>
							<Text style={[ accordianTextStyle, {flex: 3, paddingLeft: 63} ]}>{item.storeName}</Text>
							<Text style={[ accordianTextStyle, {flex: 3, textAlign: 'right'} ]}>{item.transactionType.value}</Text>
						</View>
					</View>
				</Button>
			</Animated.View>
		);
	}
}

const styles = {
	textStyle: {
		...Fonts.fBodyText
	},
	boldTextStyle: {
		...Fonts.fUtilityBold,
		fontSize: 16
	},
	accordianTextStyle: {
		...Fonts.fUtility,
		color: Colours.cGrey
	},
	initStyle: {
		flex: 1
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	accordian: {
		backgroundColor: 'white',
		overflow: 'hidden',
		paddingLeft: 10,
		paddingRight: 10
	},
	button: {
		height: '100%',
		width: '100%'
	}
};

export default Accordian;
