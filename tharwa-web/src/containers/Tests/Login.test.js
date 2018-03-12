import React from "react";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";

import AuthActions from "../../redux/AuthRedux";
import PinCodeActions from "../../redux/PinCodeRedux";
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

    content.setProps({
      auth: { fetching: true },
      pinCode: { fetching: false }
    });
    expect(content.find("Loading")).toHaveLength(1);

    content.setProps({
      auth: { fetching: false },
      pinCode: { fetching: true }
    });
    expect(content.find("Loading")).toHaveLength(1);

    content.setProps({ auth: { fetching: true }, pinCode: { fetching: true } });
    expect(content.find("Loading")).toHaveLength(1);

    content.setProps({
      auth: { fetching: false },
      pinCode: { fetching: false }
    });
    expect(content.find("Loading")).toHaveLength(0);
  });

  it("should show the content corresponding to the current step", () => {
    expect(content.find("Form(NormalLoginForm)")).toHaveLength(1);

    content.setState({ current: 1 });
    expect(content.find("ConfirmationMethodPrompt")).toHaveLength(1);

    content.setState({ current: 2 });
    expect(content.find("PinForm")).toHaveLength(1);

    content.setState({ current: 0 });
    expect(content.find("Form(NormalLoginForm)")).toHaveLength(1);
  });

  it("should show error if there is one", () => {
    content.setState({ current: 2 });
    content.instance().componentWillReceiveProps({
      auth: { error: "test" },
      pinCode: { error: null }
    });
    expect(content.state().current).toBe(0);
    expect(content.state().error).toBe("test");

    content.instance().componentWillReceiveProps({
      auth: { error: null },
      pinCode: { error: "test" }
    });
    expect(content.state().error).toBe("test");
    //TODO : test error appearance
  });
  it("should go to the next step on authentication success", () => {
    content.setState({ current: 1 });
    content.instance().componentWillReceiveProps({
      auth: { error: null, success: true },
      pinCode: { error: null }
    });

    expect(content.state().current).toBe(2);
  });

  it("should handle login form", () => {
    content.setState({ current: 0 });
    content.instance().handleLoginForm("email", "password");
    let { email, password, current } = content.state();
    expect(email).toBe("email");
    expect(password).toBe("password");
    expect(current).toBe(1);
  });

  it("should submit credentials", () => {
    let _temp = content.instance().sendCredentials;
    
    let spy = jest.fn();
    content.setState({ current: 1 });
    content.instance().sendCredentials = spy;
    content.instance().handleLoginForm("email", "password");
    content.instance().submitCredentials(1);

    let { email, password, confirmationMethod } = content.state();
    expect(email).toBe("email");
    expect(password).toBe("password");
    expect(confirmationMethod).toBe(1);

    expect(spy).toBeCalled();

    content.instance().sendCredentials = _temp;
  });

  it("should dispatch AUTH_REQUEST on sendCredentials", () => {
    content.setState({ current: 1 });
    content.setState({
      email: "user@email.com",
      password: "password",
      confirmationMethod: 1
    });
    content.instance().sendCredentials();
    expect(dispatcherSpy).toHaveBeenCalledWith(
      AuthActions.authRequest("user@email.com", "password", 1)
    );
  });
  
  it('should submit pin', ()=>{
    let _temp = content.instance().sendPin;

    let spy = jest.fn();
    content.setState({current: 2});
    content.instance().sendPin = spy;
    content.instance().submitPin("1456");

    let { pin } = content.state();
    expect(pin).toBe("1456");
    expect(spy).toBeCalled();

    content.instance().sendPin = _temp;
  })

  it("should dispatch PIN_CODE_REQUEST on sendPin", () => {
    content.setState({ current: 2 });
    content.setState({ pin: "1456" });
    content.instance().sendPin();
    expect(dispatcherSpy).toHaveBeenCalledWith(
      PinCodeActions.pinCodeRequest("1456")
    );
  });
});
