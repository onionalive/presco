import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import BorrowView from './BorrowView';

function mapStateToProps(state) {

	return {
		example: state.BorrowData,
	};

}

// const mapStateToProps = state => {
// 	console.log(state);
// };

// uncomment to match actions to props
// add function name as second argument to export

// function mapDispatchToProps(dispatch) {
//
// 		return bindActionCreators({ 
//			selectBook: selectBook 
//		}, dispatch);
//
// }

export default connect(mapStateToProps)(BorrowView);
