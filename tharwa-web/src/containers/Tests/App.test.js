import React from 'react';
import {shallow} from 'enzyme';

import App from '../App';

describe('<App>', () => {
  let wrapper; 

  beforeAll(()=> {
    wrapper = shallow(<App/>);
  })

  it('should render without crashig', ()=>{
    expect(wrapper).toHaveLength(1);
  });
});