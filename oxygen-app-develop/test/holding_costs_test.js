import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
// import HoldingCostsPathway from '../src/components/holdingcostspathway/HoldingCostsPathway';
import HoldingCosts from '../src/helpers/holdingCosts';

let terms = [
	{
		holdingCostsInterestRate: 700,
		holdingCostsCurrentMorgageBalance: 100000,
		holdingCostsDaysOnMarket: 60,
		holdingCostsCouncilRates: 0,
		holdingCostsBodyCorporateFees: 0,
		holdingCostsLandTax: 0,
		expectedCouncilRateResult: 0,
		expectedBodyCorporateFeeResult: 0,
		expectedLandTaxResult: 0,
		expectedHoldingCost: 1150.68
	},
	{
		holdingCostsInterestRate: 700,
		holdingCostsCurrentMorgageBalance: 100000,
		holdingCostsDaysOnMarket: 60,
		holdingCostsCouncilRates: 500,
		holdingCostsBodyCorporateFees: 800,
		holdingCostsLandTax: 800,
		expectedCouncilRateResult: 82,
		expectedBodyCorporateFeeResult: 131,
		expectedLandTaxResult: 131,
		expectedHoldingCost: 1495.89
	},
	{
		holdingCostsInterestRate: 500,
		holdingCostsCurrentMorgageBalance: 900000,
		holdingCostsDaysOnMarket: 150,
		holdingCostsCouncilRates: 1400,
		holdingCostsBodyCorporateFees: 800,
		holdingCostsLandTax: 800,
		expectedCouncilRateResult: 575,
		expectedBodyCorporateFeeResult: 328,
		expectedLandTaxResult: 328,
		expectedHoldingCost: 19726.02
	},
	{
		holdingCostsInterestRate: 1200,
		holdingCostsCurrentMorgageBalance: 900000,
		holdingCostsDaysOnMarket: 70,
		holdingCostsCouncilRates: 1400,
		holdingCostsBodyCorporateFees: 800,
		holdingCostsLandTax: 800,
		expectedCouncilRateResult: 268,
		expectedBodyCorporateFeeResult: 153,
		expectedLandTaxResult: 153,
		expectedHoldingCost: 21287.67
	},
	{
		holdingCostsInterestRate: 900,
		holdingCostsCurrentMorgageBalance: 1500000,
		holdingCostsDaysOnMarket: 70,
		holdingCostsCouncilRates: 1400,
		holdingCostsBodyCorporateFees: 800,
		holdingCostsLandTax: 800,
		expectedCouncilRateResult: 268,
		expectedBodyCorporateFeeResult: 153,
		expectedLandTaxResult: 153,
		expectedHoldingCost: 26465.75
	},
	{
		holdingCostsInterestRate: 1500,
		holdingCostsCurrentMorgageBalance: 700000,
		holdingCostsDaysOnMarket: 50,
		holdingCostsCouncilRates: 1400,
		holdingCostsBodyCorporateFees: 800,
		holdingCostsLandTax: 800,
		expectedCouncilRateResult: 191,
		expectedBodyCorporateFeeResult: 109,
		expectedLandTaxResult: 109,
		expectedHoldingCost: 14794.52
	}
]

for (let term of terms) {
	describe('HoldingCosts.calculateResults() should return the correct values for', () => {
		const interest = term.holdingCostsInterestRate/10000;
		it(`An expected Council Rate conversion result ${term.expectedCouncilRateResult} for $${term.holdingCostsCouncilRates}`, () => {
			expect(Math.trunc(HoldingCosts.calculateOtherExpense(term.holdingCostsCouncilRates, term.holdingCostsDaysOnMarket))).to.equal(term.expectedCouncilRateResult);
		});
		it(`An expected Body Corporate fee conversion result ${term.expectedBodyCorporateFeeResult} for $${term.holdingCostsBodyCorporateFees}`, () => {
			expect(Math.trunc(HoldingCosts.calculateOtherExpense(term.holdingCostsBodyCorporateFees, term.holdingCostsDaysOnMarket))).to.equal(term.expectedBodyCorporateFeeResult);
		});
		it(`An expected Land Tax conversion result ${term.expectedLandTaxResult} for $${term.holdingCostsLandTax}`, () => {
			expect(Math.trunc(HoldingCosts.calculateOtherExpense(term.holdingCostsLandTax, term.holdingCostsDaysOnMarket))).to.equal(term.expectedLandTaxResult);
		});
		it(`An expected Holding cost of ${term.expectedHoldingCost} with Interest Rate: ${interest}%, Current Morgage Balance: $${term.holdingCostsCurrentMorgageBalance}, Days on Market: ${term.holdingCostsDaysOnMarket}, Council Rates: $${term.holdingCostsCouncilRates}, Body Corporate Fees: $${term.holdingCostsBodyCorporateFees}, Land Tax: $${term.holdingCostsLandTax}`, () => {
			const results = HoldingCosts.calculateResults(term);
			expect(results).to.equal(term.expectedHoldingCost);
		});
	});
}

// describe('<HoldingCostsPathway />', () => {
//   it('should render one View', () => {
//     const wrapper = shallow(<HoldingCostsPathway />);
//     expect(wrapper.find(View)).to.have.length(1);
//   });
// });
