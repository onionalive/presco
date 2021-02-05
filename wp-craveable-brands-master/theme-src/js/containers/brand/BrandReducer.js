import Axios from 'axios';
import find from 'lodash/find';
import { errorHandler } from './../../libs/error';
import { BaseUrl } from './../../libs/baseUrl';

const baseURL = BaseUrl();

const initialState = {
	brands: {
		intro: {
			headingQuote: '',
			cite: '',
			copy: '',
		},
		banner: {
			image: '',
			copy: '',
		},
		pages: [],
	}
};

// Actions
const FETCH_PAGE_SUCCESS = 'BRAND/FETCH_PAGE_SUCCESS';

// Action Creators
export const fetchPageSuccess = (brands) => ({
	type: FETCH_PAGE_SUCCESS,
	brands
});

// Async Action Creators
export const fetchPage = () => {
	return (dispatch) => {
		Axios.get(`${baseURL}/wp-json/v2/custom/brands/`)
			.then((response) => {
				dispatch(fetchPageSuccess(response.data));
			})
			.catch((err) => {
				errorHandler(err);
			});
	};
}

export const BrandReducer = (state = initialState, action) => {
	switch (action.type) {
	case FETCH_PAGE_SUCCESS:
		return {
			...state,
			brands: action.brands,
		};
	default:
		return state;
	}
}
