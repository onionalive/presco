// Initial state
let initialState = {
	appReducerState: 'Example 1',
	anotherAppReducerState: 'Example 2'
}

// Actions
const FIRST = 'AppReducer/FIRST';

// Action Creators
export function firstAction() {
	return {
		type: FIRST,
		payload: 'Test'
	};
}

export function AppReducer(state = initialState, action) {
	switch(action.type) {
		case FIRST:
			return {
				...state,
				example: action.payload
			};
			break;
		default:
			return state;
	}
}
