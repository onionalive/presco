import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import EditPasswordPathwayView from '../app/components/lower/EditPasswordPathwayView';

//export default EditPasswordPathwayView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<EditPasswordPathwayView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<EditPasswordPathwayView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});