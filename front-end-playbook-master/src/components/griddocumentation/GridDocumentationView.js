import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */
import Documentation from '../documentation/Documentation';
import Grid from '../grid/Grid';
import Item from '../item/Item';

class GridDocumentation extends Component {
	render() {
		return (
			<div>
				<Documentation type="notes">
					<h2>@include grid-container(3) - 12 col container</h2>
				</Documentation>
				<div style={{ textAlign: 'center' }}>
					<Grid>
						<Item styling="-three bg-blue" />
						<Item styling="-three bg-green" />
						<Item styling="-three bg-blue" />
						<Item styling="-three bg-green" />
						<Item styling="-three bg-blue" />
						<Item styling="-three bg-green" />
						<Item styling="-three bg-blue" />
						<Item styling="-three bg-green" />
					</Grid>
				</div>
				<Documentation type="notes">
					<h2>@include grid-container(4) - 12 col container</h2>
				</Documentation>
				<div style={{ textAlign: 'center' }}>
					<Grid>
						<Item styling="-four bg-blue" />
						<Item styling="-four bg-green" />
						<Item styling="-four bg-blue" />
						<Item styling="-four bg-green" />
						<Item styling="-four bg-blue" />
						<Item styling="-four bg-green" />
						<Item styling="-four bg-blue" />
						<Item styling="-four bg-green" />
					</Grid>
				</div>
				<Documentation type="notes">
					<h2>@include grid-container(6) - 12 col container</h2>
				</Documentation>
				<div style={{ textAlign: 'center' }}>
					<Grid>
						<Item styling="-six bg-blue" />
						<Item styling="-six bg-green" />
						<Item styling="-six bg-blue" />
						<Item styling="-six bg-green" />
						<Item styling="-six bg-blue" />
						<Item styling="-six bg-green" />
						<Item styling="-six bg-blue" />
						<Item styling="-six bg-green" />
					</Grid>
				</div>
				<Documentation type="notes">
					<h2>@include grid-container(12) - 12 col container</h2>
				</Documentation>
				<div style={{ textAlign: 'center' }}>
					<Grid>
						<Item styling="-twelve bg-blue" />
						<Item styling="-twelve bg-green" />
						<Item styling="-twelve bg-blue" />
						<Item styling="-twelve bg-green" />
					</Grid>
				</div>
				<Documentation type="notes">
					<h2>@include grid-container(5)/@include grid-container(7) - 12 col container</h2>
				</Documentation>
				<div style={{ textAlign: 'center' }}>
					<Grid>
						<Item styling="-five bg-blue" />
						<Item styling="-seven bg-green" />
						<Item styling="-seven bg-blue" />
						<Item styling="-five bg-green" />
					</Grid>
				</div>
				<div>
					<Documentation type="notes">
						<h2>.e-hover-raised .animate</h2>
					</Documentation>
					<div style={{ textAlign: 'center' }}>
						<Grid>
							<Item styling="-five bg-blue e-hover-raised animate" />
							<Item styling="-seven bg-green e-hover-raised animate" />
							<Item styling="-seven bg-blue e-hover-raised animate" />
							<Item styling="-five bg-green e-hover-raised animate" />
						</Grid>
					</div>
					<Documentation type="notes">
						<h2>.e-hover-floating .animate</h2>
					</Documentation>
					<div style={{ textAlign: 'center' }}>
						<Grid>
							<Item styling="-five bg-blue e-hover-floating animate" />
							<Item styling="-seven bg-green e-hover-floating animate" />
							<Item styling="-seven bg-blue e-hover-floating animate" />
							<Item styling="-five bg-green e-hover-floating animate" />
						</Grid>
					</div>
				</div>
			</div>
		);
	}
}

GridDocumentation.propTypes = {
	example: PropTypes.string
}

export default GridDocumentation;
