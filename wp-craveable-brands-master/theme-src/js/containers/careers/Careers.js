import {connect} from 'react-redux';
import CareersView from './CareersView';
import { fetchPage } from './CareersReducer'

const mapStateToProps = (state) => {
	return {
		careers: state.careersReducer.careers,
	};
}

const mapDispatchToProps = (dispatch) => ({
	fetchPage: () => dispatch(fetchPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CareersView);
