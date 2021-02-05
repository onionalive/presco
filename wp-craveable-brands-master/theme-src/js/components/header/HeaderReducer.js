import Axios from 'axios';
import find from 'lodash/find';
import { errorHandler } from './../../libs/error';
import { BaseUrl } from './../../libs/baseUrl';

// Initial state
const initialState = {
	header: {
		responsibilities: [{
			title: '',
			slug: '',
			description: '',
		}],
		brands: [{
			title: '',
			slug: '',
			description: '',
		}],
		leaderType: [{
			title: '',
			slug: '',
			description: '',
		}],
		careerTypes: [{
			title: '',
			slug: '',
		}],
	}
};

// Actions
const FETCH_HEADER_SUCCESS = 'HEADER/FETCH_HEADER_SUCCESS';

// Action Creators
export const fetchHeaderSuccess = (header) => ({
	type: FETCH_HEADER_SUCCESS,
	header
});

// Async Action Creators
export const fetchHeader = () => {
	const baseUrl = BaseUrl();
	const apiUrl = `${baseUrl}/wp-json/v2/custom/header`;

	return (dispatch) => {
		Axios.get(apiUrl)
		.then((response) => {
			dispatch(fetchHeaderSuccess(response.data));
		})
		.catch((err) => {
			errorHandler(err);
		});
	};
}

export const HeaderReducer = (state = initialState, action) => {
	switch (action.type) {
	case FETCH_HEADER_SUCCESS:
		return {
			...state,
			header: action.header,
		};
	default:
		return state;
	}
}
