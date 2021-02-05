import React, { Component } from 'react';
import { Link } from 'react-router';
import { updateSelectedItem } from 'components/offers/OffersReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {};
};

class SingleTileOffer extends Component {

	constructor(props) {
		super(props);
		this.handlePress = this.handlePress.bind(this);
	}

	// TODO: image, description, terms props needs to be added
	// currently not available via Tranxactor
	handlePress(e) {
		e.preventDefault();
		const slug = "/offer/" + this.props.id;

		this.props.updateSelectedItem({
			slug: "/offer/" + this.props.id,
			title: this.props.title,
			dateStart: this.props.dateStart,
			dateEnd: this.props.dateEnd,
			type: this.props.type
		});

		this.props.router.push(slug);
	}

	renderNotches() {
		return (
			<div>
				<div className="notch-left"></div>
				<div className="notch-right"></div>
			</div>
		);
	}

	render() {
		const { notch, title, id, image } = this.props;
		const slug = "/offer/" + id;

		return (
			<Link to={slug} onClick={this.handlePress} className="tile">
					<div className='rounded-edges tile-container'>
						<div className='rounded-edges tile-image-container'>
							{ image ? <img src={image} alt="" /> : <img src="https://firebasestorage.googleapis.com/v0/b/cb-loyalty-oporto.appspot.com/o/promotions%2Fimages%2FOG_Bondi_bg.1.jpg?alt=media&token=354ba052-6a4b-4934-86d2-e35d3fd0b2f2" alt="" /> }
						</div>
						<div className="title-overlay">
							<h4>{ title }</h4>
							{ notch ? this.renderNotches() : null }
						</div>
					</div>
			</Link>
		);
	}
}

export default connect(mapStateToProps, {
	updateSelectedItem
})(SingleTileOffer);