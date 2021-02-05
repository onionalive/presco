import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ProfileReducer } from '../components/profile/ProfileReducer';
import { OffersReducer } from '../components/offers/OffersReducer';
import { SigninReducer } from '../components/signin/SigninReducer';
import { FirebaseReducer } from './firebase';

export default combineReducers({
	// target
	ProfileReducer,
	OffersReducer,
	SigninReducer,
	FirebaseReducer,
	routing: routerReducer
});
