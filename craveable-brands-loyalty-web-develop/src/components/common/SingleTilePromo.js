import React, { Component } from 'react';
import { Link } from 'react-router';
import { updateSelectedItem } from 'components/offers/OffersReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {};
};

class SingleTilePromo extends Component {

	constructor(props) {
		super(props);
		this.handlePress = this.handlePress.bind(this);
	}

	handlePress(e) {
		e.preventDefault();
		const slug = "/promotion/" + this.props.title.replace(/\s+/g, '-').toLowerCase();

		this.props.updateSelectedItem({
			slug: slug,
			title: this.props.title,
			terms: this.props.terms,
			description: this.props.description,
			image: this.props.image
		});

		this.props.router.push(slug);
	}

	render() {
		const { title, key, image } = this.props;
		const slug = "/promotion/" + title.replace(/\s+/g, '-').toLowerCase();

		return (
			<Link to={slug} onClick={this.handlePress} key={key} className="tile">
					<div className='tile-container'>
						<div className='tile-image-container'>
							{ image ? <img src={image} alt="" /> : <img src="https://firebasestorage.googleapis.com/v0/b/cb-loyalty-oporto.appspot.com/o/promotions%2Fimages%2FOG_Bondi_bg.1.jpg?alt=media&token=354ba052-6a4b-4934-86d2-e35d3fd0b2f2" alt="" /> }
						</div>
						<div className="title-overlay">
							<h4>{ title }</h4>
						</div>
					</div>
			</Link>
		);
	}
}

export default connect(mapStateToProps, {
	updateSelectedItem
})(SingleTilePromo);