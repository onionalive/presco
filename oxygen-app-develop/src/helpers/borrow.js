export default class Borrow {

	static calculateResults(props) {

		var values = {
			autoCalc: props.estimateExpenses ? "1" : "0",
			bufferedInterestRate: props.interestRate / 100 + 1.5,
			dependents: props.dependents,
			interestRate: props.interestRate / 100,
			otherIncome: props.otherIncomeValue,
			personalExpenses: props.personalExpenses,
			salary: props.annualIncomeValue,
			term: props.loanTerm,
			type: props.applicationType,
			creditCards: props.creditCardRepayments,
			otherExpenses: props.otherMonthlyRepayments
		}

		var expenses = [
			{
			  single: 16920.8,
			  joint: 24599.64
			},
			{
			  single: 23339.32,
			  joint: 30578.08
			},
			{
			  single: 29218.28,
			  joint: 36557.04
			},
			{
			  single: 35196.72,
			  joint: 42535.48
			},
			{
			  single: 41175.68,
			  joint: 48448.4
			}
		];

		var taxrates = {
			18200:   { base: 0,     percent: 19 },
			37000:   { base: 3572,  percent: 32.5 },
			80000:   { base: 17547, percent: 37 },
			180000:  { base: 54547, percent: 45 }
		};

		var bufferRate = 1.5;

		// Calculate expenses
		if(values.autoCalc === '1' && values.type !== '') {
			var deps = values.dependents;
			var type = values.type;

			values.personalExpenses = expenses[deps][type] / 12;
			values.creditCards = 4200 / 12;
			values.otherExpenses = 0;
		}


		values.totalExpenses = (values.personalExpenses * 12) +
		(values.creditCards * 12) +
		(values.otherExpenses * 12);

		// Calculate Income
		var incomeOne = { value: values.salary, tax: 0, withTax: values.salary };
		var incomeTwo = { value: values.salaryPartner, tax: 0, withTax: values.salary };

		// Income One
		if(incomeOne.value >= 18200) {
			incomeOne.tax = taxrates[18200].base + (taxrates[18200].percent/100) * (incomeOne.value - 18200);
			incomeOne.withTax = incomeOne.value - incomeOne.tax;
		}

		if(incomeOne.value >= 37000) {
			incomeOne.tax = taxrates[37000].base + (taxrates[37000].percent/100) * (incomeOne.value - 37000);
			incomeOne.withTax = incomeOne.value - incomeOne.tax;
		}

		if(incomeOne.value >= 80000) {
			incomeOne.tax = taxrates[80000].base + (taxrates[80000].percent/100) * (incomeOne.value - 80000);
			incomeOne.withTax = incomeOne.value - incomeOne.tax;
		}

		if(incomeOne.value >= 180000) {
			incomeOne.tax = taxrates[180000].base + (taxrates[180000].percent/100) * (incomeOne.value - 180000);
			incomeOne.withTax = incomeOne.value - incomeOne.tax;
		}

		// Income Two
		if(values.type === 'joint') {
			if(incomeTwo.value >= 18200) {
				incomeTwo.tax = taxrates[18200].base + (taxrates[18200].percent/100) * (incomeTwo.value - 18200);
				incomeTwo.withTax = incomeTwo.value - incomeTwo.tax;
			}

			if(incomeTwo.value >= 37000) {
				incomeTwo.tax = taxrates[37000].base + (taxrates[37000].percent/100) * (incomeTwo.value - 37000);
				incomeTwo.withTax = incomeTwo.value - incomeTwo.tax;
			}

			if(incomeTwo.value >= 80000) {
				incomeTwo.tax = taxrates[80000].base + (taxrates[80000].percent/100) * (incomeTwo.value - 80000);
				incomeTwo.withTax = incomeTwo.value - incomeTwo.tax;
			}

			if(incomeTwo.value >= 180000) {
				incomeTwo.tax = taxrates[180000].base + (taxrates[180000].percent/100) * (incomeTwo.value - 180000);
				incomeTwo.withTax = incomeTwo.value - incomeTwo.tax;
			}
		} else {
			incomeTwo = {
				value: 0,
				tax: 0,
				withTax: 0
			};
		}

		// Totals (Including un-taxed 'Other Income')
		values.totalIncome = {
			value:   incomeOne.value + incomeTwo.value + values.otherIncome,
			tax:     incomeOne.tax + incomeTwo.tax,
			withTax: incomeOne.withTax + incomeTwo.withTax + values.otherIncome
		};

		// Calculate Results
		var periodicPayment = Math.round(((values.totalIncome.withTax - values.totalExpenses)/12)*100)/100;
		var periodicInterestRateBuffered = Math.round( ((values.interestRate + bufferRate)/12) * 10000000)/10000000;
		var periodicInterestRate = Math.round( (values.interestRate/12) * 10000000)/10000000;


		var totalPayments = values.term * 12;
		var borrowUpTo = periodicPayment / ((periodicInterestRateBuffered/100) + ((periodicInterestRateBuffered/100)/(Math.pow(1+(periodicInterestRateBuffered/100),totalPayments)-1)));
		values.borrowAmount = borrowUpTo;
		var regularInterestRate = values.interestRate;
		var bufferedInterestRate = regularInterestRate + bufferRate;
		values.bufferedInterestRate = bufferedInterestRate;


		var monthlyRepayments = borrowUpTo * ( (periodicInterestRate/100) + ((periodicInterestRate/100)/(Math.pow(1+(periodicInterestRate/100),totalPayments)-1)));
		monthlyRepayments = Math.round(monthlyRepayments * 100)/100;
		values.monthlyRepayments = monthlyRepayments;
		var monthlyRepaymentsBuffered = borrowUpTo * ( (periodicInterestRateBuffered/100) + ((periodicInterestRateBuffered/100)/(Math.pow(1+(periodicInterestRateBuffered/100),totalPayments)-1)));
		monthlyRepaymentsBuffered = Math.round(monthlyRepaymentsBuffered * 100)/100;
		values.monthlyRepaymentsBuffered = monthlyRepaymentsBuffered;
		var flagged = (0 / (borrowUpTo + 0)) < 0.1;
		var impossible = false;
		if(!monthlyRepayments || !monthlyRepaymentsBuffered || !borrowUpTo || !periodicPayment) impossible = true;
		if(monthlyRepayments <= 0 || monthlyRepaymentsBuffered <= 0 || borrowUpTo <= 0 || periodicPayment <= 0) impossible = true;

		borrowUpTo = Math.round(((borrowUpTo + 0.00001) * 100) / 100);

		return {
			impossible,
			borrowUpTo,
			monthlyRepayments,
			monthlyRepaymentsBuffered
		};
	}
}