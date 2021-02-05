// Initial state
let initialState = {
	initState: "Set as initial state",
}

// Actions
const TITLE = 'ProfileReducer/TITLE';

// Action Creators 
export function resetValue() {
  return {
    type: TITLE
  };
}

export default function ProfileReducer(state = initialState.initState, action) {
	switch(action.type) {
		case 'TITLE':
			return action.payload
	}
	return state;
}
