import {connect} from 'react-redux';
import CareersSingleView from './CareersSingleView';
import { fetchPage } from './CareersSingleReducer'

const mapStateToProps = (state) => {
	return {
	  careers: state.careersSingleReducer.careers,
	};
}

const mapDispatchToProps = (dispatch) => ({
	fetchPage: (slug) => dispatch(fetchPage(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CareersSingleView);
