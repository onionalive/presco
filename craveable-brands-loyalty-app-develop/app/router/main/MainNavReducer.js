import MainNav from './MainNavigation';
// import { NavigationActions } from 'react-navigation';

const initialState = MainNav.router.getStateForAction(MainNav.router.getActionForPathAndParams('TabBar'));

export const MainNavReducer = (state = initialState, action) => {
  const nextState = MainNav.router.getStateForAction(action, state);
  return nextState || state;
};