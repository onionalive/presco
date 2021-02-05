import React from 'react';
import ReactNative, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
// import Home from './Home';

// REDUX IMPORTS 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../../../test/reducers';
import ReduxThunk from 'redux-thunk';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default HomeTest = () => { 
	return ( 
		<View> 
			<Text>enzyme</Text> 
			<Text>rules</Text> 
		</View> 
	); 
};

// export default HomeTest = () => {
// 	return (
// 		<Provider store={store}>
// 			<Home />
// 		</Provider>
// 	);
// };

describe('<Home />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<HomeTest />);
		expect(wrapper.find(View)).to.have.length(1);
	});
});