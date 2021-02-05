import { expect, assert } from 'chai';
import Tranxactor from '../app/common/Tranxactor';
import chalk from 'chalk';
import data from '../app/common/stub.json';
import sinon from 'sinon';
import moxios from 'moxios';
import Config from '../app/config';
import 'babel-polyfill';
// import Home from './Home';

// Destructure common funcs
const { initTest,
		getToken,
		getUserDetails,
		updateUserDetails,
		updateUserPassword,
		fetchResetToken
} = Tranxactor;

describe(chalk.yellow('Account functionality'), () => {
	this.setTimeout = 100000;
	describe(chalk.magenta('Tranxactor.js functions'), () => {
		describe('initTest()', () => {
			it('should be a function', () => {
				assert.isFunction(initTest);
			});

			it('should return a string', () => {
				const value = initTest();
				assert.typeOf(value, 'string');
			});
		});

		describe('getToken()', () => {
			describe('handles success codes', () => {
				// beforeEach(function () {
				// 	moxios.install();
				// });

				// afterEach(function () {
				// 	moxios.uninstall();
				// });

				it('recieves a 200 request', () => {
					// moxios.wait(() => {
					// const request = moxios.requests.mostRecent();
					// 	request.respondWith({
					// 		status: 200,
					// 		response: data.get_token['200']
					// 	});
					// });

					return getToken({
						username: Config.username,
						password: Config.password
					}).then(res => {
						console.log(res);
						expect(res.status).to.equal(200);
						expect(res.data).to.include.all.keys('userId', 'userName', 'token', 'masterToken');
					});
				});

				it('handles a 200 request');
			});

			describe('handles error codes', () => {
				beforeEach(function () {
					moxios.install();
				});

				afterEach(function () {
					moxios.uninstall();
				});

				it('recieves an error 400 request', () => {
					moxios.wait(() => {
					const request = moxios.requests.mostRecent();
						request.respondWith({
							status: 400,
							response: data.get_token['400']
						});
					});

					return getToken().then(res => {
						expect(res.response.status).to.equal(400);
						expect(res.response.data).to.include.all.keys('httpStatusCode', 'errorMessage', 'developerErrorMessage', 'errorMessage', 'moreInfo');
						expect(res.response.data.httpStatusCode).to.equal('400');
					});
				});

				it('handles a 400 request');

				it('recieves an error 404 request', () => {
					moxios.wait(() => {
					const request = moxios.requests.mostRecent();
						request.respondWith({
							status: 404,
							response: data.get_token['404']
						});
					});

					return getToken().then(res => {
						expect(res.response.status).to.equal(404);
						expect(res.response.data).to.include.all.keys('httpStatusCode', 'errorMessage', 'developerErrorMessage', 'errorMessage', 'moreInfo');
						expect(res.response.data.httpStatusCode).to.equal('404');
					});
				});

				it('handles a 404 request');
			});
		});
	});

	describe(chalk.magenta('ACC02: Allow progressive profile creation'), () => {
		describe('must be able to progressively add non-critical information to their profile', () => {
			// REF another test that updates User detail
			// it('successfully PATCH request new non-critical information');
		});
	});

	describe(chalk.magenta('ACC03: Update account personal details'), () => {
		describe('Users must be able to update their personal details (name, phone etc.)', () => {
			// REF another test that updates User detail
			// it('successfully PATCH request new personal information');
		});
	});

	describe(chalk.magenta('ACC04: Update key contact details'), () => {
		describe('Users should be able to update their email address and mobile number.', () => {
			// REF another test that updates User detail
			// it('successfully PATCH request their email/phone number');
		});
	});

	describe(chalk.magenta('ACC05: Reset password'), () => {
		describe('Users must be able to change their password.', () => {
			let token;
			beforeEach(function () {
				moxios.install();

				/**
				 * Fetch a reset token
				 */
				moxios.wait(() => {
					const request = moxios.requests.mostRecent();
					request.respondWith({
						status: 200,
						response: data.fetch_reset_token['200']
					});
				});

				return fetchResetToken({
					emailAddress: 'myemail@example.com'
				}).then(res => {
					token = res.data.resetTokenId;
				});
			});

			afterEach(function () {
				moxios.uninstall();
			});

			it('successful POST request to fetch a token update', () => {
				expect(token).to.be.a('string');
			});

			it('successful PUT request to update the password', () => {
				moxios.wait(() => {
					const request = moxios.requests.mostRecent();
					request.respondWith({
						status: 200,
						response: data.update_user_password['200']
					});
				});

				return updateUserDetails(token, {
					emailAddress: 'myemail@example.com',
					password: '1231234'
				}).then(res => {
					expect(res.data.message).to.equal('Success');
				});
			});
		});
	});

	describe(chalk.magenta('ACC07: Delete account'), () => {
		describe('Users should be able to delete their loyalty account.', () => {
			// Transactor TODO
			// it('successfully DELETE removes an account');
		});
	});

	describe(chalk.magenta('ACC08: Allow account verification via email and SMS.'), () => {
		describe('Allow users to verify their account via email or SMS.', () => {
			// it('sends a verification email');
			// it('verifies the email');
			// it('sends a verification SMS');
			// it('verifies the SMS');
		});
	});

	describe(chalk.magenta('ACC09: Allow app users to stay logged in'), () => {
		describe('The mobile apps should remember a user and not force them to login each time the app is launched.', () => {
			// it('stores the user session app state');
		});
	});

	describe(chalk.magenta('ACC10: Allow web users to remember login'), () => {
		describe('The website should ask users if they wish to remain logged in after the browser is closed. This will reduce the risk of their account being accessed on a public or shared computer.', () => {
			// it('stores the user session web state');
		});
	});

	describe(chalk.magenta('ACC11: Allow users to update their contact preferences'), () => {
		describe('Allow users to update their Marketing Cloud contact preferences.', () => {
			beforeEach(function () {
				moxios.install();
			});

			afterEach(function () {
				moxios.uninstall();
			});

			/**
			 * Attempt to getUserDetails() and updateUserDetails()
			 * with a proxy to validate the data manipulation
			 */
			it('successfully PUT requests Marketing Cloud contact preferences', () => {
				moxios.wait(() => {
				const request = moxios.requests.mostRecent();
					request.respondWith({
						status: 200,
						response: data.get_user_details['200']
					});
				});

				return getUserDetails('id').then(res => {
					let updates = new Proxy(res.data, Tranxactor.userDetailsProxy);
					updates.firstName = 'Bill';
					expect(updates.firstName).to.equal('Bill');

					moxios.wait(() => {
						const request = moxios.requests.mostRecent();
						request.respondWith({
							status: 200,
							response: data.update_user_details['200']
						});
					});

					return updateUserDetails(updates.id, updates).then(res => {
						expect(updates.firstName).to.equal('Bill');
					});
				});
			});
		});
	});

	describe(chalk.magenta('ACC12: Allow users to update their host store'), () => {
		describe('Allow users to update their host store.', () => {
			// it('successfully PATCH updates the preference store');
		});
	});

	describe(chalk.magenta('ACC15: Use an intelligent address field'), () => {
		describe('Use Google Places autocomplete API to improve accuracy and ease-of-input of address data.', () => {
			// it('autocompletes suggestions');
		});
	});

	describe(chalk.magenta('ACC16: Handle re-authentication'), () => {
		describe('If the user changes details which require them to re-authenticate ensure this process is straightforward.', () => {
			// it('re-auths user after a successful change of password');
		});
	});
});
