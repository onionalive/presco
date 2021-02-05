import { connect } from 'react-redux';
import PromosView from './PromosView';

const mapStateToProps = (state) => {
	console.log("you are here");
	console.log(state);
	console.log(state.FirebaseReducer);
	return {
		promotions: state.FirebaseReducer.promotions
	}
}

// const mapStateToProps = state => ({
// 	promotions: state.FirebaseReducer.promotions
// });

export default connect(mapStateToProps, {})(PromosView);