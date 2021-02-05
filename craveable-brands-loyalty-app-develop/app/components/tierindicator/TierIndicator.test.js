import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import TierIndicatorView from '../app/components/lower/TierIndicatorView';

//export default TierIndicatorView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<TierIndicatorView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<TierIndicatorView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});