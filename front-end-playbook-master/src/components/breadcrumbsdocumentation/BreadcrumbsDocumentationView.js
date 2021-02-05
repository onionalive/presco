import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */
import Documentation from '../documentation/Documentation';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import Breadcrumb from '../breadcrumb/Breadcrumb';

const react = `<Breadcrumbs>
	<Breadcrumb url="#" label="Parent" />
	<Breadcrumb url="#" label="Child" />
	<Breadcrumb label="Grandchild" />
</Breadcrumbs>`;

const html = `<div class="breadcrumbs">
	<span class="breadcrumb">
		<a href="#" class="item">Parent</a>
	</span>
	<span class="breadcrumb">
		<a href="#" class="item">Child</a>
	</span>
	<span class="breadcrumb">
		<span class="item">Grandchild</span>
	</span>
</div>`;

class BreadcrumbsDocumentation extends Component {
	render() {
		return (
			<div>
				<Documentation type='notes'>
					<h1>Breadcrumbs</h1>
					<p>Use breadcrumbs to show a pathway back to a parent link.</p>.
					<h2>Styling</h2>
					<p>The styling is setup such that the last-of-type for '.breadcrumb' will not render the after image. In React, there is a condition render to change the 'a' tag into a 'span' if no url property is provided.</p>
					<h2>Examples</h2>
				</Documentation>
				<Breadcrumbs>
					<Breadcrumb url="#" label="Parent" />
					<Breadcrumb url="#" label="Child" />
					<Breadcrumb label="Grandchild" />
				</Breadcrumbs>
				<Documentation type='html'>
					<pre>
						<code>{html}</code>
					</pre>
				</Documentation>
				<Documentation type='react'>
					<pre>
						<code>{react}</code>
					</pre>
				</Documentation>
			</div>
		);
	}
}

BreadcrumbsDocumentation.propTypes = {
	example: PropTypes.string
}

export default BreadcrumbsDocumentation;
