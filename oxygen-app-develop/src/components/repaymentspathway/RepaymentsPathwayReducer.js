// import BorrowData from './BorrowSwiperDataStub.json';

// Initial state
let initialState = {
	loanType: '',
	loanTerm: 0,
	repaymentFrequency: 'weekly',
	repaymentType: '',
	repaymentAmount: 0,
	extraRepayment: 0,
	extraRepaymentStart: 0,
	lumpSum: 0,
	lumpSumStart: 0,
	introTerm: 0,
	repaymentDuration: ''
}

// Actions
const LOAN_TERM = 'RepaymentsPathwayReducer/LOAN_TERM';
const FREQUENCY = 'RepaymentsPathwayReducer/FREQUENCY';
const REPAYMENT_TYPE = 'RepaymentsPathwayReducer/REPAYMENT_TYPE';
const REPAYMENT_AMOUNT = 'RepaymentsPathwayReducer/REPAYMENT_AMOUNT';
const REPAYMENT_DURATION = 'RepaymentsPathwayReducer/REPAYMENT_DURATION';

// Action Creators 
export const setLoanTerm = (loanTerm) => {
  return {
    type: LOAN_TERM,
    loanTerm: loanTerm
  };
}

export const setFrequency = (freq) => {
  return {
    type: FREQUENCY,
    repaymentFrequency: freq
  };
}

export const setRepaymentType = (repaymentType) => {
  return {
    type: REPAYMENT_TYPE,
    repaymentType: repaymentType
  };
}

export const setRepaymentAmount = (value, repaymentDuration) => {
  return {
    type: REPAYMENT_AMOUNT,
    repaymentAmount: value,
    repaymentDuration: repaymentDuration
  };
}

export const setRepaymentDuration = (repaymentDuration) => {
  return {
    type: REPAYMENT_AMOUNT,
    repaymentDuration: repaymentDuration
  };
}

export const RepaymentsPathwayReducer = (state = initialState, action) => {
	switch(action.type) {
		case LOAN_TERM:
			return { ...state, loanTerm: action.loanTerm};
		case FREQUENCY:
			return { ...state, repaymentFrequency: action.repaymentFrequency};
		case REPAYMENT_TYPE:
			return { ...state, repaymentType: action.repaymentType};
		case REPAYMENT_AMOUNT:
			return { 
				...state, 
				repaymentAmount: action.repaymentAmount,
				repaymentDuration: action.repaymentDuration
			};
		case REPAYMENT_DURATION:
			return { 
				...state, 
				repaymentDuration: action.repaymentDuration
			};
		default:
			return state;
	}
}
