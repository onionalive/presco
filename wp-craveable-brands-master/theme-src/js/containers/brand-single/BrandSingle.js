import { connect } from 'react-redux';
import BrandSingleView from './BrandSingleView';
import { fetchPage } from './BrandSingleReducer';

const mapStateToProps = (state) => {
	return {
		brand: state.brandSingleReducer.brand,
	};
}

const mapDispatchToProps = (dispatch) => ({
	fetchPage: (slug) => dispatch(fetchPage(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandSingleView);
