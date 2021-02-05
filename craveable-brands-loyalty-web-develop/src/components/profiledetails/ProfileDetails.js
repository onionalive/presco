import {connect} from 'react-redux';
import ProfileDetailsView from 'components/profiledetails/ProfileDetailsView';
import { goUpdateProfile } from 'components/profile/ProfileReducer';

// action creators
// import {} from './nameReducer'




function mapStateToProps(state) {
	return {
		profile: state.ProfileReducer.profile
	};
}

const mapDispatchToProps = dispatch => ({
	goUpdateProfile: (data) => dispatch(goUpdateProfile(data)),
});

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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailsView);
