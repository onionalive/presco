import React, { Component } from 'react';
import slick from 'slick-carousel';

export default class DownloadCarouselMod extends Component {
	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		if ($('.carousel-download').length > 0) {
			$('.download-carousel').slick({
				infinite: false,
				arrows: false,
				variableWidth: true,
			});
		}
	}

	render() {
		let downloadItems = '';
		if (Object.keys(this.props.downloadItems).length !== 0) {
			downloadItems = Object.keys(this.props.downloadItems).map((index, key) => {
				let item = this.props.downloadItems[key];
				let fileType = '';
				let cleanLink = '';
				if (item.download) {
					const type = item.download.mime_type
					fileType = type.substr(type.lastIndexOf('/') + 1);
				}

				if (item.external_link) {
					cleanLink = item.external_link.replace('http://', '').replace('https://', '').replace('www.', '');
				}

				return (
					<div className='carousel-download' key={index} >
						<img src={item.image.url} alt="" />

							{item.internal_external === 'External' &&
								<a className='download-link' href={item.external_link} target='_blank' rel="noopener">
									<i className='fa fa-external-link download-icon' aria-hidden='true'></i>
									<p className='file-type'>Link</p>
								</a>
							}
							{item.internal_external === 'Download' &&
								<a className='download-link' href={item.download.url} download>
									<i className='fa fa-cloud-download download-icon' aria-hidden='true'></i>
									<p className='file-type'>{ fileType }</p>
								</a>
							}

							{item.internal_external === 'External' &&
								<p className='download-title'>{ cleanLink }</p>
							}
							{item.internal_external === 'Download' &&
								<p className='download-title'>{ item.download.title }</p>
							}
						<p className='date'>{ item.date }</p>
					</div>
				)
			});
		}

		return (
			<section className="download-carousel-mod">
				<div className="inner">
				<h1>{ this.props.title }</h1>
					<div className='download-carousel' >
						{ downloadItems }
					</div>
				</div>
			</section>
		);
	}
}
