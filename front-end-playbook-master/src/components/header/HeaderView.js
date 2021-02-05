import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */

class Header extends Component {

	links() {
		const { data } = this.props;
		return data.map((entry, index) => (
			<a key={entry.key} href={entry.href} className="link">{entry.link}</a>
		));
	}

	render() {
		return (
			<header>
				<h1 className="title">Title</h1>
				<nav>
					<ul className="list">
						<li className="item">
							<a className="link" href="#">Item 1</a>
						</li>
						<li className="item">
							<a className="link" href="#">Item 2</a>
						</li>
						<li className="item">
							<a className="link" href="#">Item 3</a>
						</li>
						<li className="item">
							<a className="link" href="#">Item 4</a>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}

Header.propTypes = {
	example: PropTypes.object
}

export default Header;
