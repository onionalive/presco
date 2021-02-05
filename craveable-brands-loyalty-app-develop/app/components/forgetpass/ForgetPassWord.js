import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ForgetPassWordView from './ForgetPassWordView';

// action creators
// import {} from './nameReducer'

function mapStateToProps(state) {

	return {
		copy: state.FirebaseReducer.copy.forgetPass,
	};

}


export default connect(mapStateToProps, {})(ForgetPassWordView);