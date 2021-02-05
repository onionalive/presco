import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import HelpView from '../app/components/help/HelpView';


// describe('<HelpView />', () => {
// 	it('should render one View', () => {
// 		const wrapper = shallow(<HelpView />);
// 			expect(wrapper.find(View)).to.have.length(1);
// 	});
// });