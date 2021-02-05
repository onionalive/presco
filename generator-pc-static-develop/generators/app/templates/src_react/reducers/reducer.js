import { combineReducers } from 'redux';

import { AppReducer } from '../components/app/AppReducer';

const rootReducer = combineReducers({
    AppReducer: AppReducer
});

export default rootReducer;
