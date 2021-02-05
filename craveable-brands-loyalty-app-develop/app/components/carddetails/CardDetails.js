import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardDetails from './CardDetailsView';
import {
	membershipCardId
} from 'app/components/loyaltycardContainer/LoyaltyCardReducer';
// action creator

function mapStateToProps(state) {
	return {
		firstName: state.ProfileReducer.firstName,
		lastName: state.ProfileReducer.lastName,
		phone: state.ProfileReducer.phone,
		primaryCardID: membershipCardId(state)
	};
}

export default connect(mapStateToProps, {})(CardDetails);