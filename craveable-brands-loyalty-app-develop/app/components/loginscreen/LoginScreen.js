import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginScreen from './LoginScreenView';

// action creators
import {
	getToken,
	updateProfile,
	updateMemberships
} from 'app/components/profile/ProfileReducer';

import {
	updateNotificationBottom,
	updateShowNotificationBottom
} from 'app/components/home/HomeReducer';

import {
	getOffersActive,
	getOffersExpired
} from 'app/components/offers/OffersReducer';

import {
	getLoyaltyCards
} from 'app/components/loyaltycardContainer/LoyaltyCardReducer';
import { setExpiration, goSetSessionTimeout, isRootView, loginSucess } from 'app/reducers/login';

function mapStateToProps(state) {
	return {
		example: state.stateTarget,
		signIn: state.FirebaseReducer.copy.signIn,
		signUp: state.FirebaseReducer.copy.signUp,
		hype: state.FirebaseReducer.copy.hype
	};
}

// add imported action creators below to the {}
export default connect(mapStateToProps, {
	getToken,
	goSetSessionTimeout,
	updateProfile,
	getOffersActive,
	getOffersExpired,
	getLoyaltyCards,
	updateMemberships,
	setExpiration,
	isRootView,
	loginSucess,
	updateNotificationBottom,
	updateShowNotificationBottom
})(LoginScreen);
