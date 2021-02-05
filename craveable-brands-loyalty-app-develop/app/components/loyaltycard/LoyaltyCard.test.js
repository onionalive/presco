import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LoyaltyCardView from '../app/components/lower/LoyaltyCardView';

//export default LoyaltyCardView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<LoyaltyCardView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<LoyaltyCardView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});