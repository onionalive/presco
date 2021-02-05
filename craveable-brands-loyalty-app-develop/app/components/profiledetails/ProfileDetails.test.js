import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ProfileDetailsView from '../app/components/lower/ProfileDetailsView';

//export default ProfileDetailsView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<ProfileDetailsView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<ProfileDetailsView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});