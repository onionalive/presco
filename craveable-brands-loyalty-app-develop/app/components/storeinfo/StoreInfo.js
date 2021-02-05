import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import StoreInfoView from './StoreInfoView';

// action creators
function mapStateToProps(state) {
	return {
		stores: state.StoresReducer,
		appNav: state.appNav,
		mainNav: state.mainNav
	};
}

export default connect(mapStateToProps, {
})(StoreInfoView);