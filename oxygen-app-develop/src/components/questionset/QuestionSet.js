import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import QuestionSetView from './QuestionSetView';

// action creators
import { setLoanType } from './QuestionSetReducer';

const mapStateToProps = (state) => {
	return { loanType: state.questionSetReducer.loanType };
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

export default connect(mapStateToProps, { setLoanType })(QuestionSetView);
