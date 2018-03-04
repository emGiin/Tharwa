import React from "react";
import { shallow } from "enzyme";

import LoginForm from "../LoginForm";

describe("The login form component : LoginForm", () => {
  it("should rendered without crashing", () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find("NormalLoginForm")).toHaveLength(1);
  });

  it("should have 4 items", () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.dive().find("FormItem")).toHaveLength(4);
  });
});
