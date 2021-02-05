import React, { Component } from 'react';
import slick from 'slick-carousel';
import Lightbox from 'react-images';

export default class ImageCarouselMod extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		};
		this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
	}

	openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}

	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}

	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}

	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}

	gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}

	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}

	componentDidUpdate() {
	}

	componentDidMount() {
	}

	render() {
		let imageCarousel = '';
		let lightboxList = [];
		if (Object.keys(this.props.images).length !== 0) {
			imageCarousel = Object.keys(this.props.images).map((index, key) => {
				let image = this.props.images[key];
				lightboxList.push({
					src: image.image.url,
					thumbnail: image.image.url
				});
				return (
					<a
						href={image.image.url}
						key={key}
						onClick={(e) => this.openLightbox(key, e)}
					>
						<img src={image.image.url} alt={image.image.title} className="carousel-image" alt="" />
					</a>
				)
			});
		}

		return (
			<section className="image-carousel-mod">
				<div className="inner">
					<div className='image-carousel'>
						{ imageCarousel }
					</div>
					<div className='lightbox-div'>
						<Lightbox
							images={lightboxList}
							currentImage={this.state.currentImage}
							isOpen={this.state.lightboxIsOpen}
							onClickPrev={this.gotoPrevious}
							onClickNext={this.gotoNext}
							onClose={this.closeLightbox}
							onClickThumbnail={this.gotoImage}
							showThumbnails={ true }
						/>
					</div>
				</div>
			</section>
		);
	}
}
