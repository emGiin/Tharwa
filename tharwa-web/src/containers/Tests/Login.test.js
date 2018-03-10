import React from 'react';
import {shallow} from 'enzyme';

import Login from '../Login';

describe('<Login>', () => {
  let wrapper;
  beforeAll(()=> wrapper = shallow(<Login/>))

  it('should render without crashing', ()=>{
    expect(wrapper).toHaveLength(1);
  })
  
  it('should have 1 div of class loginForms', ()=> {
    expect(wrapper.find('div.loginForms')).toHaveLength(1);
  })

  it('should have 1 Steps component with 3 steps',()=>{
    const steps = wrapper.find('Steps');
    expect(steps).toHaveLength(1);
    expect(steps.find('Step')).toHaveLength(3);
  })

  it('should have 1 div of class stepContent', ()=>{
    expect(wrapper.find('div.stepContent')).toHaveLength(1);
  });

  it('should show loading when and only when state.isLoading is true', ()=>{
    wrapper.setState({
      ...wrapper.state(),
      isLoading: true
    }) 
    expect(wrapper.find('Loading')).toHaveLength(1);
    wrapper.setState({
      ...wrapper.state(),
      isLoading: false
    }) 
    expect(wrapper.find('Loading')).toHaveLength(0);    
  })

  it('should show the content corresponding to the current step', ()=> {
    expect(wrapper.find('Form(NormalLoginForm)')).toHaveLength(1);
    
    wrapper.setState({current : 1});
    expect(wrapper.find('ConfirmationMethodPrompt')).toHaveLength(1);

    wrapper.setState({current : 2});
    expect(wrapper.find('PinForm')).toHaveLength(1);

    wrapper.setState({current : 0});
    expect(wrapper.find('Form(NormalLoginForm)')).toHaveLength(1);

  });

  it('should handle login form', ()=>{
    wrapper.instance().handleLoginForm('email', 'password');
    let {email, password, current} = wrapper.state();
    expect(email).toBe('email');
    expect(password).toBe('password');
    expect(current).toBe(1);
  })

  it('should submit credentials',()=>{
    let spy = jest.fn();
    wrapper.instance().sendCredentials = spy;
    wrapper.instance().handleLoginForm('email', 'password');
    wrapper.instance().submitCredentials(1);

    let {email, password, confirmationMethod} = wrapper.state();
    expect(email).toBe('email');
    expect(password).toBe('password');
    expect(confirmationMethod).toBe(1);

    expect(spy).toBeCalled();
  })


});