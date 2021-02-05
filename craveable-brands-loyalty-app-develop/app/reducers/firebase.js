import copy from 'app/copy/index.json';
import merge from 'deepmerge';

// Initial state
let initialState = {
	copy: copy
}

/* Actions */
const UPDATE_COPY = 'FirebaseReducer/UPDATE_COPY';
const UPDATE_PROMOTIONS = 'FirebaseReducer/UPDATE_PROMOTIONS';

// $FlowFixMe
export const FirebaseReducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_COPY:
			state.copy = merge(state.copy, action.value);
			return state;
		case UPDATE_PROMOTIONS:
			state.promotions = action.value;
			return state;
		default:
			return state;
	}
}
