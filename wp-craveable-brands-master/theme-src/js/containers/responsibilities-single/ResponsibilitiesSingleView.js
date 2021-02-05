import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BannerMod from './../../components/BannerMod';
import IntroMod from './../../components/IntroMod';
import Row from './../../components/Row';
import ImageCarouselMod from './../../components/ImageCarouselMod';
import DownloadCarouselMod from './../../components/DownloadCarouselMod';
import BackButtonMod from './../../components/BackButtonMod';
import { BaseUrl } from './../../libs/baseUrl';

export default class ResponsibilitiesSingle extends Component {
	constructor(props) {
		super(props);
		this.props.fetchPage(this.props.params.slug);
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
		const baseUrl = BaseUrl();

		return (
			<div
				className={this.props.routeParams.slug}
			>
				<BannerMod
					image={this.props.page.acf.banner[0].bannerImage.sizes.large}
					copy={this.props.page.acf.banner[0].bannerCopy}
				/>
				{this.props.routeParams.slug === 'our-food' && this.props.page.acf &&
					<div>
						<BackButtonMod
							backURL={ `${baseUrl}/responsibilities` }
							page={ 'responsibilities' }
						/>
						<IntroMod
							heading_quote={this.props.page.acf.introHeadingQuote}
							cite={this.props.page.acf.introCite}
							copy={this.props.page.acf.introCopy}
						/>
						<ImageCarouselMod
							images={this.props.page.acf.images}
						/>
					</div>
				}
				{this.props.routeParams.slug === 'our-communities' && this.props.page.acf &&
					<div>
						<BackButtonMod
							backURL={ `${baseUrl}/responsibilities` }
							page={ 'responsibilities' }
						/>
						<IntroMod
							heading_quote={this.props.page.acf.introHeadingQuote}
							cite={this.props.page.acf.introCite}
							copy={this.props.page.acf.introCopy}
						/>
						<DownloadCarouselMod
							title={this.props.page.acf.section_title}
							downloadItems={this.props.page.acf.download_items}
						/>
						{this.props.page.acf.rows.length > 0 &&
							<Row row={this.props.page.acf.rows[0]} />
						}
						{this.props.page.acf.rows.length > 1 &&
							<Row row={this.props.page.acf.rows[1]} />
						}
						{this.props.page.acf.rows.length > 2 &&
							<Row row={this.props.page.acf.rows[2]} />
						}
					</div>
				}
				{this.props.routeParams.slug === 'our-footprint' && this.props.page.acf &&
					<div>
						<BackButtonMod
							backURL={ `${baseUrl}/responsibilities` }
							page={ 'responsibilities' }
						/>
						<IntroMod
							heading_quote={this.props.page.acf.introHeadingQuote}
							cite={this.props.page.acf.introCite}
							copy={this.props.page.acf.introCopy}
						/>
					</div>
				}
				{this.props.routeParams.slug === 'our-people' && this.props.page.acf &&
					<div>
						<BackButtonMod
							backURL={ `${baseUrl}/responsibilities` }
							page={ 'responsibilities' }
						/>
						{this.props.page.acf.rows.length > 0 &&
							<Row row={this.props.page.acf.rows[0]} />
						}
						{this.props.page.acf.rows.length > 1 &&
							<Row row={this.props.page.acf.rows[1]} />
						}
						{this.props.page.acf.rows.length > 2 &&
							<Row row={this.props.page.acf.rows[2]} />
						}
						{this.props.page.acf.rows.length > 3 &&
							<Row row={this.props.page.acf.rows[3]} />
						}
						{this.props.page.acf.rows.length > 4 &&
							<Row row={this.props.page.acf.rows[4]} />
						}
						{this.props.page.acf.rows.length > 5 &&
							<Row row={this.props.page.acf.rows[5]} />
						}
						{this.props.page.acf.rows.length > 6 &&
							<Row row={this.props.page.acf.rows[6]} />
						}
						<ImageCarouselMod
							images={this.props.page.acf.images}
						/>
					</div>
				}
			</div>
		);
	}
}
