import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LoginScreenView from '../app/components/lower/LoginScreenView';

//export default LoginScreenView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<LoginScreenView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<LoginScreenView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});