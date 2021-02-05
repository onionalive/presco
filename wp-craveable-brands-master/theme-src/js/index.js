import React, { Component } from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './Reducers';
import Routes from './Routes';
import Layout from './components/Layout';
window.$ = window.jQuery = require("jquery");

injectTapEventPlugin();

class App extends Component {
	render() {
		const store = createStore(
			reducers,
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
			applyMiddleware(ReduxThunk)
		);

		return (
			<Provider store={store}>
				<Layout>
					<Routes />
				</Layout>
			</Provider>
		)
	}
}

render(
	<App />,
	document.getElementById('app')
);
