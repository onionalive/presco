import React, { Component } from 'react';
// import PropTypes from 'prop-types';

/* user imports */

class Footer extends Component {
	render() {
		return (
			<footer>
				<div className="innerName">
					<nav>
						<ul>
							<li>
								<a href="/#our-brands">Link 1</a>
							</li>
							<li>
								<a href="/#franchising">Link 2</a>
							</li>
							<li>
								<a href="/#careers">Link 3</a>
							</li>
							<li>
								<a href="/#in-the-media">Link 4</a>
							</li>
							<li>
								<a href="/#contact-us">Link 5</a>
							</li>
						</ul>
					</nav>
				</div>
			</footer>
		);
	}
}

// Footer.propTypes = {
// 	example: PropTypes.string
// }

export default Footer;
