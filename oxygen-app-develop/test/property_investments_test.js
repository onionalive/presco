import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
// import PropertyInvestmentsPathway from '../src/components/extrarepaymentspathway/PropertyInvestmentsPathway';
import PropertyInvestments from '../src/helpers/propertyInvestments';

let terms = {
	piPurchasePrice: 1250000,
	piPackageFee: 399,
	piAdditionalValues: 300,
	piMortgageLegals: 0,
	piMortgageStampDuty: 0,
	piTitleTransfer: 0,
	piMortgageRegistration: 0,
	piMortgageInsurance: 0,
	piStampDuty: 0,
	piSolicitor: 0,
	piMiscellaneous: 0,
	piLessDeposit: 4000,
	piLessGrants: 0,
	piInterestRate: 700,
	piWeeklyRental: 500,
	piLessCouncilRates: 0,
	piLessWaterRates: 0,
	piLessLandlordsInsurance: 0,
	piLessBodyCorporateLevy: 0,
	expectedFundsRequiredForSettlement: 1250699,
	expectedNetAnnualValue: 24050,
	expectedNetMonthlyValue: 2004.17,
	expectedGrossRentalYieldValue: 2.08,
	expectedNetRentalYieldValue: 1.92,
	expectedCostPerMonthPI: 6290.15,
	expectedCostPerMonthIO: 5268.24
}

describe('PropertyInvestments helper module', () => {
	// test the function return values
	it('should calculate the correct pmt value for the Monthly Repayment P&I', () => {
		let results = PropertyInvestments.pmt(0.07, 30, 1246699);
		expect(results).to.equal(8294.32);
	});

	it('should calculate the correct value for required funds', () => {
		const results = PropertyInvestments.calculateResults(terms);

		console.log(results);

		expect(results.piNetAnnualValue).to.equal(terms.expectedNetAnnualValue);
		expect(results.piNetMonthlyValue).to.equal(terms.expectedNetMonthlyValue);
		expect(results.piGrossRentalYieldValue).to.equal(terms.expectedGrossRentalYieldValue);
		expect(results.piNetRentalYieldValue).to.equal(terms.expectedNetRentalYieldValue);
		expect(results.piCostPerMonthPI).to.equal(terms.expectedCostPerMonthPI);
		expect(results.piCostPerMonthIO).to.equal(terms.expectedCostPerMonthIO);
	});


	// test the value outputs
	it('should return the correct Net Annual value');
	it('should return the correct Net Monthly value');
	it('should return the correct Gross Rental Yield value');
	it('should return the correct Net Rental Yield value');
	it('should return the correct Cost per Month P&I value');
	it('should return the correct Cost per Month I/O value');
});

// describe('<PropertyInvestmentsPathway />', () => {
//   it('should render one View', () => {
//     const wrapper = shallow(<PropertyInvestmentsPathway />);
//     expect(wrapper.find(View)).to.have.length(1);
//   });
// });
