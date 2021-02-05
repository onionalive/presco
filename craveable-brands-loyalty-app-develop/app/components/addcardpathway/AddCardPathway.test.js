import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import AddCardPathwayView from '../app/components/lower/AddCardPathwayView';

//export default AddCardPathwayView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<AddCardPathwayView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<AddCardPathwayView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});