import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/reducer';
import ReduxThunk from 'redux-thunk';
import Home from './components/home/Home';
import './main.css';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
 	<Provider store={store}>
		<Router history={history} basename="/">
			<Route path="/" component={Home} />
		</Router>
	</Provider>
	, document.getElementById('root')
);
