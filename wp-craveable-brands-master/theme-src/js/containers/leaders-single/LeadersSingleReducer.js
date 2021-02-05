import Axios from 'axios';
import find from 'lodash/find';
import { errorHandler } from './../../libs/error';
import { BaseUrl } from './../../libs/baseUrl';

const baseURL = BaseUrl();

// Initial state
const initialState = {
	leader: {
		title: '',
		description: '',
		position: '',
		company: '',
		image: [],
		linkedin: '',
	},
	executives: [],
	board: [],
};

// Actions
const FETCH_LEADER_SUCCESS = 'LEADER/FETCH_LEADER_SUCCESS';
const FETCH_EXECUTIVES_SUCCESS = 'LEADER/FETCH_EXECUTIVES_SUCCESS';
const FETCH_BOARD_SUCCESS = 'LEADER/FETCH_BOARD_SUCCESS';

// Action Creators
export const fetchLeaderSuccess = leader => ({
	type: FETCH_LEADER_SUCCESS,
	leader
});

export const fetchExecutivesSuccess = executives => ({
	type: FETCH_EXECUTIVES_SUCCESS,
	executives
});

export const fetchBoardSuccess = board => ({
	type: FETCH_BOARD_SUCCESS,
	board
});

// Async Action Creators
export const fetchLeader = (slug) => {
	const apiUrl = `${baseURL}/wp-json/v2/leader/${slug}`;
	return (dispatch) => {
		Axios.get(apiUrl)
		.then((response) => {
			dispatch(fetchLeaderSuccess(response.data.leader));
			dispatch(fetchExecutivesSuccess(response.data.executives));
			dispatch(fetchBoardSuccess(response.data.board));
		})
		.catch((err) => {
			errorHandler(err);
		});
	};
};

export const LeadersSingleReducer = (state = initialState, action) => {
	switch (action.type) {
	case FETCH_LEADER_SUCCESS:
		return {
			...state,
			leader: action.leader,
		};
	case FETCH_EXECUTIVES_SUCCESS:
		return {
			...state,
			executives: action.executives,
		};
	case FETCH_BOARD_SUCCESS:
		return {
			...state,
			board: action.board
		};
	default:
		return state;
	}
};
