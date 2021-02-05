import { connect } from 'react-redux';
import LeadersSingleView from './LeadersSingleView';
import { fetchLeader } from './LeadersSingleReducer';

const mapStateToProps = (state) => {
	return {
		leader: state.leadersSingleReducer.leader,
		executives: state.leadersSingleReducer.executives,
		board: state.leadersSingleReducer.board,
	};
};

const mapDispatchToProps = dispatch => ({
	fetchLeader: leader => dispatch(fetchLeader(leader)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeadersSingleView);
