import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import FinishSignUpActivationView from './FinishSignUpActivationView';

function mapStateToProps(state) {
	return {
		hype: state.FirebaseReducer.copy.hype,
		appNav: state.appNav
	};

}

// add imported action creators below to the {}
export default connect(mapStateToProps, {
	
})(FinishSignUpActivationView);