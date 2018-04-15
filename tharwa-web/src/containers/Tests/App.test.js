import React from 'react';
import {shallow} from 'enzyme';

import App, {store} from '../App';

describe('<App>', () => {
  let wrapper; 

  beforeAll(()=> {
    wrapper = shallow(<App/>);
  })

  it('should render without crashig', ()=>{
    expect(wrapper).toHaveLength(1);
  });

  it('should have a provider with redux store', ()=>{
    let provider = wrapper.find('Provider');
    expect(provider).toHaveLength(1);
    expect(provider.prop('store')).toBe(store);
  })
});