import { combineReducers } from 'redux';

// reducer-import
// import { PropertyInvestmentsPathwayReducer } from './components/propertyinvestmentspathway/PropertyInvestmentsPathwayReducer'; 
// import { HoldingCostsPathwayReducer } from './components/holdingcostspathway/HoldingCostsPathwayReducer'; 
// import { ExtraRepaymentsPathwayReducer } from './components/extrarepaymentspathway/ExtraRepaymentsPathwayReducer'; 
import { HomeReducer } from './components/home/HomeReducer';
import { StampDutyPathwayReducer } from './components/stampdutypathway/StampDutyPathwayReducer'; 
import { RepaymentsPathwayReducer } from './components/repaymentspathway/RepaymentsPathwayReducer'; 
import { QuestionSetReducer } from './components/questionset/QuestionSetReducer'; 
import { ProfileReducer } from './components/profile/ProfileReducer'; 
import { CalculatorResultsReducer } from './components/calculatorresults/CalculatorResultsReducer'; 
import { OtherIncomeReducer } from './components/otherincome/OtherIncomeReducer'; 
import { BorrowSwiperReducer } from './components/borrowswiper/BorrowSwiperReducer'; 
import { BorrowReducer } from './components/borrow/BorrowReducer'; 
import { CalculatorSelectReducer } from './components/calculatorselect/CalculatorSelectReducer'; 
import { TableReducer } from './components/table/TableReducer';
import { CalculatorReducer } from './components/calculator/CalculatorReducer'; 

export default combineReducers({
	//reducer-name
	// propertyInvestmentsPathwayReducer: PropertyInvestmentsPathwayReducer, 
	// holdingCostsPathwayReducer: HoldingCostsPathwayReducer, 
	// extraRepaymentsPathwayReducer: ExtraRepaymentsPathwayReducer, 
	homeReducer: HomeReducer,
	stampDutyPathwayData: StampDutyPathwayReducer, 
	repaymentsPathwayData: RepaymentsPathwayReducer, 
	questionSetReducer: QuestionSetReducer, 
	borrowSwiperReducer: BorrowSwiperReducer,
	calculatorResultsData: CalculatorResultsReducer,
	calculatorReducer: CalculatorReducer, 
	tableData: TableReducer
});
