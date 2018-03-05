import React from "react";
import { shallow } from "enzyme";

import LoginForm from "../LoginForm";

describe("The login form component : LoginForm", () => {
  let wrapper;
  let spy;

  beforeAll(() => {
    spy = jest.fn();
    wrapper = shallow(<LoginForm onNext={spy} />);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should rendered without crashing", () => {
    expect(wrapper.find("NormalLoginForm")).toHaveLength(1);
  });

  it("should be wrapped by Form.create", () => {
    expect(wrapper.props()).toHaveProperty("form");
  });

  it("should have 4 items", () => {
    expect(wrapper.dive().find("FormItem")).toHaveLength(4);
  });

  it("should call onNext() after submit with correct credentials", () => {
    const insideWrap = wrapper.dive();
    insideWrap
      .childAt(0)
      .childAt(0)
      .simulate("change", "test@test.dz");
    insideWrap
      .childAt(1)
      .childAt(0)
      .simulate("change", "password123");
    insideWrap.find("Form").simulate("submit", { preventDefault() {} });
    expect(spy).toHaveBeenCalled();
  });

  it("should not call onNext() after submit with bad credentials", () => {
    const insideWrap = wrapper.dive();
    insideWrap
      .childAt(0)
      .childAt(0)
      .simulate("change", "test");
    insideWrap
      .childAt(1)
      .childAt(0)
      .simulate("change", "");
    insideWrap.find("Form").simulate("submit", { preventDefault() {} });
    expect(spy).not.toHaveBeenCalled();
  });
});
