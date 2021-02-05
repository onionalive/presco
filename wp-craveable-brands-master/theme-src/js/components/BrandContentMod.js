import React, { Component } from 'react';
import { BaseUrl } from './../libs/baseUrl';

export default class BrandContentMod extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let links = '';

		if (Object.keys(this.props.links).length !== 0) {
			links = Object.keys(this.props.links).map((index, key) => {
				let link = this.props.links[key];

				return (
					<div className='link-div' key={index}>
					<a href={`${link.url}`} className='links' target='_blank'>{link.title}</a>
					</div>
				)
			})
		}

		const baseUrl = BaseUrl();

		return (

			<section className='brand-content-mod'>
				<div className='inner'>
					<div className='row'>

						<div className='details-links -quarter'>
							<div className='details-links-container'>
								<img className='logo-restaurant' src={this.props.logo} alt={this.props.title} />
								<hr></hr>
								{ links }
							</div>
						</div>
						<div className='brand-content -half'>
							<p dangerouslySetInnerHTML={{__html: this.props.copy}}></p>
						</div>
						<div className='details-links -quarter ceo-div'>
							<div className='details-links-container ceo'>
								<a href={`${baseUrl}/leaders/${this.props.ceoSlug}`}>
									<img src={ this.props.ceoImage } alt='' />
								</a>

								<a href={`${baseUrl}/leaders/${this.props.ceoSlug}`}>
									<h3>{ this.props.ceoName }</h3>
								</a>
								<a href={`${baseUrl}/leaders/${this.props.ceoSlug}`}>
									<p className='ceo-title-text'>{ this.props.ceoTitle }</p>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
