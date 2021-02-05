import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import SwiperContainer from './SwiperContainerView';

// action creators
import {
	updateButton
} from '../offerdetail/OfferDetailReducer';

import {
	updateSelectedIndex
} from 'app/components/offers/OffersReducer';

function mapStateToProps(state) {

	return {
		items: state.OffersReducer.offersActive,
		firstName: state.ProfileReducer.firstName,
		lastName: state.ProfileReducer.lastName,
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
	updateButton,
	updateSelectedIndex
})(SwiperContainer);
