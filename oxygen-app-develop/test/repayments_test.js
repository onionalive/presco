import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Repayments from '../src/helpers/repayments';

let terms = [
  {
    period: 15,
    repaymentAmount: 1977
  },
  {
    period: 20,
    repaymentAmount: 1650
  },
  {
    period: 25,
    repaymentAmount: 1461
  },
  {
    period: 30,
    repaymentAmount: 1342
  },
];

for (let term of terms) {
  describe(`Repayments function call for ${term.period} years with repaymentType 'principalInterest' and 5.00% interest`, () => {

    it(`should have the correct repayments for ${term.period} years`, () => {
      let values = {
        loanAmount: 250000,
        loanTerm: term.period,
        loanInterestRate: 500,
        repaymentFrequency: 'monthly',
        repaymentType: "principalInterest",
        extraRepaymentStart: 0,
        lumpSumStart: 0,
        introTerm: 0
      };

      let results = Repayments.repaymentFrequency(values);
      expect(results.repaymentAmount).to.equal(term.repaymentAmount);
    });
  });
}

terms = [
  {
    period: 15,
    repaymentAmount: 1042
  },
  {
    period: 20,
    repaymentAmount: 1042
  },
  {
    period: 25,
    repaymentAmount: 1042
  },
  {
    period: 30,
    repaymentAmount: 1042
  },
];

for (let term of terms) {
  describe(`Repayments function call for ${term.period} years with repaymentType 'interest' and 5.00% interest`, () => {

    it(`should have the correct repayments for ${term.period} years`, () => {
      let values = {
        loanAmount: 250000,
        loanTerm: term.period,
        loanInterestRate: 500,
        repaymentFrequency: 'monthly',
        repaymentType: "interest",
        extraRepaymentStart: 0,
        lumpSumStart: 0,
        introTerm: 0
      };

      let results = Repayments.repaymentFrequency(values);
      expect(results.repaymentAmount).to.equal(term.repaymentAmount);
    });
  });
}

terms = [
  {
    period: 15,
    repaymentAmount: 333,
    loanAmount: 200000
  },
  {
    period: 20,
    repaymentAmount: 167,
    loanAmount: 100000
  },
  {
    period: 25,
    repaymentAmount: 250,
    loanAmount: 150000
  },
  {
    period: 30,
    repaymentAmount: 83,
    loanAmount: 50000
  },
];

for (let term of terms) {
  describe(`Repayments function call for ${term.period} years and ${term.loanAmount} dollars with repaymentType 'interest' and 2.00% interest`, () => {

    it(`should have the correct repayments for ${term.period} years`, () => {
      let values = {
        loanAmount: term.loanAmount,
        loanTerm: term.period,
        loanInterestRate: 200,
        repaymentFrequency: 'monthly',
        repaymentType: "interest",
        extraRepaymentStart: 0,
        lumpSumStart: 0,
        introTerm: 0
      };

      let results = Repayments.repaymentFrequency(values);
      expect(results.repaymentAmount).to.equal(term.repaymentAmount);
    });
  });
}

terms = [
  {
    period: 15,
    repaymentAmount: 1287,
    loanAmount: 200000,
    repaymentType: 'principalInterest',
    frequency: 'monthly',
    interest: 200
  },
  {
    period: 20,
    repaymentAmount: 386,
    loanAmount: 100000,
    repaymentType: 'principalInterest',
    frequency: 'fortnightly',
    interest: 800
  },
  {
    period: 25,
    repaymentAmount: 183,
    loanAmount: 150000,
    repaymentType: 'principalInterest',
    frequency: 'weekly',
    interest: 400
  },
  {
    period: 20,
    repaymentAmount: 24,
    loanAmount: 50000,
    repaymentType: 'interest',
    frequency: 'weekly',
    interest: 250
  },
];

for (let term of terms) {
  describe(`Repayments function call for ${term.period} years, ${term.loanAmount} dollars, with repaymentType ${term.repaymentType}, frequency ${term.frequency} and ${term.interest / 100}% interest`, () => {

    it(`should have the correct repayments for ${term.period} years`, () => {
      let values = {
        loanAmount: term.loanAmount,
        loanTerm: term.period,
        loanInterestRate: term.interest,
        repaymentFrequency: term.frequency,
        repaymentType: term.repaymentType,
        extraRepaymentStart: 0,
        lumpSumStart: 0,
        introTerm: 0
      };

      let results = Repayments.repaymentFrequency(values);
      expect(results.repaymentAmount).to.equal(term.repaymentAmount);
    });
  });
}
