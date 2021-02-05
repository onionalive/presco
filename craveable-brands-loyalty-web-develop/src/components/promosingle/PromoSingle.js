import {connect} from 'react-redux';
import PromoSingleView from './PromoSingleView';

/* action creators */
// import {} from './nameReducer'

// const mapStateToProps = state => ({
// 	profile: state.ProfileReducer.profile,
// });


// const mapStateToProps ()= state => ({
// 	profile: state.ProfileReducer.profile,
// });

const mapStateToProps = state => ({
	selectedItem: state.OffersReducer.selectedItem
});

// add imported action creators below to the {}
export default connect(mapStateToProps, {})(PromoSingleView);

