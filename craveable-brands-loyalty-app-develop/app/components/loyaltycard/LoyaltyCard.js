import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import LoyaltyCard from './LoyaltyCardView';

// action creators
// import {} from './nameReducer'

function mapStateToProps(state) {
	return {
		firstName: state.ProfileReducer.firstName,
		lastName: state.ProfileReducer.lastName,
		mobileNumber: state.ProfileReducer.mobileNumber
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
export default connect(mapStateToProps, {})(LoyaltyCard);