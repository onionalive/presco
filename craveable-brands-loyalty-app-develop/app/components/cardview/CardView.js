import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import CardView from './CardViewView';

// action creators
// import {} from './nameReducer'

function mapStateToProps(state) {

	return {
		example: state.stateTarget,
	};

}

// uncomment to match actions to props
// add function name as second argument to export

// function mapDispatchToProps(dispatch) {
//
// 		return bindActionCreators({
//			selectBook: selectBook
//		}, dispatch);
//
// }

// add imported action creators below to the {}
export default connect(mapStateToProps, {})(CardView);