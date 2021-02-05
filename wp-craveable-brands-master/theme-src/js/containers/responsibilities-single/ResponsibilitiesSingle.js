import { connect } from 'react-redux';
import ResponsibilitiesSingleView from './ResponsibilitiesSingleView';
import { fetchPage } from './ResponsibilitiesSingleReducer';

const mapStateToProps = (state) => {
	return {
		page: state.responsibilitiesSingleReducer.page,
	};
};

const mapDispatchToProps = dispatch => ({
	fetchPage: slug => dispatch(fetchPage(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponsibilitiesSingleView);
