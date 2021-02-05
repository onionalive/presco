// Initial state
let initialState = {
	borrowAmount: '1,125,802',
	repayFirst: '3,885',
	repaySecond: '4,746'
}

// Actions
const BORROW_AMOUNT = 'CalculatorResultsReducer/BORROW_AMOUNT';
const REPAY_ONE = 'CalculatorResultsReducer/REPAY_ONE';
const REPAY_TWO = 'CalculatorResultsReducer/REPAY_TWO';

// Action Creators 
export function updateBorrowAmount() {
	const borrow = '1,345,099';
	return {
		type: BORROW_AMOUNT,
		payload: borrow
	};
}

export function updateRepayOne() {
	return {
		type: REPAY_ONE
	};
}

export function updateRepayTwo() {
	return {
		type: REPAY_TWO
	};
}

export const CalculatorResultsReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'BORROW_AMOUNT':
			return { ...state, borrow: action.payload };
		default:
			return state;
	}
}
