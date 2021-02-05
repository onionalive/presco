import { connect } from 'react-redux';
import ResponsibilitiesView from './ResponsibilitiesView';
import { fetchPage } from './ResponsibilitiesReducer';

const mapStateToProps = (state) => {
	return {
		responsibilities: state.responsibilitiesReducer.responsibilities,
	};
};

const mapDispatchToProps = dispatch => ({
	fetchPage: () => dispatch(fetchPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponsibilitiesView);
