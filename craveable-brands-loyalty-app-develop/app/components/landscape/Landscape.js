import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Landscape from './LandscapeView';
import {
	membershipCardId
} from 'app/components/loyaltycardContainer/LoyaltyCardReducer';
// action creators

function mapStateToProps(state) {
	return {
		primaryCardID: membershipCardId(state)
	};

}

// add imported action creators below to the {}
export default connect(mapStateToProps, {})(Landscape);