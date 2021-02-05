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

import StampDuty from '../../helpers/stampDuty';

class StampDutyPathwayView extends Component {

	componentDidUpdate() {
		const results = StampDuty.stampDutyResults(this.props);
		if (!isNaN(results.stampDutyValue) && !isNaN(results.total)) {
			this._setResults(results);
		}
	}

	headerAction() {
		if (this.refs.stampDutySwiper.state.index === 0) {
			Actions.pop();
		} else {
			this.refs.stampDutySwiper.scrollBy(-1);
		}
	}

	_setResults(results) {
		this.props.setResults(results);
	}

	_updateBoundaries() {
		return Dimensions.get('window').height - 60;
	}

	_setDependents(type) {
		this.props.setDependents(type);
	}

	_moveBack() {
		this.refs.stampDutySwiper.scrollBy(-1);
	}

	_moveForward() {
		this.refs.stampDutySwiper.scrollBy(1);
	}

	_setStateValue(stateValue) {
		this.props.setStateValue(stateValue);
	}

	_setPropertyTypeOne(property) {
		this.props.setPropertyTypeOne(property);
	}

	_setPropertyTypeTwo(property) {
		this.props.setPropertyTypeTwo(property);
	}

	_setFirstHome(value) {
		this.props.setFirstHome(value);
	}

	render() {
		const { container, wrapper, slide, text, swiper, calcText } = styles;
		const { propertyValue,
				annualIncomeValue,
				otherIncomeValue,
				loanType,
				loanTerm,
				interestRate,
				registrationFee,
				transferFee,
				stampDuty,
				total,
				stateValue,
				propertyTypeOne,
				propertyTypeTwo,
				firstHome
		} = this.props;

		const emailBody = `Registration Fee: $${registrationFee}${"\n"}Transfer Fee: $${transferFee}${"\n"}Stamp Duty: $${stampDuty}${"\n"}Total: total`;

		// booleans for values set
		const isPropertyTypeOneSet = propertyTypeOne === '' ? false : true;
		const isPropertyTypeTwoSet = propertyTypeTwo === '' ? false : true;
		const isPropertyValueSet = propertyValue === 0 ? false : true;
		const isFirstHomeSet = firstHome === '' ? false : true;
		const isStateValueSet = stateValue === '' ? false : true;

		const showResults = isPropertyTypeOneSet
								&& isPropertyTypeTwoSet
								&& isPropertyValueSet
								&& isFirstHomeSet
								&& isStateValueSet;

		return (
			<View style={container}>
				<Header returnArrow={true} prev={() => this.headerAction()} />
				<Swiper
				ref='stampDutySwiper'
				showsPagination={false}
				style={swiper}
				loop={false}
				onMomentumScrollEnd = {this._onMomentumScrollEnd}
				height={this._updateBoundaries()}
				>
					<LayoutBorder center='true'>
						<Calculator
							prev={() => Actions.pop()}
							next={propertyValue === 0 ? null : () => this._moveForward()}
							id={'propertyValue'}
							calcTitle="Property Value"
							value={propertyValue}
							tickBool={isPropertyValueSet}
							prefix={true}
							suffix={false}
						/>
					</LayoutBorder>
					<LayoutBorder center='true'>
						<QuestionSet
							title="State"
							tickBool={isStateValueSet}
							prev={() => this._moveBack()}
							next={stateValue === '' ? null : () => this._moveForward()}
						>
							<Answer
								text="NSW"
								action={() => this._setStateValue('NSW')}
								selected={(stateValue == 'NSW' || stateValue == '') ? true : '' }
							/>
							<Answer
								text="ACT"
								action={() => this._setStateValue('ACT')}
								selected={(stateValue == 'ACT' || stateValue == '') ? true : '' }
							/>
							<Answer
								text="NT"
								action={() => this._setStateValue('NT')}
								selected={(stateValue == 'NT' || stateValue == '') ? true : '' }
							/>
							<Answer
								text="QLD"
								action={() => this._setStateValue('QLD')}
								selected={(stateValue == 'QLD' || stateValue == '') ? true : '' }
							/>
							<Answer
								text="SA"
								action={() => this._setStateValue('SA')}
								selected={(stateValue == 'SA' || stateValue == '') ? true : '' }
							/>
							<Answer
								text="TAS"
								action={() => this._setStateValue('TAS')}
								selected={(stateValue == 'TAS' || stateValue == '') ? true : '' }
							/>
							<Answer
								text="VIC"
								action={() => this._setStateValue('VIC')}
								selected={(stateValue == 'VIC' || stateValue == '') ? true : '' }
							/>
							<Answer
								text="WA"
								action={() => this._setStateValue('WA')}
								selected={(stateValue == 'WA' || stateValue == '') ? true : '' }
							/>
						</QuestionSet>
					</LayoutBorder>
					<LayoutBorder center='true'>
						<QuestionSet
							title="Property Type"
							tickBool={isPropertyTypeOneSet}
							prev={() => this._moveBack()}
							next={propertyTypeOne === '' ? null : () => this._moveForward()}
						>
							<Answer
								text="Primary Residence"
								action={() => this._setPropertyTypeOne('primary')}
								selected={(propertyTypeOne == 'primary' || propertyTypeOne == '') ? true : '' }
							/>
							<Answer
								text="Investment"
								action={() => this._setPropertyTypeOne('investment')}
								selected={(propertyTypeOne == 'investment' || propertyTypeOne == '') ? true : '' }
							/>
						</QuestionSet>
					</LayoutBorder>
					<LayoutBorder center='true'>
						<QuestionSet
							title="Property Type"
							tickBool={isPropertyTypeTwoSet}
							prev={() => this._moveBack()}
							next={propertyTypeTwo === '' ? null : () => this._moveForward()}
						>
							<Answer
								text="Existing Building"
								action={() => this._setPropertyTypeTwo('existing')}
								selected={(propertyTypeTwo == 'existing' || propertyTypeTwo == '') ? true : '' }
							/>
							<Answer
								text="Newly Built"
								action={() => this._setPropertyTypeTwo('new')}
								selected={(propertyTypeTwo == 'new' || propertyTypeTwo == '') ? true : '' }
							/>
							<Answer
								text="Off the land"
								action={() => this._setPropertyTypeTwo('offland')}
								selected={(propertyTypeTwo == 'offland' || propertyTypeTwo == '') ? true : '' }
							/>
							<Answer
								text="Vacant Land"
								action={() => this._setPropertyTypeTwo('vacant')}
								selected={(propertyTypeTwo == 'vacant' || propertyTypeTwo == '') ? true : '' }
							/>
						</QuestionSet>
					</LayoutBorder>
					<LayoutBorder center='true'>
						<QuestionSet
							title="First Home"
							tickBool={isFirstHomeSet}
							prev={() => this._moveBack()}
							next={firstHome === '' ? null : () => this._moveForward()}
						>
							<Answer
								text="No"
								action={() => this._setFirstHome('0')}
								selected={(firstHome == '0' || firstHome == '') ? true : '' }
							/>
							<Answer
								text="Yes"
								action={() => this._setFirstHome('1')}
								selected={(firstHome == '1' || firstHome == '') ? true : '' }
							/>
						</QuestionSet>
					</LayoutBorder>
					<LayoutBorder center='true'>
						<ScrollView showsVerticalScrollIndicator={false}>
							<CalculatorResults prev={() => this._moveBack()} emailBody={emailBody} subject={"Oxygen - Stamp Duty Calculator"} marginTop={true}>
								<ResultsItem title="Registration Fee" amount={showResults ? registrationFee : 0} />
								<ResultsItem title="Transfer Fee" amount={showResults ? transferFee : 0} />
								<ResultsItem title="Stamp Duty" amount={showResults ? stampDuty : 0} />
								<ResultsItem title="Total" amount={showResults ? total : 0} />
							</CalculatorResults>
						</ScrollView>
					</LayoutBorder>
				</Swiper>
      </View>
		);
	}
}

StampDutyPathwayView.propTypes = {
	propertyValue: React.PropTypes.number,
	stateValue: React.PropTypes.string,
	propertyTypeOne: React.PropTypes.string,
	propertyTypeTwo: React.PropTypes.string,
	firstHome: React.PropTypes.string,
	registrationFee: React.PropTypes.number,
	transferFee: React.PropTypes.number,
	stampDuty: React.PropTypes.number,
	total: React.PropTypes.number,
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
};

export default StampDutyPathwayView;
