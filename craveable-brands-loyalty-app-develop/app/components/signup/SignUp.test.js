import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SignUpView from '../app/components/lower/SignUpView';

//export default SignUpView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<SignUpView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<SignUpView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});