import AppNavigation from './AppNavigation';

const initialState = AppNavigation.router.getStateForAction(AppNavigation.router.getActionForPathAndParams('RootNav'));

export const AppNavReducer = (state = initialState, action) => {
  const nextState = AppNavigation.router.getStateForAction(action, state);
  // console.log(nextState);
  return nextState || state;
};
