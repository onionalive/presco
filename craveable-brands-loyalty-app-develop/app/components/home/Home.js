import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeView from './HomeView';

// action creators
import {
	updateSelectedItem,
	getOffersActive,
	getOffersExpired
} from 'app/components/offers/OffersReducer';
import {
	updateMemberships
} from 'app/components/profile/ProfileReducer';
import {
	updateNotification,
	updateNotificationBottom
} from './HomeReducer';
import {
	updateStores
} from 'app/reducers/stores';
import {
	getLoyaltyCards,
	membershipCardId
} from 'app/components/loyaltycardContainer/LoyaltyCardReducer';

function mapStateToProps(state) {
	return {
		firstName: state.ProfileReducer.firstName,
		lastName: state.ProfileReducer.lastName,
		loyaltyBalance: state.ProfileReducer.loyaltyBalance,
		loyaltyStatus: state.ProfileReducer.ranking.value,
		notificationText: state.HomeReducer.notificationText,
		notificationTextBottom: state.HomeReducer.notificationTextBottom,
		copy: state.FirebaseReducer.copy.home,
		promotions: state.FirebaseReducer.promotions,
		offers: state.OffersReducer.offersActive,
		appNav: state.appNav,
		tabBar: state.tabBar,
		primaryCardID: membershipCardId(state)
	};
}

// add imported action creators below to the {}
export default connect(mapStateToProps, {
	updateSelectedItem,
	updateNotification,
	updateNotificationBottom,
	updateStores,
	getOffersActive,
	updateMemberships,
	getOffersExpired,
	getLoyaltyCards
})(HomeView);
