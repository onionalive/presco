import Axios from 'axios';
import find from 'lodash/find';
import { errorHandler } from './../../libs/error';
import { BaseUrl } from './../../libs/baseUrl';

const baseURL = BaseUrl();

// Initial state
const initialState = {
	responsibilities: {
		banner: {
			image: '',
			copy: '',
		},
		intro: {
			headingQuote: '',
			cite: '',
			copy: '',
		},
		pages: []
	},
};

// Actions
const FETCH_PAGE_SUCCESS = 'RESPONSIBILTIES/FETCH_PAGE_SUCCESS';

// Action Creators
export const fetchPageSuccess = responsibilities => ({
	type: FETCH_PAGE_SUCCESS,
	responsibilities
});

// Async Action Creators
export const fetchPage = () => {
	return (dispatch) => {
		Axios.get(`${baseURL}/wp-json/v2/custom/responsibilities`)
		.then((response) => {
			dispatch(fetchPageSuccess(response.data));
		})
		.catch((err) => {
			errorHandler(err);
		});
	};
};

export const ResponsibilitiesReducer = (state = initialState, action) => {
	switch (action.type) {
	case FETCH_PAGE_SUCCESS:
		return {
			...state,
			responsibilities: action.responsibilities,
		};
	default:
		return state;
	}
};
