// Initial state
const initialState = {
  annualIncomeValue: 0,
  otherIncomeValue: 0,
  interestRate: 0,
  loanAmount: 0,
  loanInterestRate: 0,
  propertyValue: 0,
  personalExpenses: 0,
  creditCardRepayments: 0,
  otherMonthlyRepayments: 0,
  // holding costs initial state
  holdingCostsInterestRate: 0,
  holdingCostsCurrentMorgageBalance: 0,
  holdingCostsDaysOnMarket: 0,
  holdingCostsCouncilRates: 0,
  holdingCostsBodyCorporateFees: 0,
  holdingCostsLandTax: 0,
};

// Actions
const UPDATE_VALUE = 'CalculatorState/UPDATE_VALUE';
const UPDATE_ANNUAL_INCOME = 'CalculatorState/UPDATE_ANNUAL_INCOME';
const UPDATE_OTHER_INCOME = 'CalculatorState/UPDATE_OTHER_INCOME';
const UPDATE_INTEREST_RATE = 'CalculatorState/UPDATE_INTEREST_RATE';
const RESET_ANNUAL_INCOME = 'CalculatorState/RESET_ANNUAL_INCOME';
const RESET_OTHER_INCOME = 'CalculatorState/RESET_OTHER_INCOME';
const RESET_INTEREST_RATE = 'CalculatorState/RESET_INTEREST_RATE';

// borrow pathway expenses
const UPDATE_PERSONAL_EXPENSES = 'CalculatorState/UPDATE_PERSONAL_EXPENSES';
const RESET_PERSONAL_EXPENSES = 'CalculatorState/RESET_PERSONAL_EXPENSES';
const UPDATE_CREDIT_CARD = 'CalculatorState/UPDATE_CREDIT_CARD';
const RESET_CREDIT_CARD = 'CalculatorState/RESET_CREDIT_CARD';
const UPDATE_OTHER_MONTLY_REPAYMENTS = 'CalculatorState/UPDATE_OTHER_MONTLY_REPAYMENTS';
const RESET_OTHER_MONTLY_REPAYMENTS = 'CalculatorState/RESET_OTHER_MONTLY_REPAYMENTS';

// repayments pathway
const UPDATE_LOAN_AMOUNT = 'CalculatorState/UPDATE_LOAN_AMOUNT';
const RESET_LOAN_AMOUNT = 'CalculatorState/RESET_LOAN_AMOUNT';
const UPDATE_LOAN_INTEREST_RATE = 'CalculatorState/UPDATE_LOAN_INTEREST_RATE';
const RESET_LOAN_INTEREST_RATE = 'CalculatorState/RESET_LOAN_INTEREST_RATE';

// stamp duty pathway
const UPDATE_PROPERTY_VALUE = 'CalculatorState/UPDATE_PROPERTY_VALUE';
const RESET_PROPERTY_VALUE = 'CalculatorState/RESET_PROPERTY_VALUE';

// holding costs pathy
const UPDATE_HOLDING_COSTS_IR = 'CalculatorState/UPDATE_HOLDING_COSTS_IR';
const UPDATE_HOLDING_COSTS_CMB = 'CalculatorState/UPDATE_HOLDING_COSTS_CMB';
const UPDATE_HOLDING_COSTS_DOM = 'CalculatorState/UPDATE_HOLDING_COSTS_DOM';
const UPDATE_HOLDING_COSTS_CR = 'CalculatorState/UPDATE_HOLDING_COSTS_CR';
const UPDATE_HOLDING_COSTS_BCF = 'CalculatorState/UPDATE_HOLDING_COSTS_BCF';
const UPDATE_HOLDING_COSTS_LT = 'CalculatorState/UPDATE_HOLDING_COSTS_LT';

const RESET_HOLDING_COSTS_IR = 'CalculatorState/RESET_HOLDING_COSTS_IR';
const RESET_HOLDING_COSTS_CMB = 'CalculatorState/RESET_HOLDING_COSTS_CMB';
const RESET_HOLDING_COSTS_DOM = 'CalculatorState/RESET_HOLDING_COSTS_DOM';
const RESET_HOLDING_COSTS_CR = 'CalculatorState/RESET_HOLDING_COSTS_CR';
const RESET_HOLDING_COSTS_BCF = 'CalculatorState/RESET_HOLDING_COSTS_BCF';
const RESET_HOLDING_COSTS_LT = 'CalculatorState/RESET_HOLDING_COSTS_LT';

// Action creators
export const updateValue = (id, add) => {
    switch (id) {
        case 'annualIncome':
            return {
                type: UPDATE_ANNUAL_INCOME,
                payload: add
            };
        case 'otherIncome':
            return {
                type: UPDATE_OTHER_INCOME,
                payload: add
            }
        case 'interestRate':
            return {
                type: UPDATE_INTEREST_RATE,
                payload: add
            }
        case 'loanAmount':
            return {
                type: UPDATE_LOAN_AMOUNT,
                payload: add
            }
        case 'loanInterestRate':
            return {
              type: UPDATE_LOAN_INTEREST_RATE,
              payload: add
            }
        case 'propertyValue':
            return {
              type: UPDATE_PROPERTY_VALUE,
              payload: add
            }
        case 'personalExpenses':
            return {
              type: UPDATE_PERSONAL_EXPENSES,
              payload: add
            }
        case 'creditCardRepayments':
            return {
              type: UPDATE_CREDIT_CARD,
              payload: add
            }
        case 'otherMonthlyRepayments':
            return {
              type: UPDATE_OTHER_MONTLY_REPAYMENTS,
              payload: add
            }
        case 'holdingCostsInterestRate':
            return {
              type: UPDATE_HOLDING_COSTS_IR,
              payload: add
            }
        case 'holdingCostsCurrentMorgageBalance':
            return {
              type: UPDATE_HOLDING_COSTS_CMB,
              payload: add
            }
        case 'holdingCostsDaysOnMarket':
            return {
              type: UPDATE_HOLDING_COSTS_DOM,
              payload: add
            }
        case 'holdingCostsCouncilRates':
            return {
              type: UPDATE_HOLDING_COSTS_CR,
              payload: add
            }
        case 'holdingCostsBodyCorporateFees':
            return {
              type: UPDATE_HOLDING_COSTS_BCF,
              payload: add
            }
        case 'holdingCostsLandTax':
            return {
              type: UPDATE_HOLDING_COSTS_LT,
              payload: add
            }

        default:
          console.log('calc action fell through');
          return;
    }
}

export const resetValue = (id) => {
  switch (id) {
        case 'annualIncome':
            return {
                type: RESET_ANNUAL_INCOME
            };
        case 'otherIncome':
            return {
                type: RESET_OTHER_INCOME
            }
        case 'interestRate':
            return {
                type: RESET_INTEREST_RATE
            }
        case 'loanInterestRate':
            return {
              type: RESET_LOAN_INTEREST_RATE
            }
        case 'loanAmount':
            return {
                type: RESET_LOAN_AMOUNT
            }
        case 'propertyValue':
            return {
                type: RESET_PROPERTY_VALUE
            }
        case 'personalExpenses':
            return {
              type: RESET_PERSONAL_EXPENSES
            }
        case 'creditCardRepayments':
            return {
              type: RESET_CREDIT_CARD
            }
        case 'otherMonthlyRepayments':
            return {
              type: RESET_OTHER_MONTLY_REPAYMENTS
            }
        case 'holdingCostsInterestRate':
            return {
              type: RESET_HOLDING_COSTS_IR
            }
        case 'holdingCostsCurrentMorgageBalance':
            return {
              type: RESET_HOLDING_COSTS_CMB
            }
        case 'holdingCostsDaysOnMarket':
            return {
              type: RESET_HOLDING_COSTS_DOM
            }
        case 'holdingCostsCouncilRates':
            return {
              type: RESET_HOLDING_COSTS_CR
            }
        case 'holdingCostsBodyCorporateFees':
            return {
              type: RESET_HOLDING_COSTS_BCF
            }
        case 'holdingCostsLandTax':
            return {
              type: RESET_HOLDING_COSTS_LT
            }
        default:
            console.log('fell through');
            return;
    }
}

// Reducer
export const CalculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    // UPDATE CASES
		case UPDATE_ANNUAL_INCOME:
			const annualIncome = (state.annualIncomeValue * 10) + action.payload;
      if (annualIncome > 9999999999) {
          return {
            ...state,
            annualIncomeValue: 9999999999
          };
      }
			return {
          ...state,
          annualIncomeValue: annualIncome
      };
    case UPDATE_OTHER_INCOME:
      const otherIncome = (state.otherIncomeValue * 10) + action.payload;
      if (otherIncome > 9999999999) {
          return {
            ...state,
            otherIncomeValue: 9999999999
          };
      }
      return {
        ...state,
        otherIncomeValue: otherIncome
      };
    case UPDATE_INTEREST_RATE:
      const interestRate = (state.interestRate * 10) + action.payload;
      if (interestRate > 10000) {
          return {
            ...state,
            interestRate: 10000
          };
      }
      return {
        ...state,
        interestRate: interestRate
      };
    case UPDATE_LOAN_AMOUNT:
      const loanAmount = (state.loanAmount * 10) + action.payload;
      if (loanAmount > 9999999999) {
          return {
            ...state,
            loanAmount: 9999999999
          };
      }
      return {
        ...state,
        loanAmount: loanAmount
      };
    case UPDATE_LOAN_INTEREST_RATE:
      const loanInterestRate = (state.loanInterestRate * 10) + action.payload;
      if (loanInterestRate > 10000) {
          return {
            ...state,
            loanInterestRate: 10000
          };
      }
      return {
        ...state,
        loanInterestRate: loanInterestRate
      };
    case UPDATE_PROPERTY_VALUE:
      const propertyValue = (state.propertyValue * 10) + action.payload;
      if (propertyValue > 9999999999) {
          return {
            ...state,
            propertyValue: 9999999999
          };
      } else {
      	return {
			...state,
			propertyValue: propertyValue
		};
      }
    case UPDATE_PERSONAL_EXPENSES:
      const personalExpenses = (state.personalExpenses * 10) + action.payload;
      if (personalExpenses > 9999999999) {
          return {
            ...state,
            personalExpenses: 9999999999
          };
      }
      return {
        ...state,
        personalExpenses: personalExpenses
      };
    case UPDATE_CREDIT_CARD:
      const creditCardRepayments = (state.creditCardRepayments * 10) + action.payload;
      if (creditCardRepayments > 9999999999) {
          return {
            ...state,
            creditCardRepayments: 9999999999
          };
      }
      return {
        ...state,
        creditCardRepayments: creditCardRepayments
      };
    case UPDATE_OTHER_MONTLY_REPAYMENTS:
      const otherMonthlyRepayments = (state.otherMonthlyRepayments * 10) + action.payload;
      if (otherMonthlyRepayments > 9999999999) {
          return {
            ...state,
            otherMonthlyRepayments: 9999999999
          };
      }
      return {
        ...state,
        otherMonthlyRepayments: otherMonthlyRepayments
      };
    case UPDATE_HOLDING_COSTS_IR:
      const holdingCostsInterestRate = (state.holdingCostsInterestRate * 10) + action.payload;
      if (holdingCostsInterestRate > 9999999999) {
          return {
            ...state,
            holdingCostsInterestRate: 9999999999
          };
      }
      return {
        ...state,
        holdingCostsInterestRate: holdingCostsInterestRate
      };
    case UPDATE_HOLDING_COSTS_CMB:
      const holdingCostsCurrentMorgageBalance = (state.holdingCostsCurrentMorgageBalance * 10) + action.payload;
      if (holdingCostsCurrentMorgageBalance > 9999999999) {
          return {
            ...state,
            holdingCostsCurrentMorgageBalance: 9999999999
          };
      }
      return {
        ...state,
        holdingCostsCurrentMorgageBalance: holdingCostsCurrentMorgageBalance
      };
    case UPDATE_HOLDING_COSTS_DOM:
      const holdingCostsDaysOnMarket = (state.holdingCostsDaysOnMarket * 10) + action.payload;
      if (holdingCostsDaysOnMarket > 9999999999) {
          return {
            ...state,
            holdingCostsDaysOnMarket: 9999999999
          };
      }
      return {
        ...state,
        holdingCostsDaysOnMarket: holdingCostsDaysOnMarket
      };
    case UPDATE_HOLDING_COSTS_CR:
      const holdingCostsCouncilRates = (state.holdingCostsCouncilRates * 10) + action.payload;
      if (holdingCostsCouncilRates > 9999999999) {
          return {
            ...state,
            holdingCostsCouncilRates: 9999999999
          };
      }
      return {
        ...state,
        holdingCostsCouncilRates: holdingCostsCouncilRates
      };
    case UPDATE_HOLDING_COSTS_BCF:
      const holdingCostsBodyCorporateFees = (state.holdingCostsBodyCorporateFees * 10) + action.payload;
      if (holdingCostsBodyCorporateFees > 9999999999) {
          return {
            ...state,
            holdingCostsBodyCorporateFees: 9999999999
          };
      }
      return {
        ...state,
        holdingCostsBodyCorporateFees: holdingCostsBodyCorporateFees
      };
    case UPDATE_HOLDING_COSTS_LT:
      const holdingCostsLandTax = (state.holdingCostsLandTax * 10) + action.payload;
      if (holdingCostsLandTax > 9999999999) {
          return {
            ...state,
            holdingCostsLandTax: 9999999999
          };
      }
      return {
        ...state,
        holdingCostsLandTax: holdingCostsLandTax
      };

    // RESET CASES
		case RESET_ANNUAL_INCOME:
			return { ...state, annualIncomeValue: 0 };
    case RESET_OTHER_INCOME:
      return { ...state, otherIncomeValue: 0 };
    case RESET_INTEREST_RATE:
      return { ...state, interestRate: 0 };
    case RESET_LOAN_AMOUNT:
      return { ...state, loanAmount: 0 };
    case RESET_PROPERTY_VALUE:
      return { ...state, propertyValue: 0 };
    case RESET_LOAN_INTEREST_RATE:
      return { ...state, loanInterestRate: 0 };
    case RESET_PERSONAL_EXPENSES:
      return { ...state, personalExpenses: 0 };
    case RESET_CREDIT_CARD:
      return { ...state, creditCardRepayments: 0 };
    case RESET_OTHER_MONTLY_REPAYMENTS:
      return { ...state, otherMonthlyRepayments: 0 };
    case RESET_HOLDING_COSTS_IR:
      return { ...state, holdingCostsInterestRate: 0 };
    case RESET_HOLDING_COSTS_CMB:
      return { ...state, holdingCostsCurrentMorgageBalance: 0 };
    case RESET_HOLDING_COSTS_DOM:
      return { ...state, holdingCostsDaysOnMarket: 0 };
    case RESET_HOLDING_COSTS_CR:
      return { ...state, holdingCostsCouncilRates: 0 };
    case RESET_HOLDING_COSTS_BCF:
      return { ...state, holdingCostsBodyCorporateFees: 0 };
    case RESET_HOLDING_COSTS_LT:
      return { ...state, holdingCostsLandTax: 0 };
		default:
			return state;
  }
}
