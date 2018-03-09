import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import LoginForm, { EmailInput, PasswordInput } from '../../App/Components/LoginForm'

describe('LoginForm Component', () => {
  let wrapper, content, emailWrapper, passwordWrapper;
  const submitSpy = jest.fn();
  const registerSpy = jest.fn();

  const store = configureStore()({
    form: require('redux-form').reducer,
  });

  beforeAll(() => {
    wrapper = shallow(<LoginForm
      onSubmit={submitSpy}
      onRegisterClicked={registerSpy}
    />, { context: { store } });
    content = wrapper.dive().dive();
  })

  it("should render correctly", () => {
    expect(wrapper.find("Connect(Form(LoginForm))")).toHaveLength(1);
    expect(content.find("LoginForm")).toHaveLength(1);
    expect(content.dive().find("Field")).toHaveLength(2);
    expect(content.dive().find("Styled(Button)")).toHaveLength(2);
  });

  it("should  call on submit function", () => {
    content.find('LoginForm').simulate('submit')
    expect(submitSpy).toHaveBeenCalled()
  });

  it("should call on register function", () => {
    content.dive().find('Styled(Button)').at(1).simulate('press')
    expect(registerSpy).toHaveBeenCalled()
  });

  it('should render email input', () => {
    const props = { input: {}, meta: {} }
    emailWrapper = shallow(<EmailInput {...props} />)
    expect(emailWrapper).toHaveLength(1)
    expect(emailWrapper.dive().find('Styled(Icon)')).toHaveLength(1)
    expect(emailWrapper.dive().find('Styled(Text)')).toHaveLength(0)
  })

  it('should not show email errors', () => {
    emailWrapper.setProps({ meta: { invalid: true, touched: true, error: 'error' } })
    emailWrapper.update()
    expect(emailWrapper.dive().find('Styled(Icon)')).toHaveLength(2)
    expect(emailWrapper.dive().find('Styled(Text)')).toHaveLength(1)
  })


  it('should render password input', () => {
    const props = { input: {}, meta: {} }
    passwordWrapper = shallow(<PasswordInput {...props} />)
    expect(passwordWrapper).toHaveLength(1)
    expect(passwordWrapper.dive().find('Styled(Icon)')).toHaveLength(2)
    expect(passwordWrapper.dive().find('Styled(Text)')).toHaveLength(0)
    expect(passwordWrapper.dive().find('Styled(Icon)').at(1).props().name).toBe('eye')
  })

  it('should render password input', () => {
    passwordWrapper.setProps({ meta: { invalid: true, touched: true, error: 'error' } })
    passwordWrapper.update()
    expect(passwordWrapper.dive().find('Styled(Icon)')).toHaveLength(2)
    expect(passwordWrapper.dive().find('Styled(Text)')).toHaveLength(1)
    expect(passwordWrapper.dive().find('Styled(Icon)').at(1).props().name).toBe('md-alert')
  })

  it('should show password value input', () => {
    passwordWrapper.setProps({ meta: {} })
    passwordWrapper.instance().togglePassword()
    passwordWrapper.update()
    expect(passwordWrapper.dive().find('Styled(Icon)')).toHaveLength(2)
    expect(passwordWrapper.dive().find('Styled(Icon)').at(1).props().name).toBe('eye-off')
  })
})