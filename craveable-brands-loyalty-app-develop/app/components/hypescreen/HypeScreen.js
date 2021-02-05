import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import HypeScreenView from './HypeScreenView';

function mapStateToProps(state) {
	return {
		hype: state.FirebaseReducer.copy.hype,
		appNav: state.appNav
	};

}

// add imported action creators below to the {}
export default connect(mapStateToProps, {
	
})(HypeScreenView);