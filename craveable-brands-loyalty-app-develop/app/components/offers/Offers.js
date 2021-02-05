import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Offers from './OffersView';


// action creators
import {
	getOffersActive,
	getOffersExpired
} from 'app/components/offers/OffersReducer';

// action creators
import { updateOfferNotification, updateSelectedItem, updateSelectedIndex } from './OffersReducer';

function mapStateToProps(state) {
	return {
		offerNotification: state.OffersReducer.offerNotification,
		firstName: state.ProfileReducer.firstName,
		loyaltyBalance: state.ProfileReducer.loyaltyBalance,
		loyaltyStatus: state.ProfileReducer.ranking.value,
		selectedIndex: state.OffersReducer.selectedIndex,
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
	updateOfferNotification,
	updateSelectedItem,
	updateSelectedIndex,
	getOffersActive,
	getOffersExpired
})(Offers);