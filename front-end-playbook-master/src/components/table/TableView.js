import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */

class Table extends Component {
	render() {
		return (
			<table className="table" cellspacing="0" summary="Your selections">
				<tr>
					<td className="position">1st</td>
					<td id="confirm-first" className="selections">First Horse</td>
					<td className="odds">$0.00</td>
				</tr>
				<tr>
					<td className="position">2nd</td>
					<td id="confirm-second" className="selections">Second Horse</td>
					<td className="odds">$0.00</td>
				</tr>
				<tr>
					<td className="position">3rd</td>
					<td id="confirm-third" className="selections">Third Horse</td>
					<td className="odds">$0.00</td>
				</tr>
				<tr>
					<td className="position">4th</td>
					<td id="confirm-fourth" className="selections">Fourth Horse</td>
					<td className="odds">$0.00</td>
				</tr>
			</table>
		);
	}
}

Table.propTypes = {
	example: PropTypes.string
}

export default Table;
