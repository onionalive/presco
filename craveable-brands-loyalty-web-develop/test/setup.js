/* setup.js */
import configureStore from 'redux-mock-store';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());

import React from 'react';
import { shallow, mount } from 'enzyme';

import { Provider } from 'react-redux';
import register from 'ignore-styles'
register(['.sass', '.scss', '.png', '.jpg']);

global.expect = chai.expect;
global.configureStore = configureStore;
global.React = React;

global.shallowWithStore = (component, store) => {
	const context = {
		store,
	};
	return shallow(component, { context });
};

global.mountWithStore = (component, store) => {
	const context = {
		store,
	};
	return shallow(component, { context });
};

console.log('test/setup.js loaded');
