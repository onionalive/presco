import Axios from 'axios';
import find from 'lodash/find';
import { errorHandler } from './../../libs/error';
import { BaseUrl } from './../../libs/baseUrl';

const baseURL = BaseUrl();

// Initial state
const initialState = {
	title: '',
	page: {
		acf: {
			executive: [],
			forumImages: [],
			forumTitle: '',
			forumParagraph: '',
			rows: [],
			banner: [{
				bannerImage: {
					sizes: {
						large: '',
					},
				},
				bannerCopy: '',
			}],
			circles: [],
			introCite: '',
			introCopy: '',
			introHadingQuote: '',
			brandsHeading: '',
			brandsCopy: '',
			brandTile: [{
				backgroundImage: '',
				logo: '',
				buttonText: '',
			}],
			images: [],
			content_tile: [],
			download_items: [],
			section_title: '',
		},
	},
};

// Actions
const FETCH_PAGE_SUCCESS = 'RESPONSIBILTIES/FETCH_PAGE_SUCCESS';

// Action Creators
export const fetchPageSuccess = page => ({
	type: FETCH_PAGE_SUCCESS,
	page
});

// Async Action Creators
export const fetchPage = (slug) => {
	return (dispatch) => {
		Axios.get(`${baseURL}/wp-json/wp/v2/responsibilities`)
		.then((response) => {
			const page = find(response.data, { slug });

			if ('acf' in page) {
				if ('images' in page.acf) {
					let updatedImgs = page.acf.images.map((obj) => {
						return {
							image: {
								url: obj.image.sizes.large,
							},
							title: obj.image.title,
						};
					});
					page.acf.images = updatedImgs;
				}
			}
			dispatch(fetchPageSuccess(page));
		})
		.catch((err) => {
			errorHandler(err);
		});
	};
};

export const ResponsibilitiesSingleReducer = (state = initialState, action) => {
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
