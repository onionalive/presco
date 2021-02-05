import { connect } from 'react-redux';
import BrandView from './BrandView';
import { fetchPage } from './BrandReducer';

const mapStateToProps = (state) => {
	return {
		brands: state.brandReducer.brands,
	};
}

const mapDispatchToProps = (dispatch) => ({
	fetchPage: () => dispatch(fetchPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandView);
