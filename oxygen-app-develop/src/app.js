import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import Router from './router';

import Dimensions from 'Dimensions';

const App = () => {

	const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
	return (
		<Provider store={store}>
			<Router />
		</Provider>
	);
}

export default App;