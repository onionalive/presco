import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

// reducer-import
import { HomeReducer } from '../components/home/HomeReducer';
import { HeaderReducer } from '../components/header/HeaderReducer';

export default combineReducers({
	// target
	HomeReducer: HomeReducer,
	HeaderReducer: HeaderReducer,
	routing: routerReducer
});
