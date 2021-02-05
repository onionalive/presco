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
		rows: [],
		pages: []
	},
};

// Actions
const FETCH_PAGE_SUCCESS = 'CAREERS/FETCH_PAGE_SUCCESS';

// Action Creators
export const fetchPageSuccess = (careers) => ({
	type: FETCH_PAGE_SUCCESS,
	careers
});

// Async Action Creators
export const fetchPage = () => {
	return (dispatch) => {
		Axios.get(`${baseURL}/wp-json/v2/custom/careers`)
		.then((response) => {
			dispatch(fetchPageSuccess(response.data));
		})
		.catch((err) => {
			errorHandler(err);
		});
	};
};

export const CareersReducer = (state = initialState, action) => {
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
