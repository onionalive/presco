import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

class App extends Component {
	render() {
		return (
			<section className="container">
				<h1>{this.props.appReducerState}</h2>
				<h2>{this.props.anotherAppReducerState}</h2>
			</section>
		);
	}
}

export default App;

