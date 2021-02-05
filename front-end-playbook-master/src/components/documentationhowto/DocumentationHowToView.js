import React, { Component } from 'react';

/* user imports */
import Documentation from '../documentation/Documentation';

const scss = `.example {
	display: flex;
	align-items: center;
	justify-content: center;

	.child {
		display: inline;
	}
}`;

const code = `<div class="example">
	<p>Hello world</p>
</div>`;

const react = `<div className="example">
	<p>Hello world</p>
</div>`;

const reactNative = `<View className="example">
	<Text>Hello world</Text>
</View>`;

class DocumentationHowTo extends Component {
	render() {
		return (
			<div>
				<Documentation type="notes">
					<h1>How to add documentation to the storybook</h1>
					<p>If you are planning on adding documentation to the storybook, follow the guide added through the ESDoc by generating the docmentation.</p>
					<p>For a quick intro, generate a new component for what you want to add to the story book. If you wish to add documentation to this, create another component, import the component you wish to feature + the "Documentation" component and then use the "Documentation" component to give structure and detail to the story.</p>
					<p>You also have the ability to split the "Documentation" component into types: notes, html, scss, react and react-native. These each have their own preset styling that allow you add code to illustrate implementation details across platforms.</p>
				</Documentation>
				<Documentation type="notes">
					<h1>Headings - h1</h1>
					<h2>Note taking title - h2</h2>
					<h3>Note subtitle - h3</h3>
					<p>General notes  -p</p>
					<p>Writing code, use the pre and code tags</p>
					<pre>
						<code className="language-html">{code}</code>
					</pre>
				</Documentation>
				<Documentation type="scss">
					<h2>Syntax</h2>
					<pre>
						<code className="language-css">{scss}</code>
					</pre>
				</Documentation>
				<Documentation type="react">
					<h2>Syntax</h2>
					<pre>
						<code className="language-jsx">{react}</code>
					</pre>
				</Documentation>
				<Documentation type="react-native">
					<h2>Syntax</h2>
					<pre>
						<code className="language-jsx">{reactNative}</code>
					</pre>
				</Documentation>
				<Documentation type="html">
					<h2>Syntax</h2>
					<pre>
						<code className="language-html">{code}</code>
					</pre>
				</Documentation>
			</div>
		);
	}
}

export default DocumentationHowTo;
