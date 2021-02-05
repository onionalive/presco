import {connect} from 'react-redux';
import MasterView from 'components/master/MasterView';
import { goUpdateProfile } from 'components/profile/ProfileReducer';
import { goUpdatePromos, goUpdateCopy } from 'reducers/firebase';

/* action creators */
// import {} from './nameReducer'

function mapStateToProps(state) {
	return {
		profile: state.ProfileReducer.profile,
		promos: state.FirebaseReducer.promotions,
		copy: state.FirebaseReducer.copy
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

const mapDispatchToProps = dispatch => ({
	goUpdateProfile: (data) => dispatch(goUpdateProfile(data)),
	goUpdatePromos: (data) => dispatch(goUpdatePromos(data)),
	goUpdateCopy: (data) => dispatch(goUpdateCopy(data))
});


// add imported action creators below to the {}
export default connect(mapStateToProps, mapDispatchToProps)(MasterView);
