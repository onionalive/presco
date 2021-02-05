import {connect} from 'react-redux';
import ProfileView from './ProfileView';
import { goUpdateProfile } from './ProfileReducer';

/* action creators */
// import {} from './nameReducer'

const mapStateToProps = state => ({
	profile: state.ProfileReducer.profile,
	localSlug: '/profile'
});

// uncomment to match actions to props
// add function name as second argument to export

const mapDispatchToProps = dispatch => ({
	goUpdateProfile: (data) => dispatch(goUpdateProfile(data)),
});

// add imported action creators below to the {}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);

