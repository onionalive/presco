import {connect} from 'react-redux';
import OffersView from './OffersView';
import {getOffersActive, getOffersExpired} from './OffersReducer';
/* action creators */
// import {} from './nameReducer'

// const mapStateToProps = state => ({
// 	profile: state.ProfileReducer.profile,
// });


// const mapStateToProps ()= state => ({
// 	profile: state.ProfileReducer.profile,
// });

const mapStateToProps = state => ({
	profile: state.ProfileReducer.profile,
	activeOffers: state.OffersReducer.offersActive,
	expiredOffers: state.OffersReducer.offersExpired
});

// add imported action creators below to the {}
export default connect(mapStateToProps, {getOffersActive, getOffersExpired})(OffersView);

