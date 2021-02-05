import React from 'react';

export default class JobAdderMod extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		this.jaScript();
	}

	jaScript() {
		const ja_id = this.props.job_adder_id;
		const jaSettings = document.createElement("script");

		window._jaJobsSettings = {
			key: `${ja_id}`,
			jobListSettings: {
				readMoreText: "More >",
				noJobsContent: "Hmmmm. Looks like we don't have any opportunities in this team right now. Check back soon."
			},
			jobDetailsSettings: {
				backLinkText: "< Back to search results"
			},
			applicationFormSettings: {
				useExternalApplicationForm: true,
				showExternalApplicationFormInNewWindow: false
			}
		};
		jaSettings.append(_jaJobsSettings);
		const jaScript = document.createElement("script");
		jaScript.src = "//jobadder.com/widgets/v1/jobs.min.js";
		jaScript.async = true;
		document.body.appendChild(jaScript);
	}

	render() {
		return (
			<section className="jobadder-mod">
				<div className="inner">
					<div className="row">
						<div className="heading">
							<h2>Work here.</h2>
							<h3>See our latest {this.props.title} jobs</h3>
						</div>
						<div id="ja-jobs-widget"></div>
					</div>
				</div>
			</section>
		);
	}
}
