import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import AddCardPathway from './AddCardPathwayView';

// action creators
import {
	updateNotification,
	updateNotificationBottom
} from 'app/components/home/HomeReducer';

import {
	getLoyaltyCards,
	removeCard
} from 'app/components/loyaltycardContainer/LoyaltyCardReducer';

import {
	refreshProfile
} from 'app/components/profile/ProfileReducer';

function mapStateToProps(state) {

	return {
		copy: state.FirebaseReducer.copy.cards,
		identAcceptor: state.ProfileReducer.emailAddress
	};

}

// const mapStateToProps = state => {
// 	console.log(state);
// };

// uncomment to match actions to props
// add function name as second argument to export

// function mapDispatchToProps(dispatch) {
//
// 		return bindActionCreators({
//			selectBook: selectBook
//		}, dispatch);
//
// }

// add imported action creators below to the {}
export default connect(mapStateToProps, {
	getLoyaltyCards,
	refreshProfile,
	updateNotification,
	updateNotificationBottom
})(AddCardPathway);