// import BorrowData from './BorrowSwiperDataStub.json';

// Initial state
let initialState = {
	loanType: '',
	loanTerm: 0,
	registrationFee: 170,
	transferFee: 406,
	stampDuty: 2500,
	total: 3081,
	stateValue: '',
	propertyTypeOne: '',
	propertyTypeTwo: '',
	firstHome: ''
}

// Actions
const STATE = 'StampDutyPathwayReducer/STATE';
const PROPERTY_TYPE_ONE = 'StampDutyPathwayReducer/PROPERTY_TYPE_ONE';
const PROPERTY_TYPE_TWO = 'StampDutyPathwayReducer/PROPERTY_TYPE_TWO';
const FIRST_HOME = 'StampDutyPathwayReducer/FIRST_HOME';
const SET_RESULTS = 'StampDutyPathwayReducer/SET_RESULTS';

// Action Creators
export function setStateValue(stateValue) {
  return {
    type: STATE,
    stateValue: stateValue
  };
}

export function setPropertyTypeOne(property) {
  return {
    type: PROPERTY_TYPE_ONE,
    property: property
  };
}

export function setPropertyTypeTwo(property) {
  return {
    type: PROPERTY_TYPE_TWO,
    property: property
  };
}

export function setFirstHome(value) {
  return {
    type: FIRST_HOME,
    value: value
  };
}

export function setResults(results) {
  return {
    type: SET_RESULTS,
    registrationFee: results.registrationFeeValue,
    transferFee: results.transferFeeValue,
    stampDuty: results.stampDutyValue,
    total: results.total
  };
}

export const StampDutyPathwayReducer = (state = initialState, action) => {
	switch(action.type) {
		case STATE:
			return { ...state, stateValue: action.stateValue};
		case PROPERTY_TYPE_ONE:
			return { ...state, propertyTypeOne: action.property};
		case PROPERTY_TYPE_TWO:
			return { ...state, propertyTypeTwo: action.property};
		case FIRST_HOME:
			return { ...state, firstHome: action.value};
		case SET_RESULTS:
			return {
				...state,
				registrationFee: action.registrationFee,
				transferFee: action.transferFee,
				stampDuty: action.stampDuty,
				total: action.total
			};
		default:
			return state;
	}
}
