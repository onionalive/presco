import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import EditPhonePathwayView from '../app/components/lower/EditPhonePathwayView';

//export default EditPhonePathwayView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<EditPhonePathwayView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<EditPhonePathwayView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});