import Axios from 'axios';
import find from 'lodash/find';
import { errorHandler } from './../../libs/error';
import { BaseUrl } from './../../libs/baseUrl';

// Initial state
const initialState = {
	page: {
		title: '',
		banner: {
			image: '',
			copy: '',
		},
		executives: [],
		board: [],
		forumTitle: '',
		forumImages: '',
		forumParagraph: '',
	},
};

// Actions
const FETCH_PAGE_SUCCESS = 'OURLEADERS/FETCH_PAGE_SUCCESS';

// Action Creators
export const fetchPageSuccess = page => ({
	type: FETCH_PAGE_SUCCESS,
	page
});

// Async Action Creators
export const fetchPage = () => {
	const baseUrl = BaseUrl();
	const apiUrl = `${baseUrl}/wp-json/v2/leaders/page`;

	return (dispatch) => {
		Axios.get(apiUrl)
		.then((response) => {
			dispatch(fetchPageSuccess(response.data));
		})
		.catch((err) => {
			errorHandler(err);
		});
	};
};

export const OurLeadersReducer = (state = initialState, action) => {
	switch (action.type) {
	case FETCH_PAGE_SUCCESS:
		return {
			...state,
			page: action.page,
		};
	default:
		return state;
	}
};
