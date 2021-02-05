import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ProfileView from '../app/components/lower/ProfileView';

//export default ProfileView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<ProfileView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<ProfileView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});