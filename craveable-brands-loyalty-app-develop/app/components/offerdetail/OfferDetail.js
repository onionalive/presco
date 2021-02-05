import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import OfferDetail from './OfferDetailView';

// action creators
import {
	updateButton
} from './OfferDetailReducer'

function mapStateToProps(state) {
	return {
		buttonText: state.OfferDetailReducer.buttonText,
		title: state.OfferDetailReducer.title,
		id: state.ProfileReducer.id,
		profile: state.ProfileReducer
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
export default connect(mapStateToProps, {
	updateButton
})(OfferDetail);
