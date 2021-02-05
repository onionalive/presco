// Initial state
let initialState = {
	faqs: []
}

/* Actions */
const FAQ = 'HelpReducer/FAQ';

/* Action Creators */
export function resetValue() {
  return {
    type: FAQ,
    value: 'example'
  };
}

export const HelpReducer = (state = initialState, action) => {
	// console.log(state);
	switch(action.type) {
		/* Action Switch */
		case FAQ:
			return { ...state, loanType: action.value};
		default:
			return state;
	}
}