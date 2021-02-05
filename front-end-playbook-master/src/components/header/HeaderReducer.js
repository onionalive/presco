import data from './Header.json';

// Initial state
let initialState = {
	data: data
}

/* Actions */
const TITLE = 'HeaderReducer/TITLE';

/* Action Creators */
export function resetValue() {
  return {
    type: TITLE,
    value: 'example'
  };
}

export const HeaderReducer = (state = initialState, action) => {
	switch(action.type) {
		/* Action Switch */
		case TITLE:
			return { ...state, loanType: action.value};
		default:
			return state;
	}
}
