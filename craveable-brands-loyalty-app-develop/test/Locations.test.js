import { expect, assert } from 'chai';
import { initTest } from '../app/common/Tranxactor';
import chalk from 'chalk';

/**
 * Locations
 */
describe(chalk.yellow('Locations functionality'), () => {
	describe(chalk.magenta('LOC01: Request location permission'), () => {
		describe('Ask user to enable location monitoring.', () => {

		});
	});

	describe(chalk.magenta('LOC02: Integrate Bluedot SDK'), () => {
		describe('Include Bluedot location tracking SDK.', () => {

		});
	});

	describe(chalk.magenta('LOC03: Display all stores on a map'), () => {
		describe('Display all stores on a Google map.', () => {

		});
	});

	describe(chalk.magenta('LOC04: Show closest stores'), () => {
		describe('Show stores closest to current user location.', () => {

		});
	});

	describe(chalk.magenta('LOC05: Find stores by location'), () => {
		describe('Allow users to search for a location to find nearby stores. Use Google’s address autocomplete library to increase ease-of-use.', () => {

		});
	});

	describe(chalk.magenta('LOC06: View store details'), () => {
		describe('View information about a chosen store (address, opening hours etc.).', () => {

		});
	});

	describe(chalk.magenta('LOC07: Retrieve store data dynamically'), () => {
		describe('Retrieve store data dynamically using an API.', () => {

		});
	});
});
