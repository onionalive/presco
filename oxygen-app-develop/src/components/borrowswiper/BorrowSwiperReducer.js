// import BorrowData from './BorrowSwiperDataStub.json';

// Initial state
let initialState = {
	loanType: '',
	loanTerm: 0,
	dependents: 0,
	applicationType: '',
	estimateExpenses: true,
	personalExpenses: 0,
	totalIncomeValue: 0,
	totalIncomeTax: 0,
	totalIncomeWithTax: 0,
	borrowUpTo: 0,
	monthlyRepayments: 0,
	monthlyRepaymentsBuffered: 0,
	page: 0
}

// Actions
const LOAN = 'QuestionSetReducer/LOAN';
const APPLICATION = 'QuestionSetReducer/APPLICATION';
const DEPENDENTS = 'QuestionSetReducer/DEPENDENTS';
const LOAN_TERM = 'QuestionSetReducer/LOAN_TERM';
const PERSONAL_EXPENSES = 'QuestionSetReducer/PERSONAL_EXPENSES';
const ESTIMATE_EXPENSES = 'QuestionSetReducer/ESTIMATE_EXPENSES';
const TOTAL_INCOME = 'QuestionSetReducer/TOTAL_INCOME';
const RESULTS = 'QuestionSetReducer/RESULTS';
const UPDATE_PAGE = 'QuestionSetReducer/UPDATE_PAGE';

// Action Creators
export const setLoanType = (loanType) => {
  return {
    type: LOAN,
    loanType: loanType
  };
}

export const setLoanTerm = (loanTerm) => {
  return {
    type: LOAN_TERM,
    loanTerm: loanTerm
  };
}

export const setApplicationType = (applicationType) => {
  return {
    type: APPLICATION,
    applicationType: applicationType
  };
}

export const setEstimateExpenses = (estimateExpenses) => {
  return {
    type: ESTIMATE_EXPENSES,
    estimateExpenses: estimateExpenses
  }
}

export const setDependents = (dependents) => {
  return {
    type: DEPENDENTS,
    dependents: dependents
  };
}

export const updatePersonalExpenses = (value) => {
  return {
    type: PERSONAL_EXPENSES,
    payload: value
  };
}

export const updatePage = (page) => {
	return {
		type: UPDATE_PAGE,
		page: page
	};
}

export const updateResults = (borrowUpTo, monthlyRepayments, monthlyRepaymentsBuffered) => {
  return {
    type: RESULTS,
    borrowUpTo: borrowUpTo,
    monthlyRepayments: monthlyRepayments,
    monthlyRepaymentsBuffered: monthlyRepaymentsBuffered
  };
}

export const updateTotalIncome = (value, tax, withTax) => {
  return {
    type: TOTAL_INCOME,
    value: value,
    tax: tax,
    withTax: withTax
  };
}

export const BorrowSwiperReducer = (state = initialState, action) => {
	switch(action.type) {
		case LOAN:
			return { ...state, loanType: action.loanType};
		case LOAN_TERM:
			return { ...state, loanTerm: action.loanTerm};
		case APPLICATION:
			return { ...state, applicationType: action.applicationType};
		case DEPENDENTS:
			return { ...state, dependents: action.dependents};
		case PERSONAL_EXPENSES:
			return { ...state, personalExpenses: action.payload };
	    case ESTIMATE_EXPENSES:
	      return { ...state, estimateExpenses: action.estimateExpenses };
	    case TOTAL_INCOME:
	      return {
	          ...state,
	          totalIncomeValue: action.value,
	          totalIncomeTax: action.tax,
	          totalIncomeWithTax: action.withTax
	      };
	    case RESULTS:
	      return {
	          ...state,
	          borrowUpTo: action.borrowUpTo,
	          monthlyRepayments: action.monthlyRepayments,
	          monthlyRepaymentsBuffered: action.monthlyRepaymentsBuffered
	      };
	    case UPDATE_PAGE:
			return {
				...state,
				page: action.page
			};
		default:
			return state;
	}
}
