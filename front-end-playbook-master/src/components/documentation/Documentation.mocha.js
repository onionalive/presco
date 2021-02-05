const React = require('react');
const Component = require('react').Component;
const shallow = require('enzyme').shallow;
const expect = require('chai').expect;
const Header = require('./Header');

//export default Documentation = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<Documentation />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<Documentation />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});