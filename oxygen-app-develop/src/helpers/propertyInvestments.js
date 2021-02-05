export default class PropertyInvestments {
	static pmt(interest, loanTerm, fundsRequired) {
		const rate = interest / 12;
		const numberOfPayments = loanTerm * 12;
		const result = fundsRequired * rate / (1-(Math.pow(1+rate, -1*numberOfPayments)));
		const value = Math.round((result * 100)) / 100;

		return value;
	}

	static calculateResults(values) {
		// console.log(values);

		const interest = values.piInterestRate / 10000;
		const loanTerm = 30;

		// calculate total costs and funds required for settlement
		const totalCosts = values.piPackageFee + values.piAdditionalValues + values.piMortgageLegals + values.piMortgageStampDuty + values.piTitleTransfer + values.piMortgageRegistration + values.piMortgageInsurance + values.piStampDuty + values.piSolicitor + values.piMiscellaneous;
		const fundsRequired = values.piPurchasePrice + totalCosts;

		// calculate monthly repayment P&I and I/O
		const loanAmount = fundsRequired - values.piLessDeposit - values.piLessGrants;
		const monthlyRepaymentPI = PropertyInvestments.pmt(interest, loanTerm, loanAmount);
		const monthlyRepaymentIO = loanAmount * interest / 12;

		// calculate net annual and monthly rent
		const piAnnualRent = values.piWeeklyRental * 52;
		const piLessManagementFee = piAnnualRent * 0.075;
		const piNetAnnualValue = piAnnualRent - values.piLessCouncilRates - values.piLessWaterRates - values.piLessLandlordsInsurance - piLessManagementFee - values.piLessBodyCorporateLevy;
		const piNetMonthlyValue = piNetAnnualValue / 12;
		
		// calculate the yields
		const piGrossRentalYieldValue = piAnnualRent / values.piPurchasePrice;
		const piNetRentalYieldValue = piNetAnnualValue / fundsRequired;

		// calculate the cost per month P&I and I/O
		const piCostPerMonthPI = monthlyRepaymentPI - (piNetAnnualValue / 12);
		const piCostPerMonthIO = monthlyRepaymentIO - (piNetAnnualValue / 12);

		// return results object
		return {
			piNetAnnualValue: Math.round(piNetAnnualValue*100)/100,
			piNetMonthlyValue: Math.round(piNetMonthlyValue*100)/100,
			piGrossRentalYieldValue: Math.round(piGrossRentalYieldValue*10000)/100,
			piNetRentalYieldValue: Math.round(piNetRentalYieldValue*10000)/100,
			piCostPerMonthPI: Math.round(piCostPerMonthPI*100)/100,
			piCostPerMonthIO: Math.round(piCostPerMonthIO*100)/100
		};
	}
}