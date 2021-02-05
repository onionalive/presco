import React, { Component } from 'react';
import { BaseUrl } from './../../libs/baseUrl';

export default class ErrorPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const baseUrl = BaseUrl();

		return (
			<section className='error-404'>
				<div className='error-box'>
					<div className='message'>
						<h2>4
							<span>
								<div className="logo"></div>
							</span>4
						</h2>
					</div>
					<h3>Page not found</h3>
					<a className='button' href={`${baseUrl}`}>Go back home</a>
				</div>
			</section>
		);
	}
}
