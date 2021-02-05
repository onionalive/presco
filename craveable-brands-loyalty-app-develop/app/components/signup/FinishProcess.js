import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import FinishProcess from './FinishProcessView';

// action creators
import {
	updateEmail,
	updateName,
	updateLastName,
	updatePhone,
	updateError,
	updatePassword,
	updateCardNumber,
	updateCardPin
} from './SignUpReducer';

import {
	getToken,
	updateProfile,
	updateMemberships
} from 'app/components/profile/ProfileReducer';

import {
	updateNotificationBottom
} from 'app/components/home/HomeReducer';

import { setExpiration, goSetSessionTimeout, isRootView } from 'app/reducers/login';

function mapStateToProps(state) {
	return {
		error: state.SignUpReducer.error,
		copy: state.FirebaseReducer.copy,
		primaryCard: state.ProfileReducer.primaryCard,
		cardNumber: state.SignUpReducer.cardNumber,
		cardPin: state.SignUpReducer.cardPin
	};
}

// add imported action creators below to the {}
export default connect(mapStateToProps, {
	// updateEmail,
	// updateName,
	// updateLastName,
	// updatePhone,
	updateError,
	// updateCardNumber,
	// updateCardPin
	getToken,
	updateProfile,
	updateMemberships,
	setExpiration, 
	goSetSessionTimeout,
	isRootView,
	updateNotificationBottom
})(FinishProcess);
