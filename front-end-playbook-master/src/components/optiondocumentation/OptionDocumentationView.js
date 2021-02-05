import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */
import Option from '../option/Option';
import Documentation from '../documentation/Documentation';

const usage = `<Option idName="radio" type="radio" name="radio" value="one" label="Option one" />
<Option idName="radioTwo" type="radio" name="radio" value="two" label="Option two" />
<Option idName="radioThree" type="radio" name="radio" value="three" label="Option three" />
<Option idName="checkbox" type="checkbox" name="checkbox" value="checkbox" label="Checkbox one" />`;

const html = `<!-- Radio -->
<span class="option">
	<input class="radio" type="radio" id="id-name" name="name" value="value" />
	<span class="toggle"></span>
	<label class="label" for="id-name">Label</label>
</span>

<!-- Checkbox -->
<span class="option">
	<input class="checkbox" type="checkbox" id="id-name" name="name" value="value" />
	<span class="toggle"></span>
	<label class="label" for="id-name">Label</label>
</span>`;

const react = `<!-- Radio -->
<span className="option">
	<input className="radio" type="radio" id={this.props.idName} name={this.props.name} value={this.props.value} />
	<span className="toggle"></span>
	<label className="label" htmlFor={this.props.idName}>{this.props.label}</label>
</span>

<!-- Checkbox -->
<span className="option">
	<input className="checkbox" type="checkbox" id={this.props.idName} name={this.props.name} value={this.props.value} />
	<span className="toggle"></span>
	<label className="label" htmlFor={this.props.idName}>{this.props.label}</label>
</span>`;

const scss = `.option {
	position: relative;
	display: block;

	margin-bottom: 10px;

	.radio,
	.checkbox {
		opacity: 0;
		width: 0;
		height: 0;

		&:checked + .toggle {
			background-color: $c-blue;
			border-color: $c-blue;

			background-image: $i-checkmark;
			background-position: center;
			background-repeat: no-repeat;
			background-size: 12px 9px;
		}
	}

	.toggle {
		display: inline-block;

		margin-right: 10px;
		vertical-align: middle;

		width: 22px;
		height: 22px;

		border-radius: 50%;

		background-color: $c-white;
		border: solid 1px $c-grey;
	}

	.label {
		position: absolute;
		left: 0;
		padding-left: 34px;

		font-size: 1.7rem;
		line-height: 24px;
	}
}
`;

class OptionDocumentation extends Component {
	render() {
		return (
			<div>
				<Option idName="radio" type="radio" name="radio" value="one" label="Option one" />
				<Option idName="radioTwo" type="radio" name="radio" value="two" label="Option two" />
				<Option idName="radioThree" type="radio" name="radio" value="three" label="Option three" />
				<Option idName="checkbox" type="checkbox" name="checkbox" value="checkbox" label="Checkbox one" />
				<Documentation type="notes">
					<h2>Example usage</h2>
					<pre>
						<code className="language-jsx">{usage}</code>
					</pre>
				</Documentation>
				<Documentation type="html">
					<pre>
						<code className="language-jsx">{html}</code>
					</pre>
				</Documentation>
				<Documentation type="react">
					<pre>
						<code className="language-jsx">{react}</code>
					</pre>
				</Documentation>
				<Documentation type="scss">
					<pre>
						<code className="language-css">{scss}</code>
					</pre>
				</Documentation>
			</div>
		);
	}
}

OptionDocumentation.propTypes = {
	example: PropTypes.string
}

export default OptionDocumentation;
