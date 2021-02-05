import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Platform, Text, View, TouchableHighlight, Image } from 'react-native';
import { Oxygen } from '../../styles/colours';
import Layout from '../../styles/layout';
import { DeviceHeight, DeviceWidth } from '../../styles/sizing';
import Typography from '../../styles/typography';
import Dimensions from 'Dimensions';
import axios from 'axios';

//components
import CalcButton from '../common/CalcButton';
import VerificationContainer from '../common/VerificationContainer';

class CalculatorView extends Component {

	_updateValue(id, add) {
		this.props.updateValue(id, add);
	}

	_resetValue(id) {
		this.props.resetValue(id);
	}

	render() {
		const {
			textStyle,
			initStyle,
			calcContainer,
			rowContainer,
			income,
			margin,
			text,
			valueText,
			tickImage,
			taxContainer,
			titleContainer
		} = styles;

		const { button, zeroButton, cancelButton, btnColour, btnCancelColour } = buttonStyles;
		const { verification, nextState, btnNext, btnState, btnActive, btnInactive } = nextStyles;
		const { flexCenter } = Layout;
		const { prev, next, id, calcTitle, value, tickBool, prefix, suffix } = this.props;

		const dynamic = this.props.small ? small : large;
		let btnHeight = this.props.small ? 68 : 84;

		const currentHeight = Dimensions.get('window').height;

		switch (true) {
			case (currentHeight >= DeviceHeight.iPhone7Plus):
				btnHeight = 100;
				break;
			case (currentHeight === DeviceHeight.iPad):
				btnHeight = 50;
				break;
			case (Platform.OS === 'android' && currentHeight > 62):
				btnHeight = 80;
				break;
			default:
				break;
		}

		return (
			<View ref='container'>
				<View style={[taxContainer, dynamic.taxContainer]}>
					<View style={[titleContainer, dynamic.titleContainer]}>
						<Text style={[text, dynamic.text]}>{calcTitle}</Text>
					</View>
					<View style={[income, margin]}>
						<Text style={[valueText, dynamic.valueText]}>{ !prefix ? '' : '$' }{value.toLocaleString()}{ suffix ? '%' : '' }</Text>
					</View>
				</View>
				<View style={calcContainer}>
					<View style={rowContainer}>
						<CalcButton height={btnHeight} buttonStyle={[button, dynamic.button]} buttonTextColour={btnColour} text="7" action={() => this._updateValue(id, 7)} />
						<CalcButton height={btnHeight} buttonStyle={[button, dynamic.button]} buttonTextColour={btnColour} text="8" action={() => this._updateValue(id, 8)} />
						<CalcButton height={btnHeight} buttonStyle={[button, dynamic.button]} buttonTextColour={btnColour} text="9" action={() => this._updateValue(id, 9)} />
					</View>
					<View style={rowContainer}>
						<CalcButton height={btnHeight} buttonStyle={[button, dynamic.button]} buttonTextColour={btnColour} text="4" action={() => this._updateValue(id, 4)} />
						<CalcButton height={btnHeight} buttonStyle={[button, dynamic.button]} buttonTextColour={btnColour} text="5" action={() => this._updateValue(id, 5)} />
						<CalcButton height={btnHeight} buttonStyle={[button, dynamic.button]} buttonTextColour={btnColour} text="6" action={() => this._updateValue(id, 6)} />
					</View>
					<View style={rowContainer}>
						<CalcButton height={btnHeight} buttonStyle={[button, dynamic.button]} buttonTextColour={btnColour} text="1" action={() => this._updateValue(id, 1)} />
						<CalcButton height={btnHeight} buttonStyle={[button, dynamic.button]} buttonTextColour={btnColour} text="2" action={() => this._updateValue(id, 2)} />
						<CalcButton height={btnHeight} buttonStyle={[button, dynamic.button]} buttonTextColour={btnColour} text="3" action={() => this._updateValue(id, 3)} />
					</View>
					<View style={rowContainer}>
						<CalcButton height={btnHeight} buttonStyle={[zeroButton, dynamic.zeroButton]} buttonTextColour={btnColour} text="0" action={() => this._updateValue(id, 0)} />
						<CalcButton height={btnHeight} buttonStyle={[cancelButton, dynamic.cancelButton]} buttonTextColour={btnCancelColour} text="C" action={() => this._resetValue(id)} />
					</View>
				</View>
				<View style={btnNext}>
					<TouchableHighlight
						onPress={next}
						underlayColor='rgba(0,0,0,0)'
					>
						<View style={[btnState, tickBool ? btnActive : btnInactive ]}>
							<Image style={ tickImage } source={tickBool ? require('../../img/tick-active-white.png') : require('../../img/tick-inactive-white.png')} />
							<Text style={ nextState }>Next</Text>
						</View>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

const small = {
	text: {
		fontSize: 20
	},
	valueText: {
		fontSize: 30
	},
	titleContainer: {
		height: 40,
	},
	button: {
		width: Dimensions.get('window').width/4,
	},
	zeroButton: {
		width: Dimensions.get('window').width/2 + 6,
	},
	cancelButton: {
		width: Dimensions.get('window').width/4,
	},
	taxContainer: {
		width: Dimensions.get('window').width - 60,
	}
}

const large = {
	text: {
		fontSize: 24
	},
	valueText: {
		fontSize: 38
	},
	titleContainer: {
		height: 60,
	},
	button: {
		height: Dimensions.get('window').height/9.5,
		width: Dimensions.get('window').width/4,
	},
	zeroButton: {
		height: Dimensions.get('window').height/9.5,
		width: Dimensions.get('window').width/2 + 6,
	},
	cancelButton: {
		height: Dimensions.get('window').height/9.5,
		width: Dimensions.get('window').width/4,
	},
	taxContainer: {
		width: Dimensions.get('window').width - 80,
	}
}

const test = {
	container: {
		flex: 1,
		height: Dimensions.get('window').height/11,
		width: Dimensions.get('window').width/4*3 + 13,
		backgroundColor: '#EEE',
		paddingRight: 13,
		marginTop: 9,
		justifyContent: 'center',
	}
}

const styles = {
	textStyle: {
		fontSize: 20
	},
	margin: {
		marginLeft: 3,
		marginRight: 3,
		marginTop: 9,
	},
	calcContainer: {
		flex: 1,
		alignItems: 'center',
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	income: {
		height: Dimensions.get('window').height/11,
		width: Dimensions.get('window').width/4*3 + 13,
		backgroundColor: '#EEE',
		paddingRight: 13,
		marginTop: 9,
		justifyContent: 'center',
	},
	text: {
		color: Oxygen.grey,
		textAlign: 'right',
		fontFamily: 'ProximaNova-Bold'
	},
	valueText: {
		color: Oxygen.black,
		textAlign: 'right',
		fontFamily: 'ProximaNova-Regular'
	},
	taxContainer: {
		paddingTop: 10,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tickImage: {
		height: 18,
		width: 18,
		marginTop: Platform.OS === 'android' ? 9 : 5,
		marginRight: 4,
		resizeMode: 'contain',
		justifyContent: 'center',
	},
};

const nextStyles = {
	nextState: {
		color: Oxygen.white,
		fontSize: 20,
		padding: 4,
		textAlign: 'center',
		fontFamily: 'ProximaNova-Bold',
		textAlign: 'right',
	},
	btnNext: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginBottom: 10,
		marginRight: 4,
	},
	btnState: {
		flexDirection: 'row',
		padding: 10,
		paddingLeft: 14,
		paddingRight: 14,
		borderRadius: 4
	},
	btnInactive: {
		backgroundColor: Oxygen.lightGrey,
	},
	btnActive: {
		backgroundColor: Oxygen.green,
	}
};

const buttonStyles = {
	button: {
		flex: 1,
		backgroundColor: Oxygen.btnCalc,
		marginLeft: 3,
		marginRight: 3,
		marginTop: 9,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#AAAAAA',
		shadowOpacity: 0.5,
		shadowOffset: {width: 0, height: 2}
	},
	zeroButton: {
		flex: 2,
		backgroundColor: Oxygen.btnCalc,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#AAAAAA',
		shadowOpacity: 0.5,
		shadowOffset: {width: 0, height: 2}
	},
	cancelButton: {
		flex: 1,
		backgroundColor: Oxygen.red,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#333333',
		shadowOpacity: 0.5,
		shadowOffset: {width: 0, height: 2}
	},
	btnColour: {
		color: Oxygen.grey
	},
	btnCancelColour: {
		color: Oxygen.white
	}
}
export default CalculatorView;
