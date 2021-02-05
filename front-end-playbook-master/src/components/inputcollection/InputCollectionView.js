import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

/* user imports */

const example = `<span className="input-set">
	<label className="label" htmlFor={this.props.idName}>{this.props.label}</label>
	<input id={this.props.idName}
		className={this.props.style ? this.props.style : 'input'}
		type="text" name={this.props.name}
		title={this.props.title}
		placeholder={this.props.placeholder} />
</span>`;

class InputCollection extends Component {
	render() {
		return (
			<div>
				<h3 style={{ marginBottom: 20 }}>Input</h3>
				<Input idName="form-name"
						name="name"
						title="name"
						label="Name"
						placeholder="Enter your name" />
				<Input idName="form-email"
						name="email"
						title="email"
						label="Email"
						placeholder="Enter your email" />
				<div className="example">
					<h4>Example Usage</h4>
					<pre className="code">
						{ example }
					</pre>
				</div>
			</div>
		);
	}
}

InputCollection.propTypes = {
	example: PropTypes.string
}

export default InputCollection;
