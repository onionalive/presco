import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SwiperContainerView from '../app/components/lower/SwiperContainerView';

//export default SwiperContainerView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<SwiperContainerView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<SwiperContainerView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});