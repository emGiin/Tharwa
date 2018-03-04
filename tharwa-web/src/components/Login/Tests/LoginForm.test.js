import React from "react";
import { shallow } from "enzyme";

import LoginForm from "../LoginForm";

describe("The login form component : LoginForm", () => {
  it("should rendered without crashing", () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find("NormalLoginForm")).toHaveLength(1);
  });
  

  it("should be wrapped by Form.create", ()=> {
    // const wrapper = shallow(<LoginForm />);
    // expect(wrapper.prop()).toHaveProperty('form');    
  });

  it("should have 4 items", () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.dive().find("FormItem")).toHaveLength(4);
  });

  it("should call onNext() after submit", () => {
    const spy = jest.fn(); 
    const wrapper = shallow (<LoginForm onNext={spy} />);
    const insideWrap = wrapper.dive();
    insideWrap.childAt(0).childAt(0).simulate('change', 'test@test.dz');
    insideWrap.childAt(1).childAt(0).simulate('change', 'password123');
    insideWrap.find("Form").simulate('submit', { preventDefault() {}});
    expect(spy).toHaveBeenCalled();

  })
});
