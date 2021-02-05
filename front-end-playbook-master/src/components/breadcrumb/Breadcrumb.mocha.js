const React = require('react');
const Component = require('react').Component;
const shallow = require('enzyme').shallow;
const expect = require('chai').expect;
const Header = require('./Header');

//export default Breadcrumb = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<Breadcrumb />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<Breadcrumb />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});