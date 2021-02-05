import Axios from 'axios';
import find from 'lodash/find';
import { errorHandler } from './../../libs/error';
import { BaseUrl } from './../../libs/baseUrl';

const baseURL = BaseUrl();

const initialState = {
	brand: {
		title: '',
		content: '',
		leader: {
			name: '',
			position: '',
			description: '',
			slug: '',
			type: '',
			image: '',
		},
		banner: {
			image: '',
			copy: '',
		},
		logo: '',
		links: [],
		carouselImages: [],
	}
};

// Actions
const FETCH_PAGE_SUCCESS = 'BRAND/FETCH_PAGE_SUCCESS';

// Action Creators
export const fetchPageSuccess = (brand) => ({
	type: FETCH_PAGE_SUCCESS,
	brand
});

// Async Action Creators
export const fetchPage = (slug) => {
	return (dispatch) => {
		Axios.get(`${baseURL}/wp-json/v2/brand/${slug}`)
		.then((response) => {
			dispatch(fetchPageSuccess(response.data));
		})
		.catch((err) => {
			errorHandler(err);
		});
	};
}

export const BrandSingleReducer = (state = initialState, action) => {
	switch (action.type) {
	case FETCH_PAGE_SUCCESS:
		return {
			...state,
			brand: action.brand,
		};
	default:
		return state;
	}
}
