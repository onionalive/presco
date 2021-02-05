import {connect} from 'react-redux';
import SigninView from './SigninView';
import { goUpdateProfile } from '../profile/ProfileReducer';

/* action creators */
// import {} from './nameReducer'

const mapStateToProps = state => ({
	profile: state.ProfileReducer.profile,
	localSlug: '/profile'
});

// const mapStateToProps = () => ({});

// uncomment to match actions to props
// add function name as second argument to export

const mapDispatchToProps = dispatch => ({
	goUpdateProfile: (data) => dispatch(goUpdateProfile(data)),
});

// add imported action creators below to the {}
export default connect(mapStateToProps, mapDispatchToProps)(SigninView);

