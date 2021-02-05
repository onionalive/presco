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
import PickerView from '../common/PickerView';
import OtherIncome from '../otherincome/OtherIncome';
import Calculator from '../calculator/Calculator';
import CalculatorResults from '../calculatorresults/CalculatorResults';
import Dimensions from 'Dimensions';

// helpers
import Repayments from '../../helpers/repayments';

class RepaymentsPathwayView extends Component {

	componentDidUpdate() {
		if (this.props.loanTerm === 0) {
			return;
		}

		const results = Repayments.repaymentFrequency(this.props);

		if (results.repaymentAmount === null 
				|| results.repaymentFrequency === null
				|| results.repaymentFrequency === ''
				|| results.loanTermYears === null
				|| results.loanTermYears === ''
				|| this.props.loanAmount === 0
				|| this.props.loanInterestRate === 0) {
			this._setRepaymentAmount(0, '');
		} else {
			const value = results.repaymentAmount;
			const repaymentDuration = `${results.repaymentFrequency} for ${results.loanTermYears}`;
			this._setRepaymentAmount(value, repaymentDuration);
		}
	}

	headerAction() {
		if (this.refs.repaymentsSwiper.state.index === 0) {
			Actions.pop();
		} else {
			this.refs.repaymentsSwiper.scrollBy(-1);
		}
	}

	_setRepaymentAmount(value, repaymentDuration) {
		this.props.setRepaymentAmount(value, repaymentDuration);
	}

	_setRepaymentDuration(repaymentDuration) {
		this.props.setRepaymentDuration(repaymentDuration);
	}

	_updateBoundaries() {
		return Dimensions.get('window').height - 60;
	}

	_setDependents(type) {
		this.props.setDependents(type);
	}

	_moveBack() {
		this.refs.repaymentsSwiper.scrollBy(-1);
	}

	_moveForward() {
		this.refs.repaymentsSwiper.scrollBy(1);
	}

	_setLoanTerm(term) {
		this.props.setLoanTerm(term);
	}

	_setFrequency(freq) {
		this.props.setFrequency(freq);
	}

	_setRepaymentType(type) {
		this.props.setRepaymentType(type);
	}

	render() {

		const { container, wrapper, slide, text, swiper, calcText, result } = styles;
		const { loanTerm, 
				loanAmount, 
				loanInterestRate, 
				frequency,
				repaymentFrequency,
				repaymentType,
				repaymentAmount,
				repaymentDuration,
				small 
		} = this.props;

		const emailBody = `Your repayment will be: $${repaymentAmount}`;

		return (
			<View style={container}>
				<Header returnArrow={true} prev={() => this.headerAction()} />
				<Swiper 
				ref='repaymentsSwiper'
				showsPagination={false}
				style={swiper}
				loop={false}
				onMomentumScrollEnd = {this._onMomentumScrollEnd}
				height={this._updateBoundaries()}
				>
					<LayoutBorder center='true'> 
						<Calculator 
							prev={() => Actions.pop()}
							next={loanAmount === 0 ? null : () => this._moveForward()} 
							id={'loanAmount'}
							calcTitle="Loan Amount"
							value={loanAmount}
							tickBool={loanAmount === 0 ? false : true}
							prefix={true}
							suffix={false}
						/>
					</LayoutBorder>
					<LayoutBorder center='true'> 
						<QuestionSet 
							title="Loan Term"
							tickBool={loanTerm === 0 ? false : true} 
							prev={() => this._moveBack()} 
							next={loanTerm === 0 ? null : () => this._moveForward()}
						>
							<Answer
								text="15 Years"
								action={() => this._setLoanTerm(15)}
								selected={(loanTerm == 15 || loanTerm == 0) ? true : '' }
							/>
							<Answer
								text="25 Years"
								action={() => this._setLoanTerm(25)}
								selected={(loanTerm == 25 || loanTerm == 0) ? true : '' }
							/>
							<Answer
								text="30 Years"
								action={() => this._setLoanTerm(30)}
								selected={(loanTerm == 30 || loanTerm == 0) ? true : '' }
							/>
						</QuestionSet>
					</LayoutBorder>
					<LayoutBorder center='true'> 
						<Calculator 
							prev={() => this._moveBack()} 
							next={loanInterestRate === 0 ? null : () => this._moveForward()} 
							id={'loanInterestRate'}
							calcTitle="Loan Interest Rate"
							value={(loanInterestRate/100).toFixed(2)}
							tickBool={loanInterestRate === 0 ? false : true}
							prefix={false}
							suffix={true}
						/>
					</LayoutBorder>
					<LayoutBorder center='true'> 
						<QuestionSet 
							title="Repayment Type"
							tickBool={repaymentType === '' ? false : true} 
							prev={() => this._moveBack()} 
							next={repaymentType === '' ? null : () => this._moveForward()}
						>
							<Answer
								text="Principal and Interest"
								action={() => this._setRepaymentType('principleInterest')}
								selected={(repaymentType == 'principleInterest' || repaymentType == '') ? true : '' }
							/>
							<Answer
								text="Interest Only"
								action={() => this._setRepaymentType('interest')}
								selected={(repaymentType == 'interest' || repaymentType == '') ? true : '' }
							/>
						</QuestionSet>
					</LayoutBorder>
					<LayoutBorder center='true'> 
						<ScrollView showsVerticalScrollIndicator={false}>
							<CalculatorResults 
								prev={() => this._moveBack()} 
								emailBody={emailBody} 
								subject={"Oxygen - Repayments Calculator"} 
								marginTop={false}>
								<Text style={styles.resultHeading}>Repayment Frequency</Text>
								<View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 20 }}>
									<PickerView
										text="Weekly"
										action={() => this._setFrequency('weekly')}
										selected={(repaymentFrequency == 'weekly' || repaymentFrequency == '') ? true : '' }
										styling={{marginLeft: 4}}
										pickerFont={ small ? pickerFonts.fontSmall : pickerFonts.font }
									/>
									<PickerView
										text="Fortnightly"
										action={() => this._setFrequency('fortnightly')}
										selected={(repaymentFrequency == 'fortnightly' || repaymentFrequency == '') ? true : '' }
										styling={{marginRight: 4, marginLeft: 4}}
										pickerFont={ small ? pickerFonts.fontSmall : pickerFonts.font }
									/>
									<PickerView
										text="Monthly"
										action={() => this._setFrequency('monthly')}
										selected={(repaymentFrequency == 'monthly' || repaymentFrequency == '') ? true : '' }
										styling={{marginRight: 4}}
										pickerFont={ small ? pickerFonts.fontSmall : pickerFonts.font }
									/>
								</View>
								<View style={{marginBottom: 30}} />
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

RepaymentsPathwayView.propTypes = {
	loanAmount: React.PropTypes.number,
	loanInterestRate: React.PropTypes.number,
	loanTerm: React.PropTypes.number,
	repaymentFrequency: React.PropTypes.string,
	repaymentType: React.PropTypes.string,
	repaymentAmount: React.PropTypes.number,
	repaymentDuration: React.PropTypes.string,
	extraRepayment: React.PropTypes.number,
	extraRepaymentStart: React.PropTypes.number,
	lumpSum: React.PropTypes.number,
	lumpSumStart: React.PropTypes.number,
	introTerm: React.PropTypes.number,
}

const pickerFonts = {
	font: {
		color: '#fff',
		fontSize: 14,
		textAlign: 'center',
		fontFamily: 'ProximaNova-Bold'
	},
	fontSmall: {
		color: '#fff',
		fontSize: 10,
		textAlign: 'center',
		fontFamily: 'ProximaNova-Bold'
	},
}

const styles = {
	container: {
		backgroundColor: Oxygen.White,
	},
	wrapper: {
	},
	slide: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
	},
	swiper: {
		backgroundColor: Oxygen.blue
	},
	calcText: {
		color: '#000',
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'right',
	},
	result: {
		flex:1,
		color: Oxygen.grey,
		fontSize: 20,
		textAlign: 'right',
		marginBottom: 10,
		marginRight: 16,
		fontFamily: 'ProximaNova-Bold',
	},
	resultHeading: {
		color: Oxygen.grey,
		fontSize: 14,
		marginTop: 10,
		marginBottom: 10,
		textAlign: 'center',
		fontFamily: 'ProximaNova-Bold'
	},
}

export default RepaymentsPathwayView;
