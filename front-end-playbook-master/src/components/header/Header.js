import {connect} from 'react-redux';
import HeaderView from './HeaderView';

// action creators
// import {} from './nameReducer'

function mapStateToProps(state) {

	return {
		data: state.HeaderReducer.data,
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
export default connect(mapStateToProps, {})(HeaderView);
