import Axios from 'axios';
import find from 'lodash/find';
import { errorHandler } from './../../libs/error';
import { BaseUrl } from './../../libs/baseUrl';

const baseURL = BaseUrl();

// Initial state
const initialState = {
	home: {
		banner: {
			image: '',
			copy: '<h2 style="text-align: center;">we love food</h2><p style="text-align: center;">craveable brands. operates over 570 restaurants across 3 iconic Australian brands. Combined our restaurants hire over 12,500 employees and serve over 150,000 customers a day. It’s safe to say we’re cooking.</p>',
		},
		intro: {
			headingQuote: '',
			cite: '',
			copy: '',
		},
		contentTiles: [],
		people: [],
		forum: {
			title: '',
			paragraph: '',
			images: [],
		},
		brand: {
			heading: '',
			copy: '',
			brands: [],
		},
		images: [],
		downloads: [],
	},
};

// Actions
const TITLE = 'HOME/TITLE';
const FETCH_PAGE_SUCCESS = 'HOME/FETCH_PAGE_SUCCESS';

// Action Creators
export const setTitle = title => ({
	type: TITLE,
	title,
});

export const fetchPageSuccess = home => ({
	type: FETCH_PAGE_SUCCESS,
	home,
});

// Async Action Creators
export const fetchPage = () => {
	const apiUrl = `${baseURL}/wp-json/wp/v2/pages`;

	return (dispatch) => {
		Axios.get(`${baseURL}/wp-json/v2/custom/home`)
		.then((response) => {
			dispatch(fetchPageSuccess(response.data));
		})
		.catch((err) => {
			errorHandler(err);
		});
	};
};

export const HomeReducer = (state = initialState, action) => {
	switch (action.type) {
	case TITLE:
		return {
			...state,
			title: action.title
		};
	case FETCH_PAGE_SUCCESS:
		return {
			...state,
			home: action.home,
		};
	default:
		return state;
	}
};
