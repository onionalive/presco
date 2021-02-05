import {connect} from 'react-redux';
import Transactions from './TransactionsView';

const mapStateToProps = state => ({
	profile: state.ProfileReducer.profile,
});

export default connect(mapStateToProps, {})(Transactions);