import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import OffersActiveView from '../app/components/lower/OffersActiveView';

//export default OffersActiveView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<OffersActiveView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<OffersActiveView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});