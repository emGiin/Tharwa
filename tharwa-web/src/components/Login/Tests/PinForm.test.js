import React from "react";
import { shallow } from "enzyme";

import PinForm from "../PinForm";

describe("<PinForm>", () => {
  let wrapper;
  let spy;

  let pinInput;
  let doneButton;

  beforeAll(() => {
    spy = jest.fn();
    wrapper = shallow(<PinForm onNext={spy} />);
    pinInput = wrapper.find("Input");
    doneButton= wrapper.find("Button");

  });

  beforeEach(() => {
    jest.resetAllMocks();
  });


  it("should render without crashing", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should have 1 input", () => {
    expect(pinInput).toHaveLength(1);
  });

  it("should have 1 button", () => {
    expect(doneButton).toHaveLength(1);
  });

  it("should have 1 div of loginForm ", () => {
    expect(wrapper.find('div.loginForm')).toHaveLength(1);
  });

  it("should not call OnNext() after clicking Next button with invalid pin", () => {
    doneButton.simulate("click");
    expect(spy).not.toHaveBeenCalled();

    pinInput.simulate("change", { target: { value: "wrong" } });
    doneButton.simulate("click");
    expect(spy).not.toHaveBeenCalled();
  });

  it("should call OnNext() after clicking Next button with valid", () => {
    pinInput.simulate("change", { target: { value: "1234" } });
    doneButton.simulate("click");
    expect(spy).toBeCalledWith('1234');
  });

  it('should not update state if pin is invalid', ()=> {
    pinInput.simulate("change", { target: { value: "123" } });
    expect(wrapper.state().pin).toBeFalsy()
    pinInput.simulate("change", { target: { value: "invalid" } });
    expect(wrapper.state().pin).toBeFalsy()
  })

  it('should update state if pin is valid', ()=> {
    pinInput.simulate("change", { target: { value: "1234" } });
    expect(wrapper.state().pin).toBe('1234')
  })

  it('should only accept numeric values', ()=> {
    pinInput.simulate("change", { target: { value: "123" } });
    
    pinInput.simulate('keypress', {which : 97, preventDefault:spy});
    expect(spy).toBeCalled()
    

    spy.mockReset();

    pinInput.simulate('keypress', {which : 53, preventDefault:spy});
    expect(spy).not.toBeCalled()
    
  })

  it('should handle when keyCode is provided by onkeypress event',()=>{
    pinInput.simulate('keypress', {keyCode : 98, preventDefault:spy});
    expect(spy).toBeCalled()
  });

  it('should only paste valid pin', () => {
        
    pinInput.simulate('paste', {clipboardData : {getData(){return 'invalidPin'}}, preventDefault:spy});
    expect(spy).toBeCalled()
    
    spy.mockReset();

    pinInput.simulate('paste', {clipboardData : {getData(){return '1546'}}, preventDefault:spy});
    expect(spy).not.toBeCalled()
  })


});
