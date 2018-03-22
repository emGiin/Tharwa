import React from "react";
import { shallow } from "enzyme";

import Loading from "../Loading";

describe('<Loading>', () => {
  let wrapper; 
  beforeAll(()=> {
    wrapper = shallow(<Loading/>);
  })
  it("should render without crashing", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should have 1 div of loginForm ", () => {
    expect(wrapper.find('div.loginForm')).toHaveLength(1);
  });

  it("should have 1 LoadingSpinner", () => {
    expect(wrapper.find('LoadingSpinner')).toHaveLength(1);
  });
});