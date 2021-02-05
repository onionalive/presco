import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';
import Colours from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

class PropertyInvestmentsPathwayView extends Component {

	state = { exampleState: [] };

	componentWillMount() {
		axios.get('https://rallycoding.herokuapp.com/api/music_albums')
			.then(response => this.setState({ exampleState: response.data }));
	}
  
	render() {

		console.log(this.state);

		const { textStyle, initStyle } = styles;
		const { flexCenter } = Layout;

		return (
			<View style={ [flexCenter, initStyle] }>
				<Text style={ textStyle }>Ready to roll!</Text>
			</View>
		);
	}
}

PropertyInvestmentsPathway.propTypes = {
	piPurchasePrice: React.PropTypes.number,
	piPackageFee: React.PropTypes.number,
	piAdditionalValues: React.PropTypes.number,
	piMortgageLegals: React.PropTypes.number,
	piMortgageStampDuty: React.PropTypes.number,
	piTitleTransfer: React.PropTypes.number,
	piMortgageRegistration: React.PropTypes.number,
	piMortgageInsurance: React.PropTypes.number,
	piStampDuty: React.PropTypes.number,
	piSolicitor: React.PropTypes.number,
	piMiscellaneous: React.PropTypes.number,
	piLessDeposit: React.PropTypes.number,
	piLessGrants: React.PropTypes.number,
	piInterestRate: React.PropTypes.number,
	piWeeklyRental: React.PropTypes.number,
	piLessCouncilRates: React.PropTypes.number,
	piLessWaterRates: React.PropTypes.number,
	piLessLandlordsInsurance: React.PropTypes.number,
	piLessBodyCorporateLevy: React.PropTypes.number,
}

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		height: 100
	}
};

export default PropertyInvestmentsPathwayView;
