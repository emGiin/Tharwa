import React from "react";
import { shallow , mount} from "enzyme";
import configureStore from "redux-mock-store";

import Login from "../Login";

describe("<Login>", () => {
  const initialState = {
    auth: {
      fetching: false,
      error: null,
      success: false
    },
    pinCode: {
      fetching: false,
      error: null,
      success: false
    }
  };
  const mockStore = configureStore();
  let dispatcherSpy;
  let wrapper, content, store;

  beforeAll(() => {
    store = mockStore(initialState);
    dispatcherSpy = jest.spyOn(store, "dispatch");
    wrapper = shallow(<Login />, { context: { store } });
    content = wrapper.dive();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render without crashing", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should have props matching initialState", () => {
    const { auth, pinCode } = initialState;
    expect(wrapper.prop("auth").fetching).toEqual(auth.fetching);
    expect(wrapper.prop("auth").error).toEqual(auth.error);
    expect(wrapper.prop("auth").success).toEqual(auth.success);
    expect(wrapper.prop("pinCode").fetching).toEqual(pinCode.fetching);
    expect(wrapper.prop("pinCode").error).toEqual(pinCode.error);
    expect(wrapper.prop("pinCode").success).toEqual(pinCode.success);
  });

  it("should have 1 div of class loginForms", () => {
    expect(content.find("div.loginForms")).toHaveLength(1);
  });

  it("should have 1 Steps component with 3 steps", () => {
    const steps = content.find("Steps");
    expect(steps).toHaveLength(1);
    expect(steps.find("Step")).toHaveLength(3);
  });

  it("should have 1 div of class stepContent", () => {
    expect(content.find("div.stepContent")).toHaveLength(1);
  });

  it("should show loading spinner when and only when fetching", () => {
    expect(content.find("Loading")).toHaveLength(0);

    content.setProps({ auth: {fetching: true}, pinCode: {fetching: false} });
    expect(content.find("Loading")).toHaveLength(1);

    content.setProps({ auth: {fetching: false}, pinCode: {fetching: true} });
    expect(content.find("Loading")).toHaveLength(1);

    content.setProps({ auth: {fetching: true}, pinCode: {fetching: true} });
    expect(content.find("Loading")).toHaveLength(1);

    content.setProps({ auth: {fetching: false}, pinCode: {fetching: false} });
    expect(content.find("Loading")).toHaveLength(0);
  });

  it("should show the content corresponding to the current step", () => {
    console.log(content.debug());
    expect(content.find("Form(NormalLoginForm)")).toHaveLength(1);

    content.setState({ current: 1 });
    expect(content.find("ConfirmationMethodPrompt")).toHaveLength(1);

    content.setState({ current: 2 });
    expect(content.find("PinForm")).toHaveLength(1);

    content.setState({ current: 0 });
    expect(content.find("Form(NormalLoginForm)")).toHaveLength(1);
  });

  it("should handle login form", () => {
    content.instance().handleLoginForm("email", "password");
    let { email, password, current } = content.state();
    expect(email).toBe("email");
    expect(password).toBe("password");
    expect(current).toBe(1);
  });

  it("should submit credentials", () => {
    let spy = jest.fn();
    wrapper.instance().sendCredentials = spy;
    wrapper.instance().handleLoginForm("email", "password");
    wrapper.instance().submitCredentials(1);

    let { email, password, confirmationMethod } = wrapper.state();
    expect(email).toBe("email");
    expect(password).toBe("password");
    expect(confirmationMethod).toBe(1);

    expect(spy).toBeCalled();
  });
});
