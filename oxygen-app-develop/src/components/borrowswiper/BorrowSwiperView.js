import React, { Component } from 'react';
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

// helpers
import Borrow from '../../helpers/borrow';

class BorrowSwiperView extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidUpdate() {
		this._calculateResults();
	}

	componentWillMount() {
		this.setState({
			expenses: false
		});
	}

	componentWillUnmount() {
		this.props.updatePage(0);
	}

	headerAction() {
		if (this.state.expenses && this.refs.swiper.state.index === 0) {
			this.refs.swiper.scrollBy(4);
		} else if (this.refs.swiper.state.index === 0) {
			Actions.pop();
			this.props.updatePage(0);
		} else {
			this.refs.swiper.scrollBy(-1);
		}

		this.setState({ expenses: false });
	}

	_onMomentumScrollEnd() {
		this.setState({ expenses: false });
		// if (this.refs.swiper.state.index > this.props.page) {
		// 	const page = this.props.page + 1;
		// 	this.props.updatePage(page);
		// } else if (this.refs.swiper.state.index < this.props.page) {
		// 	const page = this.props.page - 1;
		// 	this.props.updatePage(page);
		// }
	}

	_updateBoundaries() {
		return Dimensions.get('window').height - 60;
	}

	_setLoanType(type) {
		this.props.setLoanType(type);
	}

	_setLoanTerm(term) {
		this.props.setLoanTerm(term);
	}

	_setApplicationType(type) {
		this.props.setApplicationType(type);
	}

	_setEstimateExpenses(estimate) {
		this.props.setEstimateExpenses(estimate);
		this.props.updatePage(5);
		this.setState({ expenses: true });
	}

	_setDependents(type) {
		this.props.setDependents(type);
	}

	_moveBack() {
		this.refs.swiper.scrollBy(-1);
		const page = this.props.page - 1;
		this.props.updatePage(page);
	}

	_moveForward() {
		this.refs.swiper.scrollBy(1);
		const page = this.props.page + 1;
		this.props.updatePage(page);
	}

	_moveForwardExpenses() {
		this.refs.swiper.state.index === 0 ? this.refs.swiper.scrollBy(6) : this.refs.swiper.scrollBy(1);
	}

	_calculateResults() {
		const results = Borrow.calculateResults(this.props);

		if (results.impossible || this.props.applicationType === '') {
			this.props.updateResults(0, 0, 0);
		} else {
			this.props.updateResults(results.borrowUpTo, results.monthlyRepayments, results.monthlyRepaymentsBuffered);
		}
	}

	_renderSectionOne() {
		const { container, wrapper, slide, text, swiper, slideConditional, calcText } = styles;
		const { annualIncomeValue,
				otherIncomeValue,
				loanType,
				loanTerm,
				interestRate,
				dependents,
				personalExpenses,
				applicationType,
				borrowUpTo,
				monthlyRepayments,
				monthlyRepaymentsBuffered,
				estimateExpenses
		} = this.props;

		return (
			[<LayoutBorder center='true' key="0">
				<QuestionSet
					tickBool={loanType === '' ? false : true}
					title="I need a loan to..."
					prev={() => Actions.pop()}
					next={loanType === '' ? null : () => this._moveForward()}
				>
					<Answer
						text="Buy my first home"
						action={() => this._setLoanType('firstHome')}
						selected={(loanType == 'firstHome' || loanType == '') ? true : false }
					/>
					<Answer
						text="Buy my next home"
						action={() => this._setLoanType('nextHome')}
						selected={(loanType == 'nextHome' || loanType == '') ? true : false }
					/>
					<Answer
						text="Refinance an existing loan"
						action={() => this._setLoanType('refinance')}
						selected={(loanType == 'refinance' || loanType == '') ? true : false }
					/>
					<Answer
						text="Buy an investment property"
						action={() => this._setLoanType('investmentProperty')}
						selected={(loanType == 'investmentProperty' || loanType == '') ? true : false }
					/>
				</QuestionSet>
			</LayoutBorder>,
			<LayoutBorder center='true' key="1">
				<QuestionSet
					title="Application Type"
					prev={() => this._moveBack()}
					next={() => this._moveForward()}
					tickBool={applicationType === '' ? false : true}
				>
					<Answer
						text="Single"
						action={() => this._setApplicationType('single')}
						selected={(applicationType == 'single' || applicationType == '') ? true : false }
					/>
					<Answer
						text="Joint"
						action={() => this._setApplicationType('joint')}
						selected={(applicationType == 'joint' || applicationType == '') ? true : false }
					/>
				</QuestionSet>
			</LayoutBorder>,
			<LayoutBorder center='true' key="2">
				<QuestionSet
					title="Number of Dependents"
					prev={() => this._moveBack()}
					next={() => this._moveForward()}
					tickBool={dependents >= 0 && dependents <= 4 ? true : ''}
				>
					<Answer
						text="None"
						action={() => this._setDependents(0)}
						selected={(dependents == 0 || dependents === '') ? true : '' }
					/>
					<Answer
						text="One"
						action={() => this._setDependents(1)}
						selected={(dependents == 1 || dependents === '') ? true : '' }
					/>
					<Answer
						text="Two"
						action={() => this._setDependents(2)}
						selected={(dependents == 2 || dependents === '') ? true : '' }
					/>
					<Answer
						text="Three"
						action={() => this._setDependents(3)}
						selected={(dependents == 3 || dependents === '') ? true : '' }
					/>
					<Answer
						text="Four or more"
						action={() => this._setDependents(4)}
						selected={(dependents == 4 || dependents === '') ? true : '' }
					/>
				</QuestionSet>
			</LayoutBorder>,
			<LayoutBorder center='true' key="3">
				<Calculator
					prev={() => this._moveBack()}
					next={annualIncomeValue === 0 ? null : () => this._moveForward()}
					id={'annualIncome'}
					calcTitle="What is your annual income before tax?"
					value={annualIncomeValue}
					tickBool={annualIncomeValue === 0 ? false : true}
					prefix={true}
					suffix={false}
				/>
			</LayoutBorder>,
			<LayoutBorder center='true' key="4">
				<Calculator
					prev={() => this._moveBack()}
					next={() => this._moveForward()}
					id={'otherIncome'}
					calcTitle="Other Income"
					value={otherIncomeValue}
					tickBool={true}
					prefix={true}
					suffix={false}
				/>
			</LayoutBorder>,
			<LayoutBorder center='true' key="5">
				<QuestionSet
					title="Estimate my expenses"
					prev={() => this._moveBackExpenses()}
					next={() => this._moveForwardExpenses()}
					tickBool={estimateExpenses === null ? false : true}
				>
					<Answer
						text="Yes"
						action={() => this._setEstimateExpenses(true)}
						selected={estimateExpenses === true ? true : false }
					/>
					<Answer
						text="No"
						action={() => this._setEstimateExpenses(false)}
						selected={estimateExpenses === true ? false : true }
					/>
				</QuestionSet>
			</LayoutBorder>]
		);
	}

	_renderSectionTwo() {
		const { container, wrapper, slide, text, swiper, slideConditional, calcText } = styles;
		const { personalExpenses,
				creditCardRepayments,
				otherMonthlyRepayments
		} = this.props;

		return (
			[<LayoutBorder center='true' key="6">
				<Calculator
					prev={() => this._moveBack()}
					next={() => this._moveForward()}
					id={'personalExpenses'}
					calcTitle="Personal Expenses"
					value={personalExpenses}
					tickBool={true}
					prefix={true}
					suffix={false}
				/>
			</LayoutBorder>,
			<LayoutBorder center='true' key="7">
				<Calculator
					prev={() => this._moveBack()}
					next={() => this._moveForward()}
					id={'creditCardRepayments'}
					calcTitle="Credit Card Repayments"
					value={creditCardRepayments}
					tickBool={true}
					prefix={true}
					suffix={false}
				/>
			</LayoutBorder>,
			<LayoutBorder center='true' key="8">
				<Calculator
					prev={() => this._moveBack()}
					next={() => this._moveForward()}
					id={'otherMonthlyRepayments'}
					calcTitle="Other Monthly Repayments"
					value={otherMonthlyRepayments}
					tickBool={true}
					prefix={true}
					suffix={false}
				/>
			</LayoutBorder>]
		);
	}

	_renderSectionThree() {
		const { container, wrapper, slide, text, swiper, slideConditional, calcText } = styles;
		const { annualIncomeValue,
				otherIncomeValue,
				loanType,
				loanTerm,
				interestRate,
				dependents,
				personalExpenses,
				applicationType,
				borrowUpTo,
				monthlyRepayments,
				monthlyRepaymentsBuffered
		} = this.props;

		const emailBody = `You can borrow up to: $${borrowUpTo}${"\n"}At ${interestRate/100}% p.a., your monthly repayments will be: $${monthlyRepayments}${"\n"}At ${interestRate/100 + 1.5}% p.a., your monthly repayments will be: $${monthlyRepaymentsBuffered}`;

		return (
			[<LayoutBorder center='true' key="9">
				<Calculator
					prev={() => this._moveBack()}
					next={interestRate === 0 ? null : () => this._moveForward()}
					id={'interestRate'}
					calcTitle="Loan Interest Rate"
					value={(interestRate/100).toFixed(2)}
					tickBool={interestRate === 0 ? false : true}
					prefix={false}
					suffix={true}
				/>
			</LayoutBorder>,
			<LayoutBorder center='true' key="10">
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
			</LayoutBorder>,
			<LayoutBorder center='true' key="11">
				<ScrollView showsVerticalScrollIndicator={false}>
					<CalculatorResults prev={() => this._moveBack()} emailBody={emailBody} subject={"Oxygen - Borrow Calculator"} marginTop={true}>
						<ResultsItem title="You may be able to borrow up to..." amount={borrowUpTo} />
						<ResultsItem title={`At ${interestRate/100}% p.a., your monthly repayments will be...`} amount={monthlyRepayments} />
						<ResultsItem title={`At ${interestRate/100 + 1.5}% p.a., your monthly repayments will be...`} amount={monthlyRepaymentsBuffered} />
					</CalculatorResults>
				</ScrollView>
			</LayoutBorder>]
		);
	}

	_renderWithoutExpenses() {
		const sectionOneArray = this._renderSectionOne();
		const sectionThreeArray = this._renderSectionThree();

		const componentReturn = [...sectionOneArray, ...sectionThreeArray];
		const componentList = componentReturn.map((item) => item);

		return (
			<Swiper
				ref='swiper'
				showsPagination={false}
				style={styles.swiper}
				index={this.props.page}
				loop={false}
				onMomentumScrollEnd = {() => this._onMomentumScrollEnd()}
				height={this._updateBoundaries()}
				>
					{ componentList }
			</Swiper>
		);
	}

	_renderWithExpenses() {
		const sectionOneArray = this._renderSectionOne();
		const sectionTwoArray = this._renderSectionTwo();
		const sectionThreeArray = this._renderSectionThree();

		const componentReturn = [...sectionOneArray, ...sectionTwoArray, ...sectionThreeArray];
		const componentList = componentReturn.map((item) => item);

		return (
			<Swiper
				ref='swiper'
				showsPagination={false}
				style={styles.swiper}
				loop={false}
				index={this.props.page}
				onMomentumScrollEnd = {() => this._onMomentumScrollEnd()}
				height={this._updateBoundaries()}
				>
					{ componentList }
			</Swiper>
		);

	}

	render() {
		return (
			<View style={styles.container}>
				<Header returnArrow={true} prev={() => this.headerAction()} />
				{ this.props.estimateExpenses ?  this._renderWithoutExpenses() : this._renderWithExpenses() }
    		</View>
		);
	}
}

BorrowSwiperView.propTypes = {
	loanType: React.PropTypes.string,
	applicationType: React.PropTypes.string,
	estimateExpenses: React.PropTypes.bool,
	dependents: React.PropTypes.number,
	annualIncomeValue: React.PropTypes.number,
	otherIncomeValue: React.PropTypes.number,
	interestRate: React.PropTypes.number,
	loanTerm: React.PropTypes.number,
	borrowUpTo: React.PropTypes.number,
	monthlyRepayments: React.PropTypes.number,
	monthlyRepaymentsBuffered: React.PropTypes.number,
	personalExpenses: React.PropTypes.number,
	creditCardRepayments: React.PropTypes.number,
	otherMonthlyRepayments: React.PropTypes.number,
}

const styles = {
	container: {
		backgroundColor: Oxygen.White,
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontFamily: 'ProximaNova-Bold'
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
}

export default BorrowSwiperView;
