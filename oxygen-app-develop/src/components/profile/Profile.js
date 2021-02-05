import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileView from './ProfileView';

// action creator
import { setFavourite } from '../home/HomeReducer';

function mapStateToProps(state) {

	return {
		storedId: state.homeReducer.storedId,
		isIdSet: state.homeReducer.isIdSet
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
export default connect(mapStateToProps, {setFavourite})(ProfileView);
