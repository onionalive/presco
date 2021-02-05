import SInfo from 'react-native-sensitive-info';
import { AsyncStorage } from 'react-native';
import { Tranxactor } from 'app/common';
import {
	goUpdateProfile,
	clearProfile
} from 'app/components/profile/ProfileReducer';

// Initial state
let initialState = {
	loginLoad: false,
	expiration: null,
	rootViewTrue: true,
	isLoggedIn: false
}

const SESSION_TIMEOUT_THRESHOLD = 5 * 60 * 1000 ; // Will refresh the access token 5 minutes before it expires
let sessionTimeout = null;

import moment from 'moment';
/* Actions */
const LOGIN_LOADED = 'LoginReducer/LOGIN_LOADED';
const SET_EXPIRATION = 'LoginReducer/SET_EXPIRATION';
const CLEAR_EXPIRATION = 'LoginReducer/CLEAR_EXPIRATION';
const ROOT_VIEW_TRUE = 'LoginReducer/ROOT_VIEW_TRUE';
const CLEAR_LOGIN = 'LoginReducer/CLEAR_LOGIN';
const LOGIN_SUCCESS = 'LoginReducer/LOGIN_SUCCESS';


export const loginSucess = () => (dispatch) => {
	dispatch({ type: LOGIN_SUCCESS })
}

export const clearActions = async (dispatch) => {
	console.log('clearActions');
	await AsyncStorage.setItem('retry', '');
	await AsyncStorage.setItem('loggedIn', 'false');
	await AsyncStorage.setItem('userId', '');
	await SInfo.setItem('token', null, {});
	await SInfo.setItem('masterToken', null, {});
	// await AsyncStorage.setItem('onboarding', '');
	// await AsyncStorage.setItem('hype', '');
	clearProfile(dispatch);
	dispatch({ type: CLEAR_LOGIN });
}

export const goClearActions =  () => async (dispatch) => {
	clearActions(dispatch);
}

export const setExpiration =  (expiration) => async (dispatch) => {
	return dispatch({ type: SET_EXPIRATION, expiration })
}

export const goSetSessionTimeout = (data) => {
	return async (dispatch) => {
		await setSessionTimeout(data, dispatch);
	}
}

export const setSessionTimeout = async (data, dispatch) => {
	clearTimeout(sessionTimeout);
	const now = moment();
	const expiration_time = moment(data.expiration);
	const inTime = expiration_time.diff(now) - SESSION_TIMEOUT_THRESHOLD;
	console.log(inTime);
	if(inTime > 0){
		console.log('set timer');
		sessionTimeout = setTimeout(
			refreshToken,
			inTime,
			data.masterToken,
			dispatch
		);
	}
};

const clearSession = () => {
	if(sessionTimeout){
		console.log('clear timer');
		clearTimeout(sessionTimeout);
	}
};

export const goClearSession = () => {
	return async (dispatch) => {
		await clearSession();
		dispatch({ type: CLEAR_EXPIRATION });
	}
}

export const refreshToken = async (masterToken, dispatch) => {
	console.log('refreshToken');
	// console.log(masterToken);
	const result = await Tranxactor.asFetchResetToken(masterToken);
	console.log(result);
	if(result.status === 200){
		dispatch({ type: SET_EXPIRATION, expiration: result.data.expiration })
		console.log('set keys');
		await SInfo.setItem('token', result.data.token, {});
		await SInfo.setItem('masterToken', result.data.masterToken, {});
		// await setSessionTimeout(result.data, dispatch);
	} else {
		// clearSession();
	}
	return result;
};

export const goRefreshToken =  (masterToken) => {
	return async (dispatch) => {
		const result =  await refreshToken(masterToken, dispatch);
		return result;
	}
}


export const loginLoad = async ({dispatch}) => {
	const token = await SInfo.getItem('token', {});
	const masterToken = await SInfo.getItem('masterToken', {});
	const userId = await AsyncStorage.getItem('userId');
	console.log(token)
	console.log(userId)
	console.log(masterToken)
	if(!token || !userId || !masterToken){
		clearActions(dispatch);
		return dispatch({ type: LOGIN_LOADED });
	}
	const result = await refreshToken(masterToken, dispatch);
	if(result.status === 200){
		const { data, problem, status, ok } = await Tranxactor.asGetUserDetails(result.data.token, false);
		if(ok){
			await AsyncStorage.setItem('retry', '');
			goUpdateProfile(dispatch, data);
			dispatch({ type: LOGIN_SUCCESS });
		} else {
			clearActions(dispatch);
		} 
	} else if(result.status === 401 || result.status === 400 ){
		clearActions(dispatch);
	} else {
		console.log(result.problem);
		await AsyncStorage.setItem('retry', 'true');
	}
	dispatch({ type: LOGIN_LOADED });
}

export const isRootView = (isTrue) => {
	console.log('RUN', isTrue);
	return {
		type: ROOT_VIEW_TRUE,
		isRootView: isTrue
	}
}

// $FlowFixMe
export const LoginReducer = (state = initialState, action) => {
	switch(action.type) {
		case LOGIN_LOADED:
			return { ...state, loginLoad: true };
		case SET_EXPIRATION:
			return {...state, expiration: action.expiration};
		case CLEAR_EXPIRATION:
			return {...state, expiration: null}	
		case ROOT_VIEW_TRUE:
			return {...state, rootViewTrue: action.isRootView}
		case CLEAR_LOGIN:
		 	return { ...state, isLoggedIn: false}
		case LOGIN_SUCCESS:
		 	return { ...state, isLoggedIn: true}	 	
		default:
			return state;
	}
}
