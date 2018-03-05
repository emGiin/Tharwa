import React from "react";
import { shallow, mount } from "enzyme";

import RegistrationForm from '../createBanquier';

describe("<RegistrationForm>", () => {
    let wrapper;
    let spy;
  
    let inputArray=[];
    let nomInput;
    let prenomInput;
    let mailInput;
    let passwordInput;
    let confirmPassInput; 
    let adressInput; 
    let phoneInput;
    let agreeInput;
    let validerBtn;

  
    beforeAll(() => {
      spy = jest.fn();
      wrapper = mount(<RegistrationForm  />);
      nomInput = wrapper.find("Input#name");
      prenomInput= wrapper.find("Input#surname");
      mailInput= wrapper.find("Input#email");
      passwordInput= wrapper.find("Input#password");
      confirmPassInput= wrapper.find("Input#confirm");
      adressInput= wrapper.find("Input#adresse");
      phoneInput= wrapper.find("Input#phone");
      agreeInput= wrapper.find("Input#agreement");
      validerBtn= wrapper.find("Button");
      inputArray =[nomInput,
        prenomInput,
        mailInput,
        passwordInput,
        confirmPassInput,
        adressInput,
        phoneInput,
        agreeInput,
        validerBtn];
    });
  
    beforeEach(() => {
      jest.resetAllMocks();
    });


  it("should render without crashing", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should have 7 input fields ", () => {
    expect(wrapper.find('Input')).toHaveLength(7);   
});

  it("should have validation button", () => {
      console.log('validation btn text : ');
      var text = validerBtn.at(1).text();
      console.log(text);
    expect(text).to.equal('valider');
  });
/*
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

*/
});
