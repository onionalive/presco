import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import BorrowSwiperView from './BorrowSwiperView';

// action creators

import {
	setLoanType,
	setApplicationType,
	setDependents,
	setLoanTerm,
	setEstimateExpenses,
	updateResults,
	updatePage
} from './BorrowSwiperReducer';

function mapStateToProps(state) {
	return {
		loanType: state.borrowSwiperReducer.loanType,
		applicationType: state.borrowSwiperReducer.applicationType,
		estimateExpenses: state.borrowSwiperReducer.estimateExpenses,
		dependents: state.borrowSwiperReducer.dependents,
		annualIncomeValue: state.calculatorReducer.annualIncomeValue,
		otherIncomeValue: state.calculatorReducer.otherIncomeValue,
		interestRate: state.calculatorReducer.interestRate,
		loanTerm: state.borrowSwiperReducer.loanTerm,
		borrowUpTo: state.borrowSwiperReducer.borrowUpTo,
		monthlyRepayments: state.borrowSwiperReducer.monthlyRepayments,
		monthlyRepaymentsBuffered: state.borrowSwiperReducer.monthlyRepaymentsBuffered,
		personalExpenses: state.calculatorReducer.personalExpenses,
		creditCardRepayments: state.calculatorReducer.creditCardRepayments,
		otherMonthlyRepayments: state.calculatorReducer.otherMonthlyRepayments,
		page: state.borrowSwiperReducer.page
	};
}

export default connect(mapStateToProps,
	{
		setLoanType,
		setApplicationType,
		setDependents,
		setLoanTerm,
		setEstimateExpenses,
		updateResults,
		updatePage
	}
)(BorrowSwiperView);
