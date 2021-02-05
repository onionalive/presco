import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import CalculatorView from './CalculatorView';

// action creator
import { updateValue, resetValue } from './CalculatorReducer';

const mapStateToProps = (state) => {
	return { 
		annualIncomeValue: state.calculatorReducer.annualIncomeValue,
		otherIncomeValue: state.calculatorReducer.otherIncomeValue,
		small: state.homeReducer.small 
	};
}

// uncomment to match actions to props
// add function name as second argument to export

// function mapDispatchToProps(dispatch) {

// 	return bindActionCreators({ 
// 		selectBook: selectBook 
// 	}, dispatch);

// }

export default connect(mapStateToProps, { updateValue, resetValue })(CalculatorView);
