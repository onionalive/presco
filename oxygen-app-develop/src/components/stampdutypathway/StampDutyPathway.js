import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import StampDutyPathwayView from './StampDutyPathwayView';

// action creators
import { setStateValue, setPropertyTypeOne, setPropertyTypeTwo, setFirstHome, setResults } from './StampDutyPathwayReducer'

function mapStateToProps(state) {
	return {
		propertyValue: state.calculatorReducer.propertyValue,
		stateValue: state.stampDutyPathwayData.stateValue,
		propertyTypeOne: state.stampDutyPathwayData.propertyTypeOne,
		propertyTypeTwo: state.stampDutyPathwayData.propertyTypeTwo,
		firstHome: state.stampDutyPathwayData.firstHome,
		registrationFee: state.stampDutyPathwayData.registrationFee,
		transferFee: state.stampDutyPathwayData.transferFee,
		stampDuty: state.stampDutyPathwayData.stampDuty,
		total: state.stampDutyPathwayData.total,
	};

}

// add imported action creators below to the {}
export default connect(mapStateToProps, { setStateValue, setPropertyTypeOne, setPropertyTypeTwo, setFirstHome, setResults })(StampDutyPathwayView);
