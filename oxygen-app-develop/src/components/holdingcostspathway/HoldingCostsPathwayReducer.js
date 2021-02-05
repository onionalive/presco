// Initial state
let initialState = {
}

// Actions
const TITLE = 'HoldingCostsPathwayReducer/TITLE';

// Action Creators 
export function resetValue() {
  return {
    type: TITLE,
    value: 'example'
  };
}

export const HoldingCostsPathwayReducer = (state = initialState, action) => {
	switch(action.type) {
		case TITLE:
			return { ...state, loanType: action.value};
		default:
			return state;
	}
}
