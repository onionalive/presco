
// Initial state
let initialState = {
	profile: {
		firstName: 'Billy',
		lastName: 'Smith',
		birthday: '22/01/1990',
		address: '22 Stoked Ave, Cunnamulla',
		email: 'stoked@stokeville.com',
		phone: '0400000000',
		loyaltyBalance: '48.39',
		userName: '',
		userId: '',
		userType: '',
		ranking: {
			value: null
		},
		memberships: null
	}
};

/* Actions */
const UPDATE_PROFILE       = 'ProfileReducer/UPDATE_PROFILE';

/* Action Creators */
export const updateProfile = data => ({
	type: UPDATE_PROFILE,
	data
});

export const goUpdateProfile = data => {
	return function(dispatch) {
		dispatch(updateProfile(data))
	}
}

/* Reducer */
export const SigninReducer = (state = initialState, action) => {
	switch(action.type) {
		/* Action Switch */
		case UPDATE_PROFILE:
			return { 
				...state,
				profile: action.data
			};
		default:
			return state;
	}
};