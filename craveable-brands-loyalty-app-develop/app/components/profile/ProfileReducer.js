/**
 * Use this reducer to deal with all account
 * information
 */
import Config from 'craveable-brands-loyalty-app/app.config';
import { Tranxactor } from 'app/common';
import SInfo from 'react-native-sensitive-info';
import { AsyncStorage } from 'react-native';
import { find } from 'lodash';
// Initial state
let initialState = {
	firstName: '',
	lastName: '',
	birthDate: '',
	address1: '',
	emailAddress: '',
	phone: '',
	loyaltyBalance: '',
	userName: '',
	userId: '',
	userType: '',
	ranking: {
		value: null
	},
	memberships: null,
	primaryCard: null
}
const CARD_ISO = 'Card ISO';

/* Actions */
const UPDATE_PROFILE 			= 'ProfileReducer/UPDATE_PROFILE';
const CREATE_MEMBER 			= 'ProfileReducer/CREATE_MEMBER';
const UPDATE_MEMBERSHIPS 		= 'ProfileReducer/UPDATE_MEMBERSHIPS';
const LOGIN 					= 'ProfileReducer/LOGIN';
const CLEAR_PROFILE      		= 'ProfileReducer/CLEAR_PROFILE';

/* Action Creators */

export function refreshProfile(token) {
	return async function(dispatch) {
		try {
			const userDetails = await Tranxactor.getUserDetails(token);
			console.log(userDetails);
			if(userDetails.status === 200) {
				dispatch(updateProfile(userDetails.data));
			}
		} catch(err) {
			console.log(err);
			// dispatch({ type: RECEIVE_PROFILE_FAILURE })
		}
	}
}

/**
 * Update the reducer info for a user
 * @param {*} data Object containing all of the user data
 */
export function updateProfile(data) {
 	return {
		type: UPDATE_PROFILE,
		data: data
  	};
}

export const goUpdateProfile = (dispatch, data) => {
	return dispatch(updateProfile(data));
}

export const clearProfile = (dispatch) => {
 	return dispatch({ type: CLEAR_PROFILE });
}

/**
 * Update user details on successful login call
 * @param {*} data Object container user details
 */
export function getToken(data) {
	return {
		type: LOGIN,
		data: {
			userId: data.userId,
			userName: data.userName,
			userType: data.userType
		}
	};
}

/**
 * Update the membership cards for the user
 * @param  {[type]} data Tranxactor.getIdentifierList return data
 */
export function updateMemberships(data) {
	const primaryCard = data
		.filter(member => member.memberIdentifierType.value === CARD_ISO)
		.filter((d, i) => i === 0);

	return {
		type: UPDATE_MEMBERSHIPS,
		data: data,
		primaryCard: primaryCard.length ? primaryCard[0] : null
	};
}

/**
 * Attempt submission to create a new member
 * @param {*} data Object container user details
 */
export function createNewMember(tokenId, data) {
	return async function(dispatch) {
		const res = await Tranxactor.createNewMember(tokenId, data);
		dispatch({
			type: CREATE_MEMBER,
			data: {
				userId: data.userId,
				userName: data.userName,
				userType: data.userType
			}
		});
	}
}

export const ProfileReducer = (state = initialState, action) => {
	switch(action.type) {
		/* Action Switch */
		case CLEAR_PROFILE:
			return initialState;
		case UPDATE_PROFILE:
			return { 
				...state,
				...action.data
			};
		case LOGIN:
			return { 
				...state,
				...action.data
			};
		case UPDATE_MEMBERSHIPS:
			return {
				...state,
				memberships: action.data,
				primaryCard: action.primaryCard
			}
		default:
			return state;
	}
}


/* ------------- Selectors ------------- */

export const membershipCardId = (State) => {
	const memberships = State.ProfileReducer ? State.ProfileReducer.memberships : null;
  	let primary_card;
  	if(memberships) {
  		primary_card = find(memberships, (membership) => {
  			return membership.memberIdentifierType && membership.memberIdentifierType.value === 'Card ISO'
  				&& membership.identifierStatus && membership.identifierStatus.id === '1';
  		});
  	}
  	return primary_card ? primary_card.memberIdentifier : null;
}


