import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import More from './MoreView';

// action creators
// import {} from './nameReducer'

function mapStateToProps(state) {
	return {
		options: state.FirebaseReducer.copy.more.items,
		firstName: state.ProfileReducer.firstName,
		loyaltyBalance: state.ProfileReducer.loyaltyBalance
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

// add imported action creators below to the {}
export default connect(mapStateToProps, {})(More);
