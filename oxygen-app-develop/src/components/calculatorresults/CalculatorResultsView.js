import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import { Oxygen } from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import axios from 'axios';

import Dimensions from 'Dimensions';
import BrokerButton from '../common/BrokerButton';
import ShareContainer from '../common/ShareContainer';
import {Actions} from 'react-native-router-flux';
import ResultsItem from '../common/ResultsItem';

class CalculatorResultsView extends Component {
  
	render() {

		const { textStyle, initStyle, disclaimer } = styles;
		const { flexCenter } = Layout;

		const { prev, emailBody, subject } = this.props;
		const dynamic = this.props.small ? small : large;

		return (
			<View style={{ width: Dimensions.get('window').width - 30 }}>
				<View style={this.props.marginTop ? styles.container : {flex: 1}}>
					<View style={!this.props.isRepayment ? [styles.margins, {justifyContent: 'flex-start'}] : [styles.margins, dynamic.marginFirstChild]}>
						{this.props.children}
						<BrokerButton
							action={() => this.props.updateLoading(false)}
							width={Dimensions.get('window').width - 60}
						/>
						<Text style={disclaimer}>Please note the results from each calculator should be used as an indication only and are an estimate based on the information you input. For more detailed information, please contact your Oxygen broker.</Text>
					</View>
				</View>
			</View>
		);
	}
}

const small = {
	marginFirstChild: {
		marginTop: 70,
	}
}

const large = {
	marginFirstChild: {
		marginTop: 100,
	}
}

const styles = {
	marginLastChild: {
		marginBottom: 100,
	},
	marginTop: {
		marginTop: 15,
	},
	marginBottom: {
		marginBottom: 10,
	},
	margins: {
		paddingLeft: 8,
		paddingRight: 8, 
		justifyContent: 'center',
	},
	valueText: {
		flex:1,
		color: '#fff',
		fontSize: 42,
		fontWeight: 'bold',
		textAlign: 'right',
	},
	button: {
		flex: 1,
		backgroundColor: '#76CA44',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		paddingTop: 14,
		paddingBottom: 14,
		paddingRight: 20,
		paddingLeft: 20,
	},
	shareContainer: {
		justifyContent: 'center', 
	}, 
	text: {
		flex:1,
		color: '#000',
		fontSize: 24,
		textAlign: 'right',
	},
	btnText: {
		flex:1,
		color: '#fff',
		fontSize: 24,
		fontFamily: 'ProximaNova-Bold',
		textAlign: 'center',
	},
	container: {  
		flex: 1, 
		paddingTop: 74,
	},
	disclaimer: {
		color: Oxygen.grey,
		fontSize: 10,
		textAlign: 'center',
		padding: 10,
		fontFamily: 'ProximaNova-Bold'
	},
};

export default CalculatorResultsView;
