import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import OffersActive from './OffersActiveView';

// action creators
import {
	getOffersActive
} from 'app/components/offers/OffersReducer';

function mapStateToProps(state) {

	return {
		copy: state.FirebaseReducer.copy.offers,
		offers: state.OffersReducer.offersActive,
		id: state.ProfileReducer.id
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
	getOffersActive
})(OffersActive);
