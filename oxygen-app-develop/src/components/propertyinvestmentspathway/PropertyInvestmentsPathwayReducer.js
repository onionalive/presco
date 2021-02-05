// Initial state
let initialState = {
	initState: "Set as initial state",
}

// Actions
const TITLE = 'PropertyInvestmentsPathwayReducer/TITLE';

// Action Creators 
export function resetValue() {
  return {
    type: TITLE,
    value: 'example'
  };
}

export const PropertyInvestmentsPathwayReducer = (state = initialState, action) => {
	switch(action.type) {
		case TITLE:
			return { ...state, loanType: action.value};
		default:
			return state;
	}
}
