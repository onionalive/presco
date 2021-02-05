/* Initial state */
let initialState = {
	initState: "Set as initial state",
}

/* Actions */
const TITLE = 'BreadcrumbsDocumentationReducer/TITLE';

/* Action Creators */
export function resetValue() {
  return {
    type: TITLE,
    value: 'example'
  };
}

export const BreadcrumbsDocumentationReducer = (state = initialState, action) => {
	switch(action.type) {
		/* Action Switch */
		case TITLE:
			return { ...state, loanType: action.value};
		default:
			return state;
	}
}