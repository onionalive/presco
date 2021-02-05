// Initial state
let initialState = {
	initState: "Set as initial state",
}

// Actions
const TITLE = 'ExtraRepaymentsPathwayReducer/TITLE';

// Action Creators 
export function resetValue() {
  return {
    type: TITLE,
    value: 'example'
  };
}

export const ExtraRepaymentsPathwayReducer = (state = initialState, action) => {
	switch(action.type) {
		case TITLE:
			return { ...state, loanType: action.value};
		default:
			return state;
	}
}
