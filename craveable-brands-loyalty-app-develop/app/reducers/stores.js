import Stores from '../common/Stores.js';

// Initial state
let initialState = {};

/* Actions */
const UPDATE_STORES = 'StoresReducer/UPDATE_STORES';

/**
 * Update the stores using redux thunk middleware.
 */
export const updateStores = () => {
	return async function(dispatch) {
		const stores = await Stores.get();
		if (stores.data) {
			// Call to Redux using dispatch
			dispatch({
				type: UPDATE_STORES,
				value: stores.data
			});
		}
	}
}

// $FlowFixMe
export const StoresReducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_STORES:
			state = action.value;
			return state;
		default:
			return state;
	}
}


/* ------------- Selectors ------------- */

export const defaultFavouiratieStore = (State) => {
  return State.StoresReducer ? State.StoresReducer[3] : null
}
