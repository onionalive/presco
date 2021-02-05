import { expect, assert } from 'chai';
import Tranxactor from '../app/common/Tranxactor';
import chalk from 'chalk';
import data from '../app/common/stub.json';
import sinon from 'sinon';
import moxios from 'moxios';
import 'babel-polyfill';

// Destructure common funcs
const { getTransactionList } = Tranxactor;

/**
 * Transactions
 */
describe(chalk.yellow('Transactions functionality'), () => {
	describe(chalk.magenta('TNR01: Display recent transactions'), () => {
		describe('Display recent loyalty transactions. Include information about date, store, money spent, points spent and points earned.', () => {
			describe('getTransactionList()', () => {
				describe('handles success codes', () => {
					beforeEach(function () {
						moxios.install();
					});

					afterEach(function () {
						moxios.uninstall();
					});

					it('recieves a 200 request', () => {
						moxios.wait(() => {
						const request = moxios.requests.mostRecent();
							request.respondWith({
								status: 200,
								response: data.get_transaction_list['200']
							});
						});

						return getTransactionList()
							.then(res => {
								expect(res.status).to.equal(200);
								expect(res.data._embedded).to.include.all.keys('transactions');
							});
					});

					it('handles a 200 request');
				});

				describe('handles error codes', () => {
					it('recieves an error 400 request');
					it('handles a 400 request');
					it('recieves an error 404 request');
					it('handles a 404 request');
				});
			});
		});
	});

	describe(chalk.magenta('TRN02: Load more transactions'), () => {
		describe('When the bottom of the loyalty transactions list is reached load in more transactions.', () => {

		});
	});
});