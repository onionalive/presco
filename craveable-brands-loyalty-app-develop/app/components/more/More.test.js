import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import MoreView from '../app/components/lower/OffersView';

//export default OffersView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<MoreView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<MoreView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});