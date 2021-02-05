import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ModalDeleteAccountView from '../app/components/lower/ModalDeleteAccountView';

//export default ModalDeleteAccountView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<ModalDeleteAccountView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<ModalDeleteAccountView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});