import React from 'react';
import {shallow} from 'enzyme';

import LoginForm from '../LoginForm';
import {Form} from 'antd';

describe('The login form component : LoginForm', ()=>{
  it('should rendered without crashing', ()=>{
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('NormalLoginForm')).toHaveLength();
  });

  it('should')
});