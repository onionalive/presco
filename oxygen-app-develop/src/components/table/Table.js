import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import TableView from './TableView';

// action creator
import { selectAction, setQuery, setBrokerData, setStoredList } from './TableReducer';
import { setFavourite, updateLoading } from '../home/HomeReducer';

const mapStateToProps = state => {
	// return an object as props for the view
	return { 
		tableData: state.tableData,
		storedId: state.homeReducer.storedId,
		isIdSet: state.homeReducer.isIdSet,
		hasLoaded: state.homeReducer.hasLoaded,
		data: state.tableData.data,
		storedList: state.tableData.storedList
	};
};

// uncomment to match actions to props
// add function name as second argument to export

// function mapDispatchToProps(dispatch) {
//
// 		return bindActionCreators({ 
//			selectBook: selectBook 
//		}, dispatch);
//
// }

export default connect(mapStateToProps, { selectAction, setQuery, setBrokerData, setFavourite, updateLoading, setStoredList })(TableView);
