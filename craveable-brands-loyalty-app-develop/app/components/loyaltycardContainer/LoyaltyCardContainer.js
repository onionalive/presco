import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import LoyaltyCardContainerView from './LoyaltyCardContainerView';
// action creators
import {
	membershipCardId,
	getLoyaltyCards,
	removeCard,
	displayCards
} from './LoyaltyCardReducer';

// add imported action creators below to the {}

const mapStateToProps = (state) => {
 return {
		cards: displayCards(state),
		firstName: state.ProfileReducer.firstName,
		lastName: state.ProfileReducer.lastName,
		memberId: state.ProfileReducer.id,
		copy: state.FirebaseReducer.copy.cards.removeCard,
		membershipCardId: membershipCardId(state)
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getLoyaltyCards,
		removeCard
	}, dispatch);
}




export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyCardContainerView);
