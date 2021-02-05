import { Actions } from 'react-native-router-flux';

// Initial state
const initialState = {
	small: false,
	storedId: 0,
	isIdSet: false,
	storedFullName: "",
	storedEmail: "",
	storedPhone: "",
	storedImage: "",
	hasLoaded: false
}

// Actions
const UPDATE_SIZING = 'HomeState/UPDATE_SIZING';
const SET_FAVOURITE = 'HomeState/SET_FAVOURITE';
const UPDATE_LOADING = 'HomeState/UPDATE_LOADING';

// Action creators
export const updateSizing = (isSmall) => {
	return {
		type: UPDATE_SIZING,
		isSmall: isSmall
	};
}

export const updateLoading = (hasLoaded) => {
	return {
		type: UPDATE_LOADING,
		hasLoaded: hasLoaded
	};
}

export const setFavourite = (id = 0, isSet = false, fullName = "", email = "", phone = "", image = "") => {
	return {
		type: SET_FAVOURITE,
		storedId: id,
		isIdSet: isSet,
		storedFullName: fullName,
		storedEmail: email,
		storedPhone: phone,
		storedImage: image
	}
}

export function navCalculators() {
	Actions.calc();
}

export const HomeReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_SIZING: 
			return { ...state, small: action.isSmall };
		case UPDATE_LOADING: 
			return { ...state, hasLoaded: action.hasLoaded };
		case SET_FAVOURITE: 
			return { 
				...state, 
				storedId: action.storedId,
				isIdSet: action.isIdSet,
				storedFullName: action.storedFullName,
				storedEmail: action.storedEmail,
				storedPhone: action.storedPhone,
				storedImage: action.storedImage
			};
		default:
			return state;
	}
}
