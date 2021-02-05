import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Onboarding from './OnboardingView';

// action creators

function mapStateToProps(state) {
	return {
		stackCopy: state.FirebaseReducer.copy.onboard,
		appNav: state.appNav
	};
}

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
export default connect(mapStateToProps, {})(Onboarding);
