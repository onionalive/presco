import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Borrow from '../src/helpers/borrow';

let terms = [
	{
		dependents: 0,
		applicationType: 'single',
		annualIncomeValue: 75000,
		otherIncomeValue: 19000,
		interestRate: 500,
		loanTerm: 30,
		expectedBorrowUpTo: 750937,
		expectedMonthlyRepayments: 4031.19,
		expectedMonthlyRepaymentsBuffered: 4746.43
	},
	{
		dependents: 0,
		applicationType: 'joint',
		annualIncomeValue: 120000,
		otherIncomeValue: 19000,
		interestRate: 500,
		loanTerm: 30,
		expectedBorrowUpTo: 2608545,
		expectedMonthlyRepayments: 14003.23,
		expectedMonthlyRepaymentsBuffered: 16487.78
	},
	{
		dependents: 2,
		applicationType: 'joint',
		annualIncomeValue: 75000,
		otherIncomeValue: 19000,
		interestRate: 500,
		loanTerm: 30,
		expectedBorrowUpTo: 1480866,
		expectedMonthlyRepayments: 7949.61,
		expectedMonthlyRepaymentsBuffered: 9360.08
	},
	{
		dependents: 4,
		applicationType: 'single',
		annualIncomeValue: 75000,
		otherIncomeValue: 19000,
		interestRate: 200,
		loanTerm: 15,
		expectedBorrowUpTo: 381208,
		expectedMonthlyRepayments: 2453.11,
		expectedMonthlyRepaymentsBuffered: 2725.19
	}
];

for (let term of terms) {
	describe(`Borrow.calculateResults() should return correct values for`, () => {

		let values = {
			interestRate: term.interestRate,
			dependents: term.dependents,
			applicationType: term.applicationType,
			annualIncomeValue: term.annualIncomeValue,
			otherIncomeValue: term.otherIncomeValue,
			loanTerm: term.loanTerm,
			estimateExpenses: true
		};

		it(`interestRate: ${term.interestRate}, dependents: ${term.dependents}, applicationType: ${term.applicationType}, annualIncomeValue: ${term.annualIncomeValue}, otherIncomeValue: ${term.otherIncomeValue}, loanTerm: ${term.loanTerm}`, () => {
			let results = Borrow.calculateResults(values);
			expect(results.borrowUpTo).to.equal(term.expectedBorrowUpTo);
			expect(results.monthlyRepayments).to.equal(term.expectedMonthlyRepayments);
			expect(results.monthlyRepaymentsBuffered).to.equal(term.expectedMonthlyRepaymentsBuffered);
		});
	});
}

terms = [
	{
		dependents: 0,
		applicationType: 'single',
		annualIncomeValue: 75000,
		otherIncomeValue: 19000,
		interestRate: 500,
		loanTerm: 30,
		personalExpenses: 1410,
		creditCardRepayments: 350,
		otherMonthlyRepayments: 900,
		expectedBorrowUpTo: 608558,
		expectedMonthlyRepayments: 3266.87,
		expectedMonthlyRepaymentsBuffered: 3846.50
	},
	{
		dependents: 3,
		applicationType: 'joint',
		annualIncomeValue: 95000,
		otherIncomeValue: 19000,
		interestRate: 450,
		loanTerm: 25,
		personalExpenses: 2500,
		creditCardRepayments: 350,
		otherMonthlyRepayments: 1200,
		expectedBorrowUpTo: 1775865,
		expectedMonthlyRepayments: 9870.83,
		expectedMonthlyRepaymentsBuffered: 11441.92

	},
	{
		dependents: 2,
		applicationType: 'joint',
		annualIncomeValue: 220000,
		otherIncomeValue: 19000,
		interestRate: 700,
		loanTerm: 30,
		personalExpenses: 2500,
		creditCardRepayments: 350,
		otherMonthlyRepayments: 1200,
		expectedBorrowUpTo: 3661585,
		expectedMonthlyRepayments: 24360.62,
		expectedMonthlyRepaymentsBuffered: 28154.42
	},
	{
		dependents: 4,
		applicationType: 'single',
		annualIncomeValue: 75000,
		otherIncomeValue: 19000,
		interestRate: 500,
		loanTerm: 30,
		personalExpenses: 1990,
		creditCardRepayments: 350,
		otherMonthlyRepayments: 1200,
		expectedBorrowUpTo: 469332,
		expectedMonthlyRepayments: 2519.48,
		expectedMonthlyRepaymentsBuffered: 2966.50,
	}
];

for (let term of terms) {
	describe(`Borrow.calculateResults() with manual expenses added should return correct values for`, () => {

		let values = {
			interestRate: term.interestRate,
			dependents: term.dependents,
			applicationType: term.applicationType,
			annualIncomeValue: term.annualIncomeValue,
			otherIncomeValue: term.otherIncomeValue,
			loanTerm: term.loanTerm,
			personalExpenses: term.personalExpenses,
			creditCardRepayments: term.creditCardRepayments,
			otherMonthlyRepayments: term.otherMonthlyRepayments,
			estimateExpenses: false
		};

		it(`interestRate: ${term.interestRate}, dependents: ${term.dependents}, applicationType: ${term.applicationType}, annualIncomeValue: ${term.annualIncomeValue}, otherIncomeValue: ${term.otherIncomeValue}, loanTerm: ${term.loanTerm}`, () => {
			let results = Borrow.calculateResults(values);
			expect(results.borrowUpTo).to.equal(term.expectedBorrowUpTo);
			expect(results.monthlyRepayments).to.equal(term.expectedMonthlyRepayments);
			expect(results.monthlyRepaymentsBuffered).to.equal(term.expectedMonthlyRepaymentsBuffered);
		});
	});
}