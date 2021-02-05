import React, { Component, Linking } from 'react';
import { bindActionCreators } from 'redux';
import {
  Text,
  Image,
  Switch, 
  TouchableOpacity,
  View, 
  StyleSheet,
  ScrollView
} from 'react-native';
import { Oxygen } from '../../styles/colours';   
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import {Actions} from 'react-native-router-flux';

// components
import ResultsItem from '../common/ResultsItem';
import Header from '../common/Header';
import LayoutBorder from '../common/LayoutBorder';
import QuestionSet from '../questionset/QuestionSet';
import Answer from '../common/Answer';
import OtherIncome from '../otherincome/OtherIncome';
import Calculator from '../calculator/Calculator';
import CalculatorResults from '../calculatorresults/CalculatorResults';
import Dimensions from 'Dimensions';

class HoldingCostsPathwayView extends Component {

	componentDidUpdate() {
		console.log('holding costs updated');
	}

	render() {
		return (
			<View style={container}>
				<Header />
					<Swiper 
					ref='repaymentsSwiper'
					showsPagination={false}
					style={swiper}
					loop={false}
					onMomentumScrollEnd = {this._onMomentumScrollEnd}
					height={this._updateBoundaries()}
					>
 					{/* TASK: UPDATE THE CALC VALUES */}

					{/* Interest Rate */}
					<LayoutBorder center='true'> 
						<Calculator 
							prev={() => this._moveBack()} 
							next={loanInterestRate === 0 ? null : () => this._moveForward()} 
							id={'holdingCostsInterestRate'}
							calcTitle="Loan Interest Rate"
							value={loanInterestRate/100}
							tickBool={loanInterestRate === 0 ? false : true}
							prefix={true}
							suffix={false}
						/>
					</LayoutBorder>

					{/* Current Mortgage Balance */}
					<LayoutBorder center='true'> 
						<Calculator 
							prev={() => this._moveBack()} 
							next={loanInterestRate === 0 ? null : () => this._moveForward()} 
							id={'holdingCostsCurrentMorgageBalance'}
							calcTitle="Loan Interest Rate"
							value={loanInterestRate/100}
							tickBool={loanInterestRate === 0 ? false : true}
							prefix={false}
							suffix={true}
						/>
					</LayoutBorder>

					{/* Additional Days on the market */}
					<LayoutBorder center='true'> 
						<Calculator 
							prev={() => this._moveBack()} 
							next={loanInterestRate === 0 ? null : () => this._moveForward()} 
							id={'holdingCostsDaysOnMarket'}
							calcTitle="Loan Interest Rate"
							value={loanInterestRate/100}
							tickBool={loanInterestRate === 0 ? false : true}
							prefix={false}
							suffix={true}
						/>
					</LayoutBorder>

					{/* Council Rates */}
					<LayoutBorder center='true'> 
						<Calculator 
							prev={() => this._moveBack()} 
							next={loanInterestRate === 0 ? null : () => this._moveForward()} 
							id={'holdingCostsCouncilRates'}
							calcTitle="Loan Interest Rate"
							value={loanInterestRate/100}
							tickBool={loanInterestRate === 0 ? false : true}
							prefix={false}
							suffix={true}
						/>
					</LayoutBorder>

					{/* Body Corporate Fees */}
					<LayoutBorder center='true'> 
						<Calculator 
							prev={() => this._moveBack()} 
							next={loanInterestRate === 0 ? null : () => this._moveForward()} 
							id={'holdingCostsBodyCorporateFees'}
							calcTitle="Loan Interest Rate"
							value={loanInterestRate/100}
							tickBool={loanInterestRate === 0 ? false : true}
							prefix={false}
							suffix={true}
						/>
					</LayoutBorder>

					{/* Land Tax */}
					<LayoutBorder center='true'> 
						<Calculator 
							prev={() => this._moveBack()} 
							next={loanInterestRate === 0 ? null : () => this._moveForward()} 
							id={'holdingCostsLandTax'}
							calcTitle="Loan Interest Rate"
							value={loanInterestRate/100}
							tickBool={loanInterestRate === 0 ? false : true}
							prefix={false}
							suffix={true}
						/>
					</LayoutBorder>

					{/* Interest Rate */}
					<LayoutBorder center='true'> 
						<ScrollView showsVerticalScrollIndicator={false}>
							<CalculatorResults prev={() => this._moveBack()} emailBody={emailBody} subject={"Oxygen - Repayments Calculator"}>
								<ResultsItem title="Your repayment will be" amount={repaymentAmount} />
								<Text style={result}>{repaymentDuration}</Text>
							</CalculatorResults>
						</ScrollView>
					</LayoutBorder>
				</Swiper>
    		</View>
		);
	}
}

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		height: 100
	}
};

export default HoldingCostsPathwayView;
