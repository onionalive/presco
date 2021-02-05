import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import MapView from '../app/components/lower/MapView';

//export default MapView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<MapView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<MapView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});