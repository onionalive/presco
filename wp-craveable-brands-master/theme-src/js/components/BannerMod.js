import React from 'react';

export default class BannerMod extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		this.imageFade();
	}

	imageFade() {
		var imgsrc = this.props.image;
		var $headerImage = $('.banner-div');
		var $dummyTintDiv = $('.dummy-tint-div');
		var $img = $('<img/>');
		$img.on('load', function () {
			$dummyTintDiv.css('visibility', 'visible').fadeIn( 1000 );
			$headerImage.css({
				'backgroundImage': `url('${ imgsrc }')`
			}).fadeIn( 1000 );
		}).attr('src', imgsrc);
	}

	render() {
		const ifHome = ($('.home').length);
		const copy = {__html: this.props.copy };
		let title = this.props.copy.trim();
		title = title.replace(/\s/g, ' <br>');
		title = title.replace(/<\/?p[^>]*>/g, '');

		return (
			<div>
				{ifHome ? (
					<section className='banner-mod -home'>
						<div className='banner-div'>
							<div className='dummy-tint-div'>
								<div className='inner'>
									<div className='banner-text' dangerouslySetInnerHTML={copy} />
								</div>
							</div>
						</div>
					</section>
				) : (
					<section className='banner-mod -pages'>
						<div className='banner-div' style={ {backgroundImage: `url(${ this.props.image })`} }>
							<div className='dummy-tint-div'>
								<div className='inner'>
									<h1 className='banner-text' dangerouslySetInnerHTML={{__html: title}}></h1>
								</div>
							</div>
						</div>
					</section>
				)}
			</div>
		);
	}
}
