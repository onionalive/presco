import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import AccountSettingsView from '../app/components/lower/AccountSettingsView';

//export default AccountSettingsView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<AccountSettingsView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<AccountSettingsView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});