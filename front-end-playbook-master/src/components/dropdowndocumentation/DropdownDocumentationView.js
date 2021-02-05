import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */
import Documentation from '../documentation/Documentation';
import Dropdown from '../dropdown/Dropdown';

const usage = `<Dropdown target="first" label="Dropdown">
	<select className="select" name="first" id="first">
		<option label="Select first place" disabled selected>Select first place</option>
		<option label="Option one" />
		<option label="Option two" />
		<option label="Option three" />
	</select>
</Dropdown>`;

const html = `<span class="dropdown">
	<span class="container">
		<label class="label" for="first">1st place</label>
	</span>
	<span class="container">
		<select class="select" name="first" id="first">
			<option label="Select first place" disabled selected>Select first place</option>
			<option label="Option one" />
			<option label="Option two" />
			<option label="Option three" />
		</select>
		<span class="icon"></span>
	</span>
</span>`;

const scss = `.dropdown {
	.select {
		padding: 24px 20px 20px 20px;
		white-space: pre-wrap;

		background-color: $c-white;
		background-repeat: no-repeat;
		background-position: center;
		background-size: 18px auto;
		border: 0.8px solid $c-light-grey;
		border-radius: 0px;

		width: 100%;
		text-overflow: ellipsis;

		font-size: 1.7rem;

		appearance: none;
	}

	.label {
		text-align: left;
		margin-bottom: 20px;

		font-size: 1.5rem;
	}

	.container {
		position: relative;
		display: block;

		margin-bottom: 10px;

		&:last-of-type {
			margin-bottom: 20px;
		}

		&.error {
			border: 1px solid $c-red;
		}

		&.valid {
			border: 1px solid $c-green;
		}
	}

	.icon {
		position: absolute;
		pointer-events: none;

		top: 0;
		right: 0;
		display: block;
		background-color: $c-green;

		background-image: $i-caret-down;
		background-position: center;
		background-repeat: no-repeat;
		background-size: 10px 5px;

		width: 65px;
		height: 65px;
	}
}
`;

const react = `<span className="dropdown">
	<span className="container">
		<label className="label" htmlFor="first">1st place</label>
	</span>
	<span className="container">
		<select className="select" name="first" id="first">
			<option label="Select first place" disabled selected>Select first place</option>
			<option label="Option one" />
			<option label="Option two" />
			<option label="Option three" />
		</select>
		<span className="icon"></span>
	</span>
</span>`;

class DropdownDocumentation extends Component {
	render() {
		return (
			<div>
				<Dropdown target="first" label="Dropdown">
					<select className="select" name="first" id="first">
						<option label="Select first place" disabled selected>Select first place</option>
						<option label="Option one" />
						<option label="Option two" />
						<option label="Option three" />
					</select>
				</Dropdown>
				<Documentation type="notes">
					<h1>Dropdown</h1>
					<p>Use for select and option tags. Add addition icon classes to add a background image.</p>
					<h2>Example usage</h2>
					<pre>
						<code className="language-jsx">{usage}</code>
					</pre>
				</Documentation>
				<Documentation type="html">
					<h2>Syntax</h2>
					<pre>
						<code className="language-jsx">{html}</code>
					</pre>
				</Documentation>
				<Documentation type="react">
					<h2>Syntax</h2>
					<pre>
						<code className="language-jsx">{react}</code>
					</pre>
				</Documentation>
				<Documentation type="scss">
					<h2>Syntax</h2>
					<pre>
						<code className="language-css">{scss}</code>
					</pre>
				</Documentation>
			</div>
		);
	}
}

DropdownDocumentation.propTypes = {
	example: PropTypes.string
}

export default DropdownDocumentation;
