import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import CalculatorResultsView from './CalculatorResultsView';

// action creators
import { updateBorrowAmount, updateRepayOne, updateRepayTwo } from './CalculatorResultsReducer';
import { updateLoading } from '../home/HomeReducer';

function mapStateToProps(state) {

	return {
		borrowAmount: state.calculatorResultsData.borrowAmount,
		repayFirst: state.calculatorResultsData.repayFirst,
		repaySecond: state.calculatorResultsData.repaySecond,
		small: state.homeReducer.small
	};

}

// const mapStateToProps = state => {
// 	console.log(state);
// };

// uncomment to match actions to props
// add function name as second argument to export

// function mapDispatchToProps(dispatch) {
//
// 		return bindActionCreators({ 
//			selectBook: selectBook 
//		}, dispatch);
//
// }

export default connect(mapStateToProps, { updateBorrowAmount, updateRepayOne, updateRepayTwo, updateLoading })(CalculatorResultsView);
