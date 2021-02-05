import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeView from './HomeView';

// action creator
import { updateSizing, setFavourite, updateLoading } from './HomeReducer';

const mapStateToProps = (state) => {
	return { 
		small: state.homeReducer.small,
		storedId: state.homeReducer.storedId,
		isIdSet: state.homeReducer.isIdSet,
		storedFullName: state.homeReducer.storedFullName,
		storedEmail: state.homeReducer.storedEmail,
		storedPhone: state.homeReducer.storedPhone,
		storedImage: state.homeReducer.storedImage
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

export default connect(mapStateToProps, { updateSizing, setFavourite, updateLoading })(HomeView);
