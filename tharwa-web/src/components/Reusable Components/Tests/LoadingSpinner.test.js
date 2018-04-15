import React from "react";
import { shallow } from "enzyme";

import LoadingSpinner from "../LoadingSpinner";

describe('<LoadingSpinner />', () => {
  let wrapper; 
  
  beforeAll(()=>{
    wrapper = shallow (<LoadingSpinner/>)
  })
  
  it("should render without crashing", () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should have 1 div of class `spinner`', ()=>{
    expect(wrapper.find('div.spinner')).toHaveLength(1);
  })


  it('should have 4 divs of class `ball`', ()=>{
    expect(wrapper.find('div.ball')).toHaveLength(4);
  })
});