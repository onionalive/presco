import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Help from './HelpView';

// action creators
// import {} from './nameReducer'

function mapStateToProps(state) {
	return {
		faqs: state.FirebaseReducer.copy.faqs.items,
		heading: state.FirebaseReducer.copy.faqs.heading,
		copy: state.FirebaseReducer.copy.faqs.copy
		// options: state.FirebaseReducer.copy.more.items,
	};
}

export default connect(mapStateToProps, {})(Help);
