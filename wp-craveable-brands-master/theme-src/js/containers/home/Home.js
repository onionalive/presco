import { connect } from 'react-redux';
import HomeView from './HomeView';
import { fetchPage } from './HomeReducer';

const mapStateToProps = state => ({
	home: state.homeReducer.home,
	people: state.homeReducer.people,
	contentTiles: state.homeReducer.contentTiles,
});

const mapDispatchToProps = dispatch => ({
	fetchPage: () => dispatch(fetchPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
