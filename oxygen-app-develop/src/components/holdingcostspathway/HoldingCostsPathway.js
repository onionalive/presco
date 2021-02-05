import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import HoldingCostsPathwayView from './HoldingCostsPathwayView';

// action creators
// import {} from './nameReducer'

function mapStateToProps(state) {

	return {
		holdingCostsInterestRate: state.calculatorReducer.holdingCostsInterestRate,
		holdingCostsCurrentMorgageBalance: state.calculatorReducer.holdingCostsCurrentMorgageBalance,
		holdingCostsDaysOnMarket: state.calculatorReducer.holdingCostsDaysOnMarket,
		holdingCostsCouncilRates: state.calculatorReducer.holdingCostsCouncilRates,
		holdingCostsBodyCorporateFees: state.calculatorReducer.holdingCostsBodyCorporateFees,
		holdingCostsLandTax: state.calculatorReducer.holdingCostsLandTax,
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
export default connect(mapStateToProps, {})(HoldingCostsPathwayView);
