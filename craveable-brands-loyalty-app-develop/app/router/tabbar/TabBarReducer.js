import TabBarNavigator from './TabBarNavigation';
import { NavigationActions } from 'react-navigation';

const initialState = TabBarNavigator.router.getStateForAction(NavigationActions.init());
/**
 * TabBar Reducer
 * @param {*} state 
 * @param {*} action 
 */
export const TabBarReducer = (state = initialState, action) => {
	const nextState = TabBarNavigator.router.getStateForAction(action, state);

    return nextState || state
}