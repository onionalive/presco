// Initial state
const initialState = {
	loanType: ''
};

// Actions
const LOAN = 'LoanTypeReducer/LOAN';

// Action Creators 
export const setLoanType = (loanType) => {
  return {
    type: LOAN,
    loanType: loanType
  };
}

export const QuestionSetReducer = (state = initialState, action) => {
	switch(action.type) {
		case LOAN:
			return { ...state, loanType: action.loanType};
		default:
			return state;
	}
}
