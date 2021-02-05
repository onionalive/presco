//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from './Router'; 

import { updateNotification, updateNotificationBottom, updateShowNotificationBottom } from 'app/components/home/HomeReducer';

/**
 * Router potential screen list
 */
export const SCREEN_HOME 		= 'Home';
export const SCREEN_PROFILE 	= 'Profile';
export const SCREEN_OFFERS 		= 'Offers';
export const SCREEN_MORE		= 'More';

export const SCREENS = [
	SCREEN_HOME,
	SCREEN_PROFILE,
	SCREEN_OFFERS,
	SCREEN_MORE
];

const mapStateToProps = (state) => {
	return {
		title: 'Router Title',
		notificationText: state.HomeReducer.notificationText,
		notificationTextBottom: state.HomeReducer.notificationTextBottom,
		showNotificationBottom: state.HomeReducer.showNotificationBottom,
		loginLoaded: state.LoginReducer.loginLoad,
		appNav: state.appNav
	}
}

function mapDispatchToProps(dispatch){
	return Object.assign({dispatch: dispatch}, bindActionCreators({
		updateNotification, 
		updateNotificationBottom,
		updateShowNotificationBottom
	}, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);
