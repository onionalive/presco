import { combineReducers } from 'redux';

/* reducer import */
import { HomeReducer } from '../modules/home/HomeReducer.js';

const rootReducer = combineReducers({
    // target
    homeReducer: HomeReducer,
});

export default rootReducer;
