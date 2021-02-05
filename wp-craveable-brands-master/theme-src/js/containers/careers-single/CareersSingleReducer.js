import Axios from 'axios';
import find from 'lodash/find';
import { errorHandler } from './../../libs/error';
import { BaseUrl } from './../../libs/baseUrl';

const baseURL = BaseUrl();

// Initial state
let initialState = {
	careers: {
		banner: {
			'image': '',
			'copy': '',
		},
		intro: {
			headingQuote: '',
			cite: '',
			copy: '',
		},
		careerTile: {
			'image': '',
			'copy': '',
		},
		jobAdderID: '',
		title: '',
	},
};

// Actions
const FETCH_PAGE_SUCCESS = 'CAREERSSINGLE/FETCH_PAGE_SUCCESS';

// Action Creators
export const fetchPageSuccess = (careers) => ({
	type: FETCH_PAGE_SUCCESS,
	careers
});

// Async Action Creators
export const fetchPage = (slug) => {
	return (dispatch) => {
		Axios.get(`${baseURL}/wp-json/v2/custom/career/${slug}`)
		.then((response) => {
			dispatch(fetchPageSuccess(response.data));
		})
		.catch((err) => {
			errorHandler(err);
		});
	};
}

export const CareersSingleReducer = (state = initialState, action) => {
	switch(action.type) {
	case FETCH_PAGE_SUCCESS:
		return {
			...state,
			careers: action.careers,
		};
	default:
		return state;
	}
}
