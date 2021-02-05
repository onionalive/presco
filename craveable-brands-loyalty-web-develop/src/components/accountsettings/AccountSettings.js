import {connect} from 'react-redux';
import AccountSettingsView from 'components/accountsettings/AccountSettingsView';
import { goUpdateProfile } from 'components/profile/ProfileReducer';

// action creators
// import {} from './nameReducer'




function mapStateToProps(state) {
	return {
		email: state.ProfileReducer.profile.email,
		phone: state.ProfileReducer.profile.phone
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
export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsView);
