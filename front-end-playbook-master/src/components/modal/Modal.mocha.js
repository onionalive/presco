const React = require('react');
const Component = require('react').Component;
const shallow = require('enzyme').shallow;
const expect = require('chai').expect;
const Header = require('./Header');

//export default Modal = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<Modal />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<Modal />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});