import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RetryScreenView from './RetryScreenView';

// action creators
import { updateProfile } from 'app/components/profile/ProfileReducer';
import { membershipCardId } from 'app/components/loyaltycardContainer/LoyaltyCardReducer';
import { goClearActions, setExpiration, goRefreshToken, loginSucess } from 'app/reducers/login';

const mapStateToProps = state => {
	return {
		userId: state.ProfileReducer.userId,
		primaryCardID: membershipCardId(state)
	};
}

// add imported action creators below to the {}
export default connect(mapStateToProps, {
		setExpiration,
		goClearActions,
		updateProfile,
		goRefreshToken,
		loginSucess
	})(RetryScreenView);