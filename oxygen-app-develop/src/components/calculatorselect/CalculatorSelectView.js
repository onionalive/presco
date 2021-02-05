import React, { Component } from 'react';
import { bindActionCreators, Store } from 'redux';
import {
  Text,
  Image,
  Switch, 
  TouchableHighlight, 
  View, 
  StyleSheet
} from 'react-native';
import { Oxygen } from '../../styles/colours';
import Header from '../common/Header';
import Dimensions from 'Dimensions';

import CalcOption from '../common/CalcOption';
import LayoutBorder from '../common/LayoutBorder';
import {Actions} from 'react-native-router-flux';

class CalculatorSelectView extends Component {

	measureView(event) {
		this.setState({
			x: event.nativeEvent.layout.x,
			y: event.nativeEvent.layout.y,
			width: event.nativeEvent.layout.width,
			height: event.nativeEvent.layout.height
		});
	}
  
	render() {

		const { heading } = styles;

		const resizing = this.props.small ? small : large;

		return (
			<View style={{flex: 1, backgroundColor: Oxygen.blue }}>
				<Header returnArrow={true} prev={() => Actions.pop()} />
				<LayoutBorder>
					<Text style={[heading, resizing.heading]}>Loan Calculators</Text>
					<CalcOption text="How much can I borrow?" img={require('../../img/borrow-button.png')} next={Actions.borrowSwiper}/>
					<CalcOption text="What are my repayments?" img={require('../../img/repayments-button.png')} next={Actions.repaymentsPathway} />
					<CalcOption text="What is my stamp duty?" img={require('../../img/stamp-duty-button.png')} next={Actions.stampDutyPathway} />
				</LayoutBorder>
			</View>
		);
	}
}

const small = {
	heading: {
		paddingTop: 10,
		fontSize: 17
	},
	calcOptionHeading: {
		fontSize: 17
	}
}

const large = {
	heading: {
		paddingTop: 40,
		fontSize: 20
	}
}

const styles = {
	heading: {
		color: Oxygen.grey,
		textAlign: 'center',
		marginBottom: 10,
		fontFamily: 'ProximaNova-Bold'
	}
};

//<View style={[mainViewStyles.mainBorder, {height: Dimensions.get('window').height - this.state.height - 20}]}>

export default CalculatorSelectView;
