import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import StampDuty from '../src/helpers/stampDuty';
import chalk from 'chalk';

const states = [
	{
		name: "NSW",
		registrationFeeValue: 137,
		transferFeeValue: 137,
		stampDutyValue: 7240,
		total: 7513
	},
	// Outdated
	// {
	// 	name: "ACT",
	// 	registrationFeeValue: 135,
	// 	transferFeeValue: 262,
	// 	stampDutyValue: 4000,
	// 	total: 4607
	// },
	{
		name: "NT",
		registrationFeeValue: 142,
		transferFeeValue: 142,
		stampDutyValue: 7857,
		total: 8141
	},
	{
		name: "QLD",
		registrationFeeValue: 175,
		transferFeeValue: 406,
		stampDutyValue: 2500,
		total: 3081
	},
	{
		name: "SA",
		registrationFeeValue: 157,
		transferFeeValue: 197768,
		stampDutyValue: 8955,
		total: 206880
	},
	{
		name: "TAS",
		registrationFeeValue: 14,
		transferFeeValue: 201,
		stampDutyValue: 7935,
		total: 8149
	},
	{
		name: "VIC",
		registrationFeeValue: 113,
		transferFeeValue: 678,
		stampDutyValue: 8870,
		total: 9660
	},
	{
		name: "WA",
		registrationFeeValue: 166,
		transferFeeValue: 216,
		stampDutyValue: 6935,
		total: 7317
	}
];

for (let state of states) {
	describe(`StampDuty calculations for primary residence of an existing building in ${state.name}`, () => {
		const results = StampDuty.stampDutyResults({
			propertyValue: 250000,
			stateValue: state.name,
			firstHome: state.firstHome,
			propertyTypeOne: 'primary',
			propertyTypeTwo: 'existing',
		});

		it(`should have the correct Registration Fee Value of ${state.registrationFeeValue}`, () => {
			expect(results.registrationFeeValue).to.equal(state.registrationFeeValue);
		});

		it(`should show the correct Transfer Fee Value ${state.transferFeeValue}`, () => {
			expect(results.transferFeeValue).to.equal(state.transferFeeValue);
		});

		it(`should show the correct Stamp Duty Value ${state.stampDutyValue}`, () => {
			expect(results.stampDutyValue).to.equal(state.stampDutyValue);
		});

		it(`should show the correct Total ${state.total}`, () => {
			expect(results.total).to.equal(state.total);
		});
	});
}

/*
	ACT Stamp Duty updates
 */

const act = [
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 20,
		total: 4607,
		propertyValue: 250000,
		propertyTypeTwo: 'new',
		firstHome: '1'
	},
	{
		name: "ACT",
		test: 'Vacant, stamp duty at 290000',
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 1148.40,
		total: 4607,
		propertyValue: 290000,
		propertyTypeTwo: 'vacant',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 20,
		total: 4607,
		propertyValue: 290000,
		propertyTypeTwo: 'new',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 652.50,
		total: 4607,
		propertyValue: 475000,
		propertyTypeTwo: 'new',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 6525,
		total: 4607,
		propertyValue: 520000,
		propertyTypeTwo: 'new',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 130.5,
		total: 4607,
		propertyValue: 471000,
		propertyTypeTwo: 'new',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 17748,
		total: 4607,
		propertyValue: 606000,
		propertyTypeTwo: 'new',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 522,
		total: 4607,
		propertyValue: 474000,
		propertyTypeTwo: 'new',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 247.95,
		total: 4607,
		propertyValue: 471900,
		propertyTypeTwo: 'new',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 26.1,
		total: 4607,
		propertyValue: 470200,
		propertyTypeTwo: 'new',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 261,
		total: 4607,
		propertyValue: 472000,
		propertyTypeTwo: 'new',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 313.20,
		total: 4607,
		propertyValue: 472400,
		propertyTypeTwo: 'new',
		firstHome: '1'
	},
	// borders for vacant costs
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 6340,
		total: 4607,
		propertyValue: 330000,
		propertyTypeTwo: 'vacant',
		firstHome: '1'
	},
	{
		name: "ACT",
		test: 'Test vacant address value',
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 20,
		total: 4607,
		propertyValue: 281200,
		propertyTypeTwo: 'vacant',
		firstHome: '1'
	},
	// vacant costs with differeing values
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 6237.9,
		total: 4607,
		propertyValue: 329000,
		propertyTypeTwo: 'vacant',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 1305,
		total: 4607,
		propertyValue: 291200,
		propertyTypeTwo: 'vacant',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 16146,
		total: 4607,
		propertyValue: 570000,
		propertyTypeTwo: 'vacant',
		firstHome: '1'
	},
	// testing new outside the range
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 16146,
		total: 4607,
		propertyValue: 570000,
		propertyTypeTwo: 'vacant',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 16146,
		total: 4607,
		propertyValue: 570000,
		propertyTypeTwo: 'vacant',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 20,
		total: 4607,
		propertyValue: 370000,
		propertyTypeTwo: 'new',
		firstHome: '1'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 7860,
		total: 4607,
		propertyValue: 370000,
		propertyTypeTwo: 'new',
		firstHome: '0'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 19014,
		total: 4607,
		propertyValue: 630000,
		propertyTypeTwo: 'new',
		firstHome: '0'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 37350,
		total: 4607,
		propertyValue: 950000,
		propertyTypeTwo: 'new',
		firstHome: '0'
	},
	{
		name: "ACT",
		registrationFeeValue: 135,
		transferFeeValue: 262,
		stampDutyValue: 47300,
		total: 4607,
		propertyValue: 1100000,
		propertyTypeTwo: 'new',
		firstHome: '0'
	}
];

for (let state of act) {
	describe(`StampDuty calculations for primary, first home owners in ${state.name}`, () => {
		const results = StampDuty.stampDutyResults({
			propertyValue: state.propertyValue,
			stateValue: state.name,
			firstHome: state.firstHome,
			propertyTypeOne: 'primary',
			propertyTypeTwo: state.propertyTypeTwo,
		});

		it(`should show the correct Stamp Duty Value ${state.stampDutyValue}`, () => {
			if (typeof state.test !== 'undefined') console.log(`\t${chalk.cyan(state.test)}`);
			expect(results.stampDutyValue).to.equal(state.stampDutyValue);
		});
	});
}

const vic = [
	{
		name: "VIC",
		test: "Return a value and no NaN values",
		propertyValue: 40000,
		propertyTypeOne: 'primary',
		propertyTypeTwo: 'existing',
		firstHome: '0'
	},
];

for (let state of vic) {
	describe(`Test NaN StampDuty for ${state.name}`, () => {
		const results = StampDuty.stampDutyResults({
			propertyValue: state.propertyValue,
			stateValue: state.name,
			firstHome: state.firstHome,
			propertyTypeOne: state.propertyTypeOne,
			propertyTypeTwo: state.propertyTypeTwo,
		});

		it(`should show the correct Stamp Duty Value ${state.stampDutyValue}`, () => {
			if (typeof state.test !== 'undefined') console.log(`\t${chalk.cyan(state.test)}`);

			expect(isNaN(results.registrationFeeValue)).to.equal(false);
			expect(isNaN(results.transferFeeValue)).to.equal(false);
			expect(isNaN(results.total)).to.equal(false);
			expect(isNaN(results.stampDutyValue)).to.equal(false);

		});
	});
}
