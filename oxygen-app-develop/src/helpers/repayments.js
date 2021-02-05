export default class Repayments {

	static repaymentFrequency(props) {

		let values = {};
		Object.assign(values, props);

		let repaymentFrequency  = 1;
		let accelerated         = false;
		let introTermAdditional = values.introTerm;
		let lumpSumAdditional   = Math.round(values.lumpSumStart);
		let startsAfterPayment  = Math.round(values.extraRepaymentStart);
		let out                 = {};

		values.loanInterestRate = values.loanInterestRate / 100;
		values.introRate = values.loanInterestRate;
		values.introTerm = 0;
		values.extraRepayment = 0;
		values.extraRepaymentStart = 0;
		values.lumpSum = 0;
		values.lumpSumStart = 0;

		//
		// Repayment Frequency
		//
		switch(values.repaymentFrequency) {
		case 'annually':
		  repaymentFrequency  = 1;
		  introTermAdditional = values.introTerm / 12;
		  startsAfterPayment  = Math.round(values.extraRepaymentStart / 12);
		  break;
		case 'quarterly':
		  repaymentFrequency  = 4;
		  introTermAdditional = (values.introTerm / 12) * 4;
		  startsAfterPayment  = Math.round((values.extraRepaymentStart / 12) * 4);
		  break;
		case 'monthly':
		  repaymentFrequency  = 12;
		  break;
		case 'fortnightly':
		  repaymentFrequency  = 26;
		  introTermAdditional = (values.introTerm / 12) * 26;
		  startsAfterPayment  = Math.round((values.extraRepaymentStart / 12) * 26);
		  lumpSumAdditional   = Math.round((values.lumpSumStart / 12) * 26);
		  break;
		case 'weekly':
		  repaymentFrequency  = 52;
		  introTermAdditional = (values.introTerm / 12) * 52;
		  startsAfterPayment  = Math.round((values.extraRepaymentStart / 12) * 52);
		  lumpSumAdditional   = Math.round((values.lumpSumStart / 12) * 52);
		  break;
		case 'acceleratedFortnightly':
		  repaymentFrequency  = 26;
		  introTermAdditional = (values.introTerm / 12) * 26;
		  startsAfterPayment  = Math.round((values.extraRepaymentStart / 12) * 26);
		  lumpSumAdditional   = Math.round(values.lumpSumStart);
		  accelerated         = true;
		  break;
		case 'acceleratedWeekly':
		  repaymentFrequency  = 52;
		  introTermAdditional = (values.introTerm / 12) * 52;
		  startsAfterPayment  = Math.round((values.extraRepaymentStart / 12) * 52);
		  lumpSumAdditional   = Math.round(values.lumpSumStart);
		  accelerated         = true;
		  break;
		}

		if(startsAfterPayment < 0) startsAfterPayment = 0;
		if(lumpSumAdditional < 0)  lumpSumAdditional  = 0;

		//
		// Introduction Periodic Interest Rate
		//
		var introPeriodicInterestRate;
		var stdIntroPeriodicInterestRate;

		if(values.introRate <= 0) {
		values.introRate = (values.loanInterestRate > 0) ? values.loanInterestRate : 1;
		}

		introPeriodicInterestRate    = Math.round((values.introRate / repaymentFrequency) * 100000) / 100000;
		stdIntroPeriodicInterestRate = Math.round(introPeriodicInterestRate * 100000) / 100000;

		if(accelerated) {
		if(values.repaymentFrequency === 'acceleratedFortnightly') {
		  introPeriodicInterestRate = Math.round((values.introRate / 12) * 100000) / 100000;
		}
		if(values.repaymentFrequency === 'acceleratedWeekly') {
		  introPeriodicInterestRate = Math.round((values.introRate / 24) * 100000) / 100000;
		}
		}

		if(introPeriodicInterestRate < 0)    introPeriodicInterestRate    = 0;
		if(stdIntroPeriodicInterestRate < 0) stdIntroPeriodicInterestRate = 0;

		//
		// Introduction Number of Payments
		//
		var introNumberOfPayments    = repaymentFrequency * values.loanTerm;
		var stdIntroNumberOfPayments = introNumberOfPayments;

		if(accelerated) {
		if(values.repaymentFrequency === 'acceleratedFortnightly') {
		  introNumberOfPayments = (12 * values.loanTerm);
		}
		if(values.repaymentFrequency === 'acceleratedWeekly') {
		  introNumberOfPayments = (24 * values.loanTerm);
		}
		}

		if(introNumberOfPayments < 0)    introNumberOfPayments    = 0;
		if(stdIntroNumberOfPayments < 0) stdIntroNumberOfPayments = 0;

		//
		// Introduction Principal
		//
		var introPrincipal = values.loanAmount;

		//
		// Introduction Principal + Interest Repayment
		//
		var introPrincipalAndInterestRepayment = introPrincipal *
		((introPeriodicInterestRate/100) +
		  ((introPeriodicInterestRate/100) /
		    (Math.pow(1 + (introPeriodicInterestRate/100), introNumberOfPayments) - 1)));

		if(accelerated) {
		introPrincipalAndInterestRepayment = (introPrincipalAndInterestRepayment / 2);
		}

		introPrincipalAndInterestRepayment = Math.round(introPrincipalAndInterestRepayment * 100) / 100;

		if(introPrincipalAndInterestRepayment < 0) introPrincipalAndInterestRepayment = 0;

		//
		// Balance Remaining After Introduction Period
		//
		var balanceRemainingAfterIntro = 0;

		if(values.loanTerm > 0) {
		if(introTermAdditional < startsAfterPayment) {
		  balanceRemainingAfterIntro = introPrincipal - (((introPrincipalAndInterestRepayment / (stdIntroPeriodicInterestRate/100)) - introPrincipal) * ( Math.pow(1+(stdIntroPeriodicInterestRate/100),introTermAdditional)-1));
		}
		else {
		  balanceRemainingAfterIntro = introPrincipal - (((introPrincipalAndInterestRepayment / (stdIntroPeriodicInterestRate/100)) - introPrincipal) * ( Math.pow(1+(stdIntroPeriodicInterestRate/100),introTermAdditional)-1)) +
		    (((introPrincipalAndInterestRepayment/(stdIntroPeriodicInterestRate/100)) -
		      (introPrincipal - (((introPrincipalAndInterestRepayment / (stdIntroPeriodicInterestRate/100)) - introPrincipal) *
		        (Math.pow( 1 + (stdIntroPeriodicInterestRate/100), introTermAdditional) -1)))) *
		          (Math.pow((1+(stdIntroPeriodicInterestRate/100)), (introTermAdditional - introTermAdditional))-1));
		}
		}

		balanceRemainingAfterIntro = Math.round(balanceRemainingAfterIntro * 100) / 100;
		if(balanceRemainingAfterIntro < 0) balanceRemainingAfterIntro = 0;

		//
		// Periodic Interest Rate
		//
		var periodicInterestRate    = Math.round((values.loanInterestRate / repaymentFrequency)*100000)/100000;
		var stdPeriodicInterestRate = Math.round(periodicInterestRate*100000)/100000;

		if(accelerated) {
		if(values.repaymentFrequency == 'acceleratedFortnightly') {
		  periodicInterestRate = Math.round((values.loanInterestRate / 12)*100000)/100000;
		}

		if(values.repaymentFrequency == 'acceleratedWeekly') {
		  periodicInterestRate = Math.round((values.loanInterestRate / 24)*100000)/100000;
		}
		}

		if(periodicInterestRate <= 0)   periodicInterestRate = 0.1;
		if(stdPeriodicInterestRate <= 0) stdPeriodicInterestRate = 0.1;

		//
		// Number Of Payments
		//
		var numberOfPayments;
		var stdNumberOfPayments;

		if(introTermAdditional > 0) {
		numberOfPayments = (repaymentFrequency * values.loanTerm) - introTermAdditional;

		if(accelerated) {
		  if(values.repaymentFrequency == 'acceleratedFortnightly') {
		    numberOfPayments = (12 * values.loanTerm) - values.introTerm;
		  }

		  if(values.repaymentFrequency == 'acceleratedWeekly') {
		    numberOfPayments = (24 * values.loanTerm) - (values.introTerm*2);
		  }
		}
		}
		else {
		numberOfPayments = repaymentFrequency * values.loanTerm;
		stdNumberOfPayments = repaymentFrequency * values.loanTerm;

		if(accelerated) {
		 if(values.repaymentFrequency == 'acceleratedFortnightly') {
		   numberOfPayments = 12 * values.loanTerm;
		 }

		 if(values.repaymentFrequency == 'acceleratedWeekly') {
		   numberOfPayments = 24 * values.loanTerm;
		 }
		}
		}

		if(numberOfPayments < 0)    numberOfPayments    = 0;
		if(stdNumberOfPayments < 0) stdNumberOfPayments = 0;

		//
		// Principal
		//
		var principal = values.loanAmount;
		if(introTermAdditional > 0) {
		  principal = balanceRemainingAfterIntro;
		}

		if(principal < 0) principal = 0;

		//
		// Principal + Interest Repayment
		//
		var principalAndInterestRepayment;

		if(accelerated) {
		principalAndInterestRepayment = (principal *
		  ((periodicInterestRate/100) +
		  ((periodicInterestRate/100)/( Math.pow((1 + (periodicInterestRate/100)), numberOfPayments) -1))))/2;
		}

		else {
		principalAndInterestRepayment = principal *
		  ((periodicInterestRate/100) +
		  ((periodicInterestRate/100)/( Math.pow((1 + (periodicInterestRate/100)), numberOfPayments) -1)));
		}

		if(principalAndInterestRepayment < 0) principalAndInterestRepayment = 0;

		//
		// Additional Repayment
		//
		var additionalRepayment = parseInt(values.extraRepayment,10);
		if(additionalRepayment < 0) additionalRepayment = 0;

		//
		// Total Amount - No Extras
		//
		var totalAmountNoExtras = (introPrincipal*((stdPeriodicInterestRate/100)+((stdPeriodicInterestRate/100)/((Math.pow((1+(stdPeriodicInterestRate/100)), stdIntroNumberOfPayments))-1))))*stdIntroNumberOfPayments;
		if(totalAmountNoExtras < 0) totalAmountNoExtras = 0;

		//
		// Output: Intro Repayment Amount
		//
		if(values.extraRepaymentStart > 0) {
		out.introRepaymentAmount = Math.round(introPrincipalAndInterestRepayment);
		}
		else {
		out.introRepaymentAmount = 0;
		}

		//
		// Output: Regular Repayment Amount
		//
		out.regularRepaymentAmount = Math.round(principalAndInterestRepayment);
		if(out.regularRepaymentAmount < 0) out.regularRepaymentAmount = 0;

		//
		// Output: Extra Repayment Amount
		//
		if(values.extraRepaymentStart > 0) {
		  out.extraRepaymentAmount = Math.round((principalAndInterestRepayment + additionalRepayment));
		}
		else {
		  out.extraRepaymentAmount = 0;
		}


		//
		// Calculate Breakdown Table
		//
		var breakdown = [],
		  lastYear = 0,
		  lastPaymentNo = 0,
		  totalInterestPaid = 0,
		  totalPayments = 0;

		for(i = 0; i <= repaymentFrequency * values.loanTerm; i++) {
		var year, paymentNo, bdPrincipal, interest, cumulativePrincipal, cumulativeInterest,
		    balance, totalPayment, interestRate, repayment, extraPayment, lumpSum, interestPaid, interestOnly, remainingPrincipal;

		if(i === 0) {
		  if(lumpSumAdditional === 0) {
		    lumpSum = parseInt(values.lumpSum, 10);
		    } else lumpSum = 0;

		    repayment      = lumpSum;
		    totalPayments += repayment;

		    breakdown.push({
		        year: 0,
		        paymentNo: 0,
		        bdPrincipal: 0,
		        interest: 0,
		        cumulativePrincipal: 0,
		        cumulativeInterest: 0,
		        balance: values.loanAmount - repayment,
		        totalPayment: 0,
		        interestRate: 0,
		        repayment: repayment,
		        extraPayment: 0,
		        lumpSum: lumpSum,
		        interestPaid: 0,
		        interestOnly: 0,
		        remainingPrincipal: values.loanAmount - repayment
		    });
		}
		else {
		  // Payment Number
		  paymentNo = i;

		  if(paymentNo < (Math.round(introTermAdditional) + 1)) {
		    interestRate = stdIntroPeriodicInterestRate;
		  }
		  else {
		    interestRate = stdPeriodicInterestRate;
		  }

		  // Repayment
		  if(Math.round(introTermAdditional) > 0) {
		    if(paymentNo < (Math.round(introTermAdditional)+1)) {
		      repayment = introPrincipalAndInterestRepayment;

		    }
		    else {
		      repayment = principalAndInterestRepayment;
		    }
		  }
		  else {
		    repayment = principalAndInterestRepayment;
		  }

		  // Extra Payment
		  if(parseInt(startsAfterPayment,10) >= 0) {
		    if(paymentNo < (parseInt(startsAfterPayment,10)+1)) {
		      extraPayment = 0;
		    }
		    else {
		      extraPayment = additionalRepayment;
		    }
		  }
		  else {
		    extraPayment = 0;
		  }

		  // Lump Sum
		  if(lumpSumAdditional >= 0 && values.lumpSum > 0 && paymentNo == lumpSumAdditional) {
		      lumpSum = parseInt(values.lumpSum, 10);
		  }
		  else lumpSum = 0;

		  if(lumpSum <= 0) lumpSum = 0;

		  // Interest
		  interest = ((interestRate/100) * breakdown[i-1].balance);

		  // Total Payment
		  if( (repayment + extraPayment + lumpSum) > (breakdown[i-1].balance + interest)) {
		    totalPayment = (breakdown[i-1].balance) + interest;
		  }
		  else {
		    totalPayment = (repayment + extraPayment + lumpSum);
		  }


		  // Interest Only
		  if(breakdown[1]) interestOnly = breakdown[1].interest;
		  else interestOnly = interest;

		  // Interest Paid
		  interestPaid = interestOnly + breakdown[i-1].interestPaid;

		  // Principal
		  bdPrincipal = (totalPayment - interest);

		  // Cumulative Principal
		  cumulativePrincipal = (principal + (breakdown[i-1].cumulativePrincipal));

		  // Cumulative Interest
		  cumulativeInterest = (interest + (breakdown[i-1].cumulativeInterest));

		  // Balance (Rounded to 2 Decimal Places)
		  balance = ((breakdown[i-1].balance) - bdPrincipal);

		  // Remaining Principal
		  remainingPrincipal = ((breakdown[i-1].remainingPrincipal) - extraPayment - lumpSum);

		  // Year
		  year = Math.ceil(paymentNo / repaymentFrequency);

		  // Push results to the 'table'
		  breakdown.push({
		    year                : year,
		    paymentNo           : paymentNo,
		    principal           : bdPrincipal,
		    interest            : interest,
		    cumulativePrincipal : cumulativePrincipal,
		    cumulativeInterest  : cumulativeInterest,
		    balance             : balance,
		    totalPayment        : totalPayment,
		    interestRate        : interestRate,
		    repayment           : repayment,
		    extraPayment        : extraPayment,
		    lumpSum             : lumpSum,
		    interestOnly        : interestOnly,
		    interestPaid        : interestPaid,
		    remainingPrincipal  : remainingPrincipal
		  });

		  // Increment total interest and total payments counters
		  totalInterestPaid += interest;
		  totalPayments += totalPayment;

		  // End loop when last year
		  if(balance <= 1) {
		    lastYear = year;
		    lastPaymentNo = paymentNo;
		    break;
		  }
		}
		}

		//
		// Output: Time Saved
		//
		var totalYearsSaved = ((introNumberOfPayments - lastPaymentNo) / repaymentFrequency);
		var partYearSaved = totalYearsSaved - parseInt(totalYearsSaved, 10);
		out.timeSaved = parseInt(totalYearsSaved) + ' years and ' + Math.round(12*partYearSaved) + ' months';

		//
		// Output: Total Amount Paid
		//
		out.totalAmountPaid = totalPayments;

		//
		// Output: Total Interest Paid
		//
		out.totalInterestPaid = totalPayments - values.loanAmount;

		//
		// Output: Interest Saved
		//
		out.interestSaved = totalAmountNoExtras - out.totalAmountPaid;
		if(out.interestSaved < 0) out.interestSaved = 0;
		
		//
		// Output: First Repayment Amount
		//
		if(values.repaymentType == 'interest') {
		if(startsAfterPayment === 0)
		  out.firstRepaymentAmount = breakdown[1].interestOnly + breakdown[1].extraPayment;
		else
		  out.firstRepaymentAmount = breakdown[1].interestOnly;
		}
		else {
		if(startsAfterPayment === 0)
		    out.firstRepaymentAmount = breakdown[1].repayment + breakdown[1].extraPayment;
		else
		    out.firstRepaymentAmount = breakdown[1].repayment;
		}

		if(out.firstRepaymentAmount < 0) out.firstRepaymentAmount = 0;

		//
		// Output: Total Time
		//
		totalYears = lastPaymentNo / repaymentFrequency;
		partYear   = totalYears - parseInt(totalYears, 10);

		var outputYears  = parseInt(totalYears, 10);
		var outputMonths = Math.round(12*partYear);


		if(outputMonths == 12) {
		outputYears = outputYears + 1;
		outputMonths = 0;
		}
		out.totalTime = outputYears + (outputYears > 1 ? ' years' : ' year');
		if(outputMonths > 0) out.totalTime += ' and ' + outputMonths + (outputMonths > 1 ? ' months' : ' month');

		//
		// Set Outputs
		//

		return {
			repaymentAmount: Math.round(out.firstRepaymentAmount),
			repaymentFrequency: values.repaymentFrequency,
			loanTermYears: `${values.loanTerm} years`,
		};
	}
}