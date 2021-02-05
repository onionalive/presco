import { connect }	from 'react-redux';
import OurLeadersView from './OurLeadersView';
import { fetchPage } from './OurLeadersReducer';

const mapStateToProps = (state) => {
	return {
		page: state.ourLeadersReducer.page,
	};
};

const mapDispatchToProps = dispatch => ({
	fetchPage: () => dispatch(fetchPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OurLeadersView);
