import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileDetails from './ProfileDetailsView';
import {
	getLoyaltyCards,
	removeCard
} from 'app/components/loyaltycardContainer/LoyaltyCardReducer';
// action creators
// import {} from './nameReducer'
import {
	updateNotification,
	updateNotificationBottom
} from 'app/components/home/HomeReducer';
import {
	updateProfile
} from 'app/components/profile/ProfileReducer';

function mapStateToProps(state) {
	return {
		firstName: state.ProfileReducer.firstName,
		lastName: state.ProfileReducer.lastName,
		id: state.ProfileReducer.id,
		birthday: state.ProfileReducer.birthDate,
		address: state.ProfileReducer.address1,
		profile: state.ProfileReducer
	};
}

// add imported action creators below to the {}
export default connect(mapStateToProps, {
	updateNotificationBottom,
	updateProfile,
	getLoyaltyCards
})(ProfileDetails);