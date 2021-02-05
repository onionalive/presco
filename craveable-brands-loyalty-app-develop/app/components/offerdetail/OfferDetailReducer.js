// Initial state
let initialState = {
	init: "Set as initial state",
	buttonText: "See more",
	title: 'Transactions'
}

/* Actions */
const UPDATE_BUTTON = 'OfferDetailReducer/UPDATE_BUTTON';

/* Action Creators */
export function updateButton(arg) {
  return {
    type: UPDATE_BUTTON,
    buttonText: arg
  };
}

export const OfferDetailReducer = (state = initialState, action) => {
	switch(action.type) {
		/* Action Switch */
		case UPDATE_BUTTON:
			return { ...state, buttonText: action.buttonText};
		default:
			return state;
	}
}
