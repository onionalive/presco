import {connect} from 'react-redux';
import {pushRoute} from './CalculatorSelectReducer';
import CalculatorSelectorView from './CalculatorSelectView';

const mapStateToProps = (state) => {
	return { 
		small: state.homeReducer.small
	};
}


export default connect(mapStateToProps)(CalculatorSelectorView);