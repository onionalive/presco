export default class HoldingCosts {
	static calculateOtherExpense(annualValue, daysOnMarket = 0) {
		return annualValue / 365 * daysOnMarket;
	}

	static calculateResults(values) {
		const interestRate = values.holdingCostsInterestRate/10000;
		const councilRates = this.calculateOtherExpense(values.holdingCostsCouncilRates, values.holdingCostsDaysOnMarket);
		const bodyCorporateFees = HoldingCosts.calculateOtherExpense(values.holdingCostsBodyCorporateFees, values.holdingCostsDaysOnMarket);
		const landTax = HoldingCosts.calculateOtherExpense(values.holdingCostsLandTax, values.holdingCostsDaysOnMarket);
		const result = values.holdingCostsCurrentMorgageBalance * interestRate / 365 * values.holdingCostsDaysOnMarket + councilRates + bodyCorporateFees + landTax;

		return Math.trunc(result * 100) / 100;
	}
}