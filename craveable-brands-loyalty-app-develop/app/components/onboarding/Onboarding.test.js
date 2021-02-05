import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import OnboardingView from '../app/components/lower/OnboardingView';

//export default OnboardingView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<OnboardingView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<OnboardingView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});