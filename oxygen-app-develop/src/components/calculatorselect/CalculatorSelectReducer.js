// Initial state
let initialState = {
	initState: "Set as initial state",
}

// Actions
const TITLE = 'CalculatorSelectReducer/TITLE';

// Action Creators 
export function resetValue() {
  return {
    type: TITLE
  };
}

export default function CalculatorSelectReducer(state = initialState.initState, action) {
	switch(action.type) {
		case 'TITLE':
			return action.payload
	}
	return state;
}
