import { combineReducers } from 'redux';

/* reducer-import */
import { HomeReducer } from '../app/components/home/HomeReducer';
import { AltReducer } from '../app/components/alt/AltReducer';

export default combineReducers({
	/* reducer-name */
	HomeReducer,
	AltReducer
});
