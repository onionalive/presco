import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import OtherIncomeView from './OtherIncomeView';

function mapStateToProps(state) {

	return {
		example: state.OtherIncomeData,
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

export default connect(mapStateToProps)(OtherIncomeView);
