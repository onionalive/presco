import Home from 'components/home/Home';

describe('<Home/>', ()=>{
    const mockState = {
    	HomeReducer: {
    		init: 'test'
    	}
    };

    const mockStore = configureStore();
    const store = mockStore(mockState);

    it('renders one <div> tag', () => {
        const wrapper = shallowWithStore(<Home />, store);
        // expect(wrapper).to.be.a('object');
        expect(wrapper.dive().find('h1')).to.have.className('title');
        expect(wrapper).to.have.props([ 'example']);
        expect(wrapper).to.have.props([ 'example']).deep.equal(['test']);
    });
})
