// Initial state
let initialState = {
	init: "Set as initial state",
}

/* Actions */
const TITLE = 'ModalDeleteAccountReducer/TITLE';

/* Action Creators */
export function resetValue() {
  return {
    type: TITLE,
    value: 'example'
  };
}

export const ModalDeleteAccountReducer = (state = initialState, action) => {
	switch(action.type) {
		/* Action Switch */
		case TITLE:
			return { ...state, loanType: action.value};
		default:
			return state;
	}
}