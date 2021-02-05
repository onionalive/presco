import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import AccountSettings from './AccountSettingsView';

import {
	updateProfile
} from 'app/components/profile/ProfileReducer';
import { goClearActions, goClearSession,isRootView } from 'app/reducers/login';

const mapStateToProps = (state) => {
	return {
		email: state.ProfileReducer.emailAddress,
		phone: state.ProfileReducer.mobileNumber
	};
}

export default connect(mapStateToProps, {
	updateProfile,
	goClearSession,
	goClearActions,
	isRootView
})(AccountSettings);