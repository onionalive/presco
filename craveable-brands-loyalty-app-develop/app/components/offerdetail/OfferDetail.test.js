import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import OfferDetailView from '../app/components/lower/OfferDetailView';

//export default OfferDetailView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<OfferDetailView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<OfferDetailView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});