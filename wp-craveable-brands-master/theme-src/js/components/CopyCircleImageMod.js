import React, { Component } from 'react';

export default class CopyCircleImageMod extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let items = '';
		if (Object.keys(this.props.circles).length !== 0) {
			items = Object.keys(this.props.circles).map((index, key) => {
				let item = this.props.circles[key];

				return (
					<div key={index} className="circle-item">
						<img src={item.image.url} alt="" />
						<p>{ item.brand }</p>
						<button><a className='cta' href={item.link} >
							{ item.cta }
						</a></button>
					</div>
				)
			});
		}

		return (
			<section className="copy-circle-image-mod">
				<div className="inner">
				<div className="heading">
					<h1>Healthy Food Partnership</h1>
					<div className="hfp-image"></div>
				</div>
					<div className='circle-items' >
						{ items }
					</div>
				</div>
			</section>
		);
	}
}
