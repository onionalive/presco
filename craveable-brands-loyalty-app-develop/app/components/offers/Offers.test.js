import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import OffersView from '../app/components/lower/OffersView';

//export default OffersView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<OffersView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<OffersView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});