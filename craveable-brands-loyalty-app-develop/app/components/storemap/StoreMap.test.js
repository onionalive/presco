import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import StoreMapViewView from '../app/components/lower/StoreMapViewView';

//export default StoreMapViewView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<StoreMapViewView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<StoreMapViewView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});