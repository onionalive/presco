import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import LoyaltyStatus from './LoyaltyStatusView';

// action creators
// import {} from './nameReducer'

function mapStateToProps(state) {
	return {
		tiers: state.FirebaseReducer.copy.tiers
	};
}

export default connect(mapStateToProps, {})(LoyaltyStatus);
