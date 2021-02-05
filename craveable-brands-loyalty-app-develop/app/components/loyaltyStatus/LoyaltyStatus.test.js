import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LoyaltyStatusView from '../app/components/loyaltyStatus/LoyaltyStatusView';


// describe('<LoyaltyStatusView />', () => {
// 	it('should render one View', () => {
// 		const wrapper = shallow(<LoyaltyStatusView />);
// 			expect(wrapper.find(View)).to.have.length(1);
// 	});
// });