import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LandscapeView from '../app/components/lower/LandscapeView';

//export default LandscapeView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<LandscapeView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<LandscapeView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});