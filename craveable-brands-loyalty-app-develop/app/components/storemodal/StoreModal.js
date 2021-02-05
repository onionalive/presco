import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StoreModal from './StoreModalView';

// action creator

function mapStateToProps(state) {
	return {
		stores: state.StoresReducer
	};
}

export default connect(mapStateToProps, {})(StoreModal);