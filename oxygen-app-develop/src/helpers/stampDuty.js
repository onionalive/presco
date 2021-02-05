export default class StampDuty {

	static stampDutyResults(props) {

		let values = {};
		Object.assign(values, props);

		// let values = {propertyValue: 250000, stateValue: "NSW", propertyTypeOne: "primary", propertyTypeTwo: "existing", firstHome: "0"};

		//
		// Calculate stamp duty
		//
		let stampDutyValue = 0,
		    transferFeeValue = 213,
		    registrationFeeValue = 110,
		    duty,
		    message;

		switch(values.stateValue) {

		    //
		    // ACT: http://www.revenue.act.gov.au/duties/land_and_improvements
		    //
		    case "ACT":
		      // values.propertyTypeTwo = 'new';
		        message = "The Home Buyer Concession Scheme (HBCS) is an ACT Government initiative administered by the ACT Revenue Office to assist persons in purchasing a new residential home or residential vacant land by charging duty at a concessional rate. The concession ceased for the purchase of an established property as of 1 September 2012. The HBCS applies to property where the transaction date, which is the date of grant, transfer, or agreement for transfer (whichever is first) occurs between 8 June 2016 and 31 December 2016.  This is the date of first execution of an agreement or transfer, not the settlement date.  The concession applies to new or substantially renovated properties for transactions dated 8 June 2016 to 31 December 2016, total gross income threshold is currently $160,000. - Find more info on <a target=\"_blank\" href=\"http://www.revenue.act.gov.au/home-buyer-assistance/home-buyer-duty-concession/8-june-2016-31-december-2016\">ACT Revenue Office</a>";


		        // Up to $200k: $20 or $2.00 per $100, whichever is greater.
				if (values.propertyValue <= 200000) {
		            duty = (values.propertyValue / 100) * 1.48;
		            if (duty < 20) duty = 20;
		        }

		        // $200k - $300k: $2,960 plus $2.50 per $100 or part thereof by which the value exceeds $200,000
		        if ((values.propertyValue >= 250000) && (values.propertyValue <= 300000)) {
		            duty = 4000 + (((values.propertyValue - 250000) / 100) * 2.40);
		        }

		        // $300k - $500k: $5460 plus $4.00 per $100 or part thereof by which the value exceeds $300,000
		        if ((values.propertyValue > 300000) && (values.propertyValue <= 470000)) {
		            duty = 5200 + (((values.propertyValue - 300000) / 100) * 3.80);
		        }

		        // $500k - $750k: $13,460 plus $5.00 per $100 or part thereof by which the value exceeds $500,000
		        if ((values.propertyValue > 470000) && (values.propertyValue <= 480000)) {
					duty = 11660 + (((values.propertyValue - 470000) / 100) * 1.90);
		        }

		        // $750k - $1m: $25,960 plus $6.50 per $100 or part thereof by which the value exceeds $750,000
		        if ((values.propertyValue > 480000) && (values.propertyValue <= 500000)) {
		            duty = 12040 + (((values.propertyValue - 480000) / 100) * 3.8);
		        }

		        // $1,000,001 to $1,454,999: $42,210 plus $7.00 per $100 or part thereof by which the value exceeds $1,000,000
		        if(values.propertyValue > 500000 && values.propertyValue <= 750000) {
		            duty = 12800 + (((values.propertyValue - 500000) / 100) * 4.78);
		        }

		        // DONE
		        // $1,000,001 to $1,454,999: $42,210 plus $7.00 per $100 or part thereof by which the value exceeds $1,000,000
		        if(values.propertyValue > 750000 && values.propertyValue <= 1000000) {
		            duty = 24750 + (((values.propertyValue - 750000) / 100) * 6.3);
		        }

		        // $1,000,001 to $1,454,999: $42,210 plus $7.00 per $100 or part thereof by which the value exceeds $1,000,000
		        if(values.propertyValue > 1000000 && values.propertyValue <= 1450000) {
		            // duty = 40500 + (((values.propertyValue - 1000000) / 100) * 6.8);
		            duty = 40500 + (((values.propertyValue % 1000000) / 10000) * 680);
		        }

		        // $1,455,001 and over: Flat rate of $5.50 per $100 applied to the full amount
		        if(values.propertyValue > 1450000) {
		            duty = 71100 + ((values.propertyValue - 1450000) / 100) * 25.5;
		        }

		        // FHO: House
							//	$455,000 or less: 		$20 minimum duty
							//	more than $455,000 but less than $585,000: $13.60 for each $100 or part thereof by which the dutiable value exceeds $455,000 ($20 minimum duty).
							//	$585,000 or more:			No concession
		        if(values.firstHome === '1' && values.propertyTypeOne == 'primary' && values.propertyTypeTwo != 'vacant' && values.propertyTypeTwo != 'existing') {
		          if (values.propertyValue <= 470000) {
		            duty = 20;
		          }

		          if ((values.propertyValue > 470000) && (values.propertyValue < 607000)) {
		          	if (values.propertyValue < 472000) {
		          		duty = ((values.propertyValue % 470000) / 10000) * 1305;
		          	} else {
						const multiplier = ((values.propertyValue % 470000) / 10000);
						duty = multiplier * 1305;
		          	}
		          }
		        }

		        // FHO: Vacant Land
							//	$272,200 or less:			$20 minimum duty
							//	more than $272,200 but less than $317,600:	$13.55 for each $100 or part thereof by which the dutiable value exceeds $264,700 ($20 minimum duty).
							//	$317,600 or more:			No concession

				// 652.50
				// 1305 / 2
		        if(values.firstHome === '1' && values.propertyTypeOne == 'primary' && values.propertyTypeTwo == 'vacant') {
		            if (values.propertyValue <= 281200) {
						duty = 20;
					}

					if ((values.propertyValue > 281200) && (values.propertyValue < 330000)) {
						duty = (((values.propertyValue % 281200) / 10000 * 1305));
					}
		        }

		        if(duty < 20) duty = 20;

		        stampDutyValue = duty;
		        transferFeeValue = 262;
		        registrationFeeValue = 135;

		    break;

		    //
		    // NSW: http://www.osr.nsw.gov.au/legislation/rulings/stamp/
		    //
		    case "NSW":
		      message = "New Home scheme commenced from 1 January 2012 and provides eligible purchasers with exemptions from transfer duty on new homes valued up to $550,000 and concessions for new homes valued between $550,000 and $650,000. Eligible purchaser buying a vacant block of residential land to build their home will pay no duty on vacant land valued up to $350,000, and will receive concessions for vacant land valued between $350,000 and $450, 000. - Find more info on <a target=\"_blank\" href=\"http://www.osr.nsw.gov.au/grants/fhnh\">NSW Office of State Revenue</a>";
		      // values.propertyTypeTwo = 'existing';
		        // Up to $14k: $1.25 per $100
		        if (values.propertyValue <= 14000)
		            duty = (values.propertyValue / 100) * 1.25;

		        // $14k - $30k: $175 plus $1.50 for every $100
		        if ((values.propertyValue > 14000) && (values.propertyValue <= 30000))
		            duty = 175 + (((values.propertyValue - 14000) / 100) * 1.5);

		        // $30k - $80k: $415 plus $1.75 for every $100
		        if ((values.propertyValue > 30000) && (values.propertyValue <= 80000))
		            duty = 415 + (((values.propertyValue - 30000) / 100) * 1.75);

		        // $80k - $300k: $1,290 plus $3.50 for every $100 or part, by which the dutiable value exceeds $80,000
		        if ((values.propertyValue > 80000) && (values.propertyValue <= 300000))
		            duty = 1290 + (((values.propertyValue - 80000) / 100) * 3.5);

		        // $300k - $1m: $8,990 plus $4.50 for every $100 or part, by which the dutiable value exceeds $300,000
		        if ((values.propertyValue > 300000) && (values.propertyValue <= 1000000))
		            duty = 8990 + (((values.propertyValue - 300000) / 100) * 4.5);

		        // $1m to $3m: $40,490 plus $5.50 for every $100 or part, by which the dutiable value exceeds $1,000,000
		        if(values.propertyValue > 1000000 && values.propertyValue <= 3000000)
		            duty = 40490 + (((values.propertyValue - 1000000) / 100) * 5.5);

		        // $3m plus: in residential purchases over $3,000,000, $7.00 per $100 or part, by which the dutiable value exceeds $3,000,000.
		        if(values.propertyValue > 3000000)
		            duty = 150490 + (((values.propertyValue - 3000000) / 100) * 7);

		        // The First Home / New Home scheme
		        // See: http://www.osr.nsw.gov.au/benefits/first_home/first_home_new_home/
		        if (values.firstHome === '1' && values.propertyTypeOne == 'primary' && values.propertyTypeTwo != 'vacant' && values.propertyTypeTwo != 'existing') {
		            // Up to $550k: Exempt
		            if (values.propertyValue <= 550000)
		                duty = 0;

		            // $550k - $650k: multiply the purchase price by 0.2474 and subtract $136,070
		            if (values.propertyValue > 550000 && values.propertyValue <= 650000)
		                duty = (values.propertyValue * 0.2474) - 136070;
		        }

		        // Vacant Land Exemption
		        if (values.firstHome === '1' && values.propertyTypeTwo == 'vacant' && values.propertyTypeOne == 'primary') {

		            // Up to $350k: Exempt
		            if(values.propertyValue <= 350000)
		                duty = 0;

		            // $350k - $450k: multiply purchase price by 0.1574 then subtract $55,090
		            if(values.propertyValue > 350000 && values.propertyValue <= 450000)
		                duty = (values.propertyValue * 0.1574) - 55090;
		        }

		        if(duty < 0) duty = 0;

		        stampDutyValue = duty;
		        transferFeeValue = 138.80;
		        registrationFeeValue = 138.80;

		    break;

		    //
		    // NT: http://www.treasury.nt.gov.au/TaxesRoyaltiesAndGrants/StampDuty/Pages/Duty-Types-and-Rates.aspx
		    //
		    case "NT":

		        message = "From 24 May 2016, first home buyers of established homes will be eligible for the First Home Owner Discount, which provides a 50 per cent saving on the stamp duty payable on that purchase, up to a maximum amount of $10 000. <br/> The Northern Territory Government provides a stamp duty Principal Place of Residence Rebate (PPRR) to persons purchasing a new home or land on which to build a home. A new home is a home that has never been previously lived in or sold as a place or residence. Substantially renovated homes may be considered as a new home for the purpose of the PPRR. The PPRR is an amount up to $7000 off the duty payable. - Find more info on <a target=\"_blank\" href=\"http://www.treasury.nt.gov.au/TaxesRoyaltiesAndGrants/HomeOwnerIncentives/PrincipalPlaceofResidenceRebate/Pages/default.aspx\">NT Department of Treasury and Finance</a>"

		        // Up to $525k: Use formula ((0.06571441 x V^2 ) + 15V) where V = (the dutiable value/1000)
		        if (values.propertyValue < 525000) {
		          let V = values.propertyValue / 1000;
		          duty = (0.06571441 * (Math.pow(V, 2))) + (15 * V);
		        }

		        // $525k - $3m: Flat 4.95%
		        if (values.propertyValue >= 525000 && values.propertyValue < 3000000)
		            duty = (values.propertyValue / 100) * 4.95;

		        // $3m plus: Flat 5.45%
		        if (values.propertyValue >= 3000000)
		              duty = (values.propertyValue / 100) * 5.45;

		        // Stamp Duty - First Home Owner Concession
		        // From 24 May 2016, first home buyers of established homes will be eligible for the First Home Owner Discount, which provides a 50 per cent saving on the stamp duty payable on that purchase, up to a maximum amount of $10 000.
		        if (values.propertyTypeOne == 'primary' && values.firstHome === '1' && values.propertyTypeTwo != 'vacant' && values.propertyTypeTwo != 'existing') {
		          let concession = duty * 0.5;

		          if (concession > 10000)
		            concession = 10000;

		          duty -= concession;
		        } else if (values.propertyTypeOne == "primary" && values.firstHome != '1' && values.propertyTypeTwo != 'vacant' && values.propertyTypeTwo != 'existing') {
		          let concession = 7000;

		          duty -= concession;
		        }

		        if (duty < 0) duty = 0;

		        stampDutyValue = duty;
		        transferFeeValue = 142;
		        registrationFeeValue = 142;

		    break;

		    //
		    // QLD: http://www.osr.qld.gov.au/duties/about-duties/rates-of-duty.shtml
		    //

		    case "QLD":

		    message = "Home Concession - The concessional transfer duty rate applies to the first $350,000 of the consideration or value of the home. The general transfer duty rates then apply to the balance. - For more info on rates visit <a target=\"_blank\" href=\"https://www.qld.gov.au/housing/buying-owning-home/concessions-for-homes/\">Queensland Goverment housing website</a><br/> First home concession - The first home concession is calculated at the home concession rate minus the first home concession amount. - For info on rates visit <a target=\"_blank\" href=\"https://www.qld.gov.au/housing/buying-owning-home/concessions-for-homes/\">Queensland Goverment housing website</a><br/> First home vacant land concession - The first home vacant land concession is calculated at the transfer duty rate minus the first home vacant land concession amount. - For info on rates visit <a target=\"_blank\" href=\"https://www.qld.gov.au/housing/buying-owning-home/concessions-for-homes/\">Queensland Goverment housing website</a><br/> Queensland First Home Owners' Grant - Depending on the date of your contract, you’ll get $15,000 or $20,000 towards buying or building your new house, unit or townhouse (valued at less than $750,000). You can even buy off the plan or choose to build yourself. It’s a great opportunity to buy or build a new home in our great state. - For more info visit <a target=\"_blank\" href=\"https://firsthomeowners.initiatives.qld.gov.au/\">Queensland First Home Owners' Grant</a>";
		    let fullDuty, homeConcession, firstHomeConcession, firstHomeLandConcession;
		    //
		    // FULL RATE:
		    //
		        // Up to $5k: Free!
		        if (values.propertyValue <= 5000)
		          fullDuty = 0;

		        // $1.50 for each $100, or part of $100, by which the dutiable value is more than $5,000
		        if (values.propertyValue > 5000 && values.propertyValue <= 75000)
		            fullDuty = (Math.ceil(values.propertyValue - 5000) / 100) * 1.5;

		        // $75k - $540k: $1,050 plus $3.50 for each $100, or part of $100, by which the dutiable value is more than $75,000
		        if (values.propertyValue > 75000 && values.propertyValue <= 540000)
		              fullDuty = 1050 + (Math.ceil(values.propertyValue - 75000) / 100) * 3.5;

		        // $540k - $1m: $17,325 plus $4.50 for each $100, or part of $100, by which the dutiable value is more than $540,000
		        if (values.propertyValue > 540000 && values.propertyValue <= 1000000)
		            fullDuty = 17325 + (Math.ceil(values.propertyValue - 540000) / 100) * 4.5;

		        // $1m plus: 	$38,025 plus $5.75 for each $100, or part of $100, by which the dutiable value is more than $1,000,000
		        if(values.propertyValue > 1000000)
		            fullDuty = 38025 + (Math.ceil(values.propertyValue - 1000000) / 100) * 5.75;



		    // Home Concession
		    // See: http://www.osr.qld.gov.au/duties/transfer-duty/exemptions-and-concessions/concessions-for-homes.shtml

		        // Up to $350k: $1.00 for each $100 or part of $100
		        if (values.propertyValue <= 350000)
		          homeConcession = (Math.ceil(values.propertyValue / 100) * 1);

		        // $350k - $540k: $3,500 + $3.50 for every $100 or part of $100 over $350,000
		        if (values.propertyValue > 350000 && values.propertyValue <= 540000)
		            homeConcession = 3500 + (Math.ceil(values.propertyValue - 350000) / 100) * 3.5;

		        // $540k - $1m: $10,150 + $4.50 for every $100 or part of $100 over $540,000
		        if (values.propertyValue > 540000 && values.propertyValue <= 1000000)
		            homeConcession = 10150 + (Math.ceil(values.propertyValue - 540000) / 100) * 4.5;

		        // $1m plus: $30,850 + $5.75 for every $100 or part of $100 over $1,000,000
		        if(values.propertyValue > 1000000)
		            homeConcession = 30850 + (Math.ceil(values.propertyValue - 1000000) / 100) * 5.75;

		    // First Home Concession
		    // See: http://www.osr.qld.gov.au/duties/transfer-duty/exemptions-and-concessions/concessions-for-homes.shtml



		            // Up to $505k: $8,750
		            if (values.propertyValue < 505000) {
		                if(homeConcession > 8750)
		                    firstHomeConcession = 8750;
		                else
		                    firstHomeConcession = homeConcession;
		            }

		            // $505k - $510k: $7,875
		            if (values.propertyValue >= 505000 && values.propertyValue < 510000)
		                firstHomeConcession = 7875;

		            // $510k - $515k: $7,000
		            if (values.propertyValue >= 510000 && values.propertyValue < 515000)
		                firstHomeConcession = 7000;

		            // $515k - $520k: $6,125
		            if (values.propertyValue >= 515000 && values.propertyValue < 520000)
		                firstHomeConcession = 6125;

		            // $520k - $525k: $5,250
		            if (values.propertyValue >= 520000 && values.propertyValue < 525000)
		                firstHomeConcession = 5250;

		            // $525k - $530k: $4,375
		            if (values.propertyValue >= 525000 && values.propertyValue < 530000)
		                firstHomeConcession = 4375;

		            // $530k - $535k: $3,500
		            if (values.propertyValue >= 530000 && values.propertyValue < 535000)
		                firstHomeConcession = 3500;

		            // $535k - $540k: $2,625
		            if (values.propertyValue >= 535000 && values.propertyValue < 540000)
		                firstHomeConcession = 2625;

		            // $540k - $545k: $1,750
		            if (values.propertyValue >= 540000 && values.propertyValue < 545000)
		                firstHomeConcession = 1750;

		            // $545k - $550k: $875
		            if (values.propertyValue >= 545000 && values.propertyValue < 550000)
		                firstHomeConcession = 875;

		            // $550k plus: no concession
		            if(values.propertyValue >= 550000)
		                firstHomeConcession = 0;


		    // First Home Vacant Land Concession
		    // see: http://www.osr.qld.gov.au/duties/transfer-duty/exemptions-and-concessions/first-home-vacant-land.shtml

		        // Up to $250k: Free
		        if(values.propertyValue < 250000)
		            firstHomeLandConcession = duty;

		        // $250k - $260k: $7,175
		        if(values.propertyValue >= 250000 && values.propertyValue < 260000)
		            firstHomeLandConcession = 7175;

		        // $260k - $270k: $6,700
		        if(values.propertyValue >= 260000 && values.propertyValue < 270000)
		            firstHomeLandConcession = 6700;

		        // $270k - $280k: $6,225
		        if(values.propertyValue >= 270000 && values.propertyValue < 280000)
		            firstHomeLandConcession = 6225;

		        // $280k - $290k: $5,750
		        if(values.propertyValue >= 280000 && values.propertyValue < 290000)
		            firstHomeLandConcession = 5750;

		        // $290k - $300k: $5,275
		        if(values.propertyValue >= 290000 && values.propertyValue < 300000)
		            firstHomeLandConcession = 5275;

		        // $300k - $310k: $4,800
		        if(values.propertyValue >= 300000 && values.propertyValue < 310000)
		            firstHomeLandConcession = 4800;

		        // $310k - $320k: $4,325
		        if(values.propertyValue >= 310000 && values.propertyValue < 320000)
		            firstHomeLandConcession = 4325;

		        // $320k - $330k: $3,850
		        if(values.propertyValue >= 320000 && values.propertyValue < 330000)
		            firstHomeLandConcession = 3850;

		        // $330k - $340k: $3,375
		        if(values.propertyValue >= 330000 && values.propertyValue < 340000)
		            firstHomeLandConcession = 3375;

		        // $340k - $350k: $2,900
		        if(values.propertyValue >= 340000 && values.propertyValue < 350000)
		            firstHomeLandConcession = 2900;

		        // $350k - $360k: $2,425
		        if(values.propertyValue >= 350000 && values.propertyValue < 360000)
		            firstHomeLandConcession = 2425;

		        // $360k - $370k: $1,950
		        if(values.propertyValue >= 360000 && values.propertyValue < 370000)
		            firstHomeLandConcession = 1950;

		        // $370k - $380k: $1,475
		        if(values.propertyValue >= 370000 && values.propertyValue < 380000)
		            firstHomeLandConcession = 1475;

		        // $380k - $390k: $1,000
		        if(values.propertyValue >= 380000 && values.propertyValue < 390000)
		            firstHomeLandConcession = 1000;

		        // $390k - $400k: $525
		        if(values.propertyValue >= 390000 && values.propertyValue < 400000)
		            firstHomeLandConcession = 525;

		        // $400k plus - no concession
		        if(values.propertyValue >= 400000)
		            firstHomeLandConcession = 0;

		        if (values.firstHome === '1' && values.propertyTypeOne == 'primary' && values.propertyTypeTwo != 'vacant')
		            duty = homeConcession - firstHomeConcession;

		        else if (values.firstHome === '1' && values.propertyTypeOne == 'primary' && values.propertyTypeTwo == 'vacant')
		            duty = fullDuty - firstHomeLandConcession;

		        else if (values.firstHome === '0' && values.propertyTypeOne == 'primary' && values.propertyTypeTwo != 'vacant')
		            duty = homeConcession;

		        else
		            duty = fullDuty;

		        // Transfer Fee

		        // Under $180k: Flat fee of $162.90
		        transferFeeValue = 175;

		        // Over $180k: $162.90 plus $30.80 for each $10,000, or part of $10,000, by which the dutiable value is more than $180,000
		        if (values.propertyValue > 180000)
		            transferFeeValue += Math.ceil(((values.propertyValue - 180000) / 10000)) * 33;

		        if (duty < 0) duty = 0;

		        stampDutyValue = duty;
		        registrationFeeValue = 175;

		    break;

		    //
		    // SA: http://www.revenuesa.sa.gov.au/stamps/index.html
		    //
		    case "SA":

		        message = "N/A";

		        // Up to $12k: $1.00 for every $100 or part of $100
		        if (values.propertyValue <= 12000)
		            duty = (values.propertyValue / 100) * 1;

		        // $12k - $30k: $120 plus $2.00 for every $100 or part of $100 over $12,000
		        if ((values.propertyValue > 12000) && (values.propertyValue <= 30000))
		            duty = (((values.propertyValue - 12000) / 100) * 2) + 120;

		        // $30k - $50k: $480 plus $3.00 for every $100 or part of $100 over $30,000
		        if ((values.propertyValue > 30000) && (values.propertyValue <= 50000))
		            duty = (((values.propertyValue - 30000) / 100) * 3) + 480;

		        // $50k - $100k: $1,080 plus $3.50 for every $100 or part of $100 over $50,000
		        if ((values.propertyValue > 50000) && (values.propertyValue <= 100000))
		            duty = (((values.propertyValue - 50000) / 100) * 3.5) + 1080;

		        // $100k - $200k: $2,830 plus $4.00 for every $100 or part of $100 over $100,000
		        if ((values.propertyValue > 100000) && (values.propertyValue <= 200000))
		            duty = (((values.propertyValue - 100000) / 100) * 4) + 2830;

		        // $200k - $250k: $6,830 plus $4.25 for every $100 or part of $100 over $200,000
		        if ((values.propertyValue > 200000) && (values.propertyValue <= 250000))
		            duty = (((values.propertyValue - 200000) / 100) * 4.25) + 6830;

		        // $250k - $300k: $8,955 plus $4.75 for every $100 or part of $100 over $250,000
		        if ((values.propertyValue > 250000) && (values.propertyValue <= 300000))
		            duty = (((values.propertyValue - 250000) / 100) * 4.75) + 8955;

		        // $300k - $500k: $11,330 plus $5.00 for every $100 or part of $100 over $300,000
		        if ((values.propertyValue > 300000) && (values.propertyValue <= 500000))
		            duty = (((values.propertyValue - 300000) / 100) * 5) + 11330;

		        // $500k plus: $21,330 plus $5.50 for every $100 or part of $100 over $500,000
		        if(values.propertyValue > 500000)
		            duty = (((values.propertyValue - 500000) / 100) * 5.5) + 21330;

		        stampDutyValue = duty;
		        registrationFeeValue = 157;

		        //
		        // Transfer Fee
		        //
		        if (values.propertyValue <= 5000) {
		            transferFeeValue = 157;
		            break;
		        }
		        if (values.propertyValue > 5000 && values.propertyValue <= 20000) {
		            transferFeeValue = 174;
		            break;
		        }
		        if (values.propertyValue > 20000 && values.propertyValue <= 40000) {
		            transferFeeValue = 191;
		            break;
		        }
		        if (values.propertyValue > 40000 && values.propertyValue <= 50000) {
		            transferFeeValue = 268;
		            break;
		        }

		        // Values above 50k use the formula:
		        // $268 + 0.79% of property value

		        if(values.propertyValue > 50000) {
		            transferFeeValue = 268 + (values.propertyValue * 0.79);
		            break;
		        }

		        break;

		    //
		    // TAS: http://www.sro.tas.gov.au/domino/dtf/SROWebsite.nsf/v-all/380146A04610A996CA25758B000686E0?
		    //
		    case "TAS":

		        message = "N/A";


		        // Up to $3000: $50
		        if (values.propertyValue <= 3000)
		            duty = 50;

		        // $3000 - $25k: $50 plus $1.75 for every $100, or part, by which the dutiable value exceeds $3000
		        if ((values.propertyValue > 3000) && (values.propertyValue <= 25000))
		            duty = (((values.propertyValue - 3000) / 100) * 1.75) + 50;

		        // $25k - $75k: $435 plus $2.25 for every $100, or part, by which the dutiable value exceeds $25,000
		        if ((values.propertyValue > 25000) && (values.propertyValue <= 75000))
		            duty = (((values.propertyValue - 25000) / 100) * 2.25) + 435;

		        // $75k - $200k: $1,560 plus $3.50 for every $100, or part, by which the dutiable value exceeds $75,000
		        if ((values.propertyValue > 75000) && (values.propertyValue <= 200000))
		            duty = (((values.propertyValue - 75000) / 100) * 3.5) + 1560;

		        // $200k - $375k: $5,935 plus $4.00 for every $100, or part, by which the dutiable value exceeds $200,000
		        if ((values.propertyValue > 200000) && (values.propertyValue <= 375000))
		            duty = (((values.propertyValue - 200000) / 100) * 4) + 5935;

		        // $375k - $725k: $12,935 plus $4.25 for every $100, or part, by which the dutiable value exceeds $375,000
		        if ((values.propertyValue > 375000) && (values.propertyValue <= 725000))
		            duty = (((values.propertyValue - 375000) / 100) * 4.25) + 12935;

		        // $725k plus: $27,810 plus $4.50 for every $100, or part, by which the dutiable value exceeds $725 000
		        if(values.propertyValue > 725000)
		            duty = (((values.propertyValue - 725000) / 100) * 4.5) + 27810;

		        stampDutyValue = duty;
		        transferFeeValue = 200.43;
		        registrationFeeValue = 13.81;

		    break;

		    //
		    // VIC: http://www.sro.vic.gov.au/sro/sronav.nsf/childdocs/-34FAD0EFBAFF8BE0CA2575A100442101-E35A67FBAB847FF1CA2575D10080A69F-1F4F15D2B7E31144CA2576EE007AFC77?open
		    //
		    case "VIC":

		        message = "N/A";

		        //
		        // Primary Home
		        //
		        if (values.propertyTypeOne == "primary") {

		          if (values.propertyValue <= 25000) {
		          	duty = (values.propertyValue / 100) * 1.4;
		          }

		          // $0 - $130k: $350 plus 2.4% of the dutiable value in excess of $25,000
	              if (values.propertyValue <= 130000) {
	                  duty = (((values.propertyValue - 25000) / 100) * 2.4) + 350;
	              }

		          // > $130,000 to $440,000: $2870 plus 5% of amount > $130,000
		          if ((values.propertyValue > 130000) && (values.propertyValue <= 440000)) {
		          		duty = ((values.propertyValue - 130000) * 0.05) + 2870;
		          }

		          // > $440,000 to $550,000: $18,370 plus 6% of amount > $440,000
		          if ((values.propertyValue > 440000) && (values.propertyValue <= 550000)) {
		          	duty = ((values.propertyValue - 440000) * 0.06) + 18370;
		          }


		          // $550k - $960k: $2,870 plus 6% of the dutiable value in excess of $130,000
					if ((values.value > 550000) && (values.propertyValue <= 960000)) {
						duty = (((values.propertyValue - 550000) / 100) * 6) + 28070;
					}

					// $960k plus: 5.5% of the dutiable value
					if(values.propertyValue > 960000) {
						duty = (values.propertyValue / 100) * 5.5;
					}
				}

		        //
		        // Non-Primary Home
		        //
		        else {
		            // Up to $25,000: 1.4 per cent of the dutiable value of the property
		            if (values.propertyValue <= 25000)
		                duty = (values.propertyValue / 100) * 1.4;

		            // $25k - $130k: $350 plus 2.4% of the dutiable value in excess of $25,000
		            if ((values.propertyValue > 25000) && (values.propertyValue <= 130000))
		                duty = (((values.propertyValue - 25000) / 100) * 2.4) + 350;

		            // $130k - $960k: $2,870 plus 6% of the dutiable value in excess of $130,000
		            if ((values.propertyValue > 130000) && (values.propertyValue <= 960000))
		                duty = (((values.propertyValue - 130000) / 100) * 6) + 2870;

		            // $960k plus: 5.5% of the dutiable value
		            if(values.propertyValue > 960000)
		                duty = (values.propertyValue / 100) * 5.5;

		        }

		        //
		        // First Home Buyers
		        //
		        if (values.propertyTypeOne == 'primary' && values.firstHome === '1') {
		            // Up to $25,000: (1.4 per cent of the dutiable value of the property) less 50 per cent
		            if (values.propertyValue <= 25000)
		              duty = (0*(1-0.5)) + 0.014 * values.propertyValue*(1-0.5);

		            // $25k - $130k: ($350 plus 2.4 per cent of the dutiable value in excess of $25,000) less 50 per cent
		            if ((values.propertyValue > 25000) && (values.propertyValue <= 130000))
		              duty = (350*(1-0.5)) + 0.024 * (values.propertyValue-25000)*(1-0.5);

		            // $130k - $440k: ($2870 plus 5 per cent of the dutiable value in excess of $130,000) less 50 per cent
		            if ((values.propertyValue > 130000) && (values.propertyValue <= 440000))
		              duty = (2870*(1-0.5)) + 0.05 * (values.propertyValue-130000)*(1-0.5);


		            // $440k - $550k: ($18,370 plus 6 per cent of the dutiable value in excess of $440,000) less 50 per cent
		            if ((values.propertyValue > 440000) && (values.propertyValue <= 550000))
		              duty = (18370*(1-0.5)) + 0.06 * (values.propertyValue-440000)*(1-0.5);

		            // $550k - $600k: ($28,070 plus 6 per cent of the dutiable value in excess of $550,000) less 50 per cent
		            if ((values.propertyValue > 550000) && (values.propertyValue <= 600000))
		              duty = (28070*(1-0.5)) + 0.06 * (values.propertyValue-550000)*(1-0.5);

		        }

		        // Transfer Fee
		        //  (a) Paper Transaction Fee: the sum of $92.70 plus $2.34 for every whole consideration, the maximum fee is $3,603
		        transferFeeValue = 92.70 + (2.34 * (values.propertyValue / 1000));
		        if (transferFeeValue > 3603) transferFeeValue = 3603;

		        stampDutyValue = duty;
		        registrationFeeValue = 112.60;

		    break;

		    //
		    // WA: http://www.finance.wa.gov.au/cms/content.aspx?id=2071
		    //
		    case "WA":

		        message = "N/A";


		        // Up to $120k: $1.90 Per $100 or part thereof
		        if (values.propertyValue <= 120000)
		            duty = Math.ceil((values.propertyValue / 100)) * 1.9;

		        // $120k - $150k: $2,280 + $2.85 Per $100 or part thereof above $120,000
		        if ((values.propertyValue > 120000) && (values.propertyValue <= 150000))
		            duty = 2280 + Math.ceil(((values.propertyValue - 120000) / 100)) * 2.85;

		        // $150k - $360k: $3,135 + $3.80 Per $100 or part thereof above $150,000
		        if ((values.propertyValue > 150000) && (values.propertyValue <= 360000))
		            duty = 3135 + Math.ceil(((values.propertyValue - 150000) / 100)) * 3.8;

		        // $360k - $725k: $11,115 + $4.75 Per $100 or part thereof above $360,000
		        if ((values.propertyValue > 360000) && (values.propertyValue <= 725000))
		            duty = 11115 + Math.ceil(((values.propertyValue - 360000) / 100)) * 4.75;

		        // $725k plus: $28,453 + $5.15 Per $100 or part thereof above $725,000
		        if(values.propertyValue > 725000)
		              duty = 28453 + Math.ceil(((values.propertyValue - 725000) / 100)) * 5.15;

		        //
		        // First Home Buyer
		        //
		        if (values.firstHome === '1' && values.propertyTypeOne == "primary") {
		            // Up to $430k: Exempt
		            if (values.propertyValue <= 430000)
		                duty = 0;

		            // $430k - $530k: $19.19 per $100 or part of $100 above $430,000
		            if (values.propertyValue > 430000 && values.propertyValue <= 530000)
		                duty = Math.ceil((values.propertyValue - 430000) / 100) * 19.19;
		        }

		        //
		        // First Home Buyer - Vacant Land
		        //
		        if(values.firstHome === '1' && values.propertyTypeOne == 'primary' && values.propertyTypeTwo == 'vacant') {
		            // Up to $300k: Exempt
		            if (values.propertyValue <= 300000)
		                duty = 0;

		            // $300k - $400k: $13.01 per $100 or part of $100 above $300,000
		            if (values.propertyValue > 300000 && values.propertyValue <= 400000)
		                duty = Math.ceil((values.propertyValue - 300000) / 100) * 13.01;
		        }

		        //
		        // Transfer Fee
		        //
		        if (values.propertyValue <= 85000)
		            transferFeeValue = 165.80;

		        if ((values.propertyValue > 85000) && (values.propertyValue <= 120000))
		            transferFeeValue = 175.80;

		        if ((values.propertyValue > 120000) && (values.propertyValue <= 200000))
		            transferFeeValue = 195.80;

		        if ((values.propertyValue > 200000) && (values.propertyValue <= 300000))
		            transferFeeValue = 215.80;

		        if ((values.propertyValue > 300000) && (values.propertyValue <= 400000))
		            transferFeeValue = 235.80;

		        if ((values.propertyValue > 400000) && (values.propertyValue <= 500000))
		            transferFeeValue = 255.80;

		        if ((values.propertyValue > 500000) && (values.propertyValue <= 600000))
		            transferFeeValue = 275.80;

		        if ((values.propertyValue > 600000) && (values.propertyValue <= 700000))
		            transferFeeValue = 295.80;

		        if ((values.propertyValue > 700000) && (values.propertyValue <= 800000))
		            transferFeeValue = 315.80;

		        if ((values.propertyValue > 800000) && (values.propertyValue <= 900000))
		            transferFeeValue = 335.80;

		        if ((values.propertyValue > 900000) && (values.propertyValue <= 1000000))
		            transferFeeValue = 355.80;

		        if ((values.propertyValue > 1000000) && (values.propertyValue <= 1100000))
		            transferFeeValue = 375.80;

		        if ((values.propertyValue > 1100000) && (values.propertyValue <= 1200000))
		            transferFeeValue = 395.80;

		        if ((values.propertyValue > 1200000) && (values.propertyValue <= 1300000))
		            transferFeeValue = 415.80;

		        if ((values.propertyValue > 1300000) && (values.propertyValue <= 1400000))
		            transferFeeValue = 435.80;

		        if ((values.propertyValue > 1400000) && (values.propertyValue <= 1500000))
		            transferFeeValue = 455.80;

		        if ((values.propertyValue > 1500000) && (values.propertyValue <= 1600000))
		            transferFeeValue = 475.80;

		        if ((values.propertyValue > 1600000) && (values.propertyValue <= 1700000))
		            transferFeeValue = 495.80;

		        if ((values.propertyValue > 1700000) && (values.propertyValue <= 1800000))
		            transferFeeValue = 515.80;

		        if ((values.propertyValue > 1800000) && (values.propertyValue <= 1900000))
		            transferFeeValue = 535.80;

		        if ((values.propertyValue > 1900000) && (values.propertyValue <= 2000000))
		            transferFeeValue = 555.80;

		        if (values.propertyValue > 2000000)
		            transferFeeValue = 555.80 + Math.ceil((values.propertyValue - 2000000) / 100000) * 20;

		        stampDutyValue = duty;
		        registrationFeeValue = 165.80;

		    break;
		}

		stampDutyValue = Math.round(stampDutyValue * 100) / 100;
		let total = Math.round(registrationFeeValue + transferFeeValue + stampDutyValue);

		registrationFeeValue = Math.ceil(registrationFeeValue);
		transferFeeValue = Math.ceil(transferFeeValue);

		return {
			registrationFeeValue,
			transferFeeValue,
			stampDutyValue,
			total
		};
	}
}
