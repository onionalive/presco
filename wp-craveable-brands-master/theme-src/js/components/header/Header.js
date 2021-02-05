import { connect } from 'react-redux';
import HeaderView from './HeaderView';
import { fetchHeader } from './HeaderReducer'

const mapStateToProps = (state) => ({
	header: state.headerReducer.header,
});

const mapDispatchToProps = (dispatch) => ({
	fetchHeader: () => dispatch(fetchHeader()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView);
