import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import AppView from './AppView';
import { firstAction } from './AppReducer';

function mapStateToProps(state) {
	return {
		appReducerState: state.appReducerState,
		anotherAppReducerState: state.anotherAppReducerState
	};
}

export default connect(mapStateToProps, {
	firstAction
})(AppView);
