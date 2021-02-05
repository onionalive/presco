import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Profile from './ProfileView';

// action creators
import { updateProfile, getToken } from './ProfileReducer';
import { defaultFavouiratieStore } from 'app/reducers/stores';
import {
	updateNotification,
	updateNotificationBottom
} from 'app/components/home/HomeReducer';
import { goClearActions, goClearSession,isRootView } from 'app/reducers/login';

const mapStateToProps = (state) => {
	return {
		firstName: state.ProfileReducer.firstName,
		lastName: state.ProfileReducer.lastName,
		birthday: state.ProfileReducer.birthday,
		address: state.ProfileReducer.address,
		emailAddress: state.ProfileReducer.email,
		mobileNumber: state.ProfileReducer.phone,
		loyaltyBalance: state.ProfileReducer.loyaltyBalance,
		loyaltyStatus: state.ProfileReducer.ranking.value,
		userName: state.ProfileReducer.userName,
		userId: state.ProfileReducer.userId,
		userType: state.ProfileReducer.userType,
		defaultFavouiratieStore: defaultFavouiratieStore(state),
		appNav: state.appNav
	};
}

export default connect(mapStateToProps, {
	updateNotificationBottom,
	updateProfile,
	getToken,
	goClearSession,
	goClearActions,
})(Profile);