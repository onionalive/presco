import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RepaymentsPathwayView from './RepaymentsPathwayView';

// action creators
import { setLoanTerm, setFrequency, setRepaymentType, setRepaymentAmount, setRepaymentDuration } from './RepaymentsPathwayReducer';

function mapStateToProps(state) {

	return {
		loanAmount: state.calculatorReducer.loanAmount,
		loanInterestRate: state.calculatorReducer.loanInterestRate,
		loanTerm: state.repaymentsPathwayData.loanTerm,
		repaymentFrequency: state.repaymentsPathwayData.repaymentFrequency,
		repaymentType: state.repaymentsPathwayData.repaymentType,
		repaymentAmount: state.repaymentsPathwayData.repaymentAmount,
		repaymentDuration: state.repaymentsPathwayData.repaymentDuration,
		extraRepayment: state.repaymentsPathwayData.extraRepayment,
		extraRepaymentStart: state.repaymentsPathwayData.extraRepaymentStart,
		lumpSum: state.repaymentsPathwayData.lumpSum,
		lumpSumStart: state.repaymentsPathwayData.lumpSumStart,
		introTerm: state.repaymentsPathwayData.introTerm,
		small: state.homeReducer.small
	};

}

// add imported action creators below to the {}
export default connect(mapStateToProps, { setLoanTerm, setFrequency, setRepaymentType, setRepaymentAmount, setRepaymentDuration })(RepaymentsPathwayView);
