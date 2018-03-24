import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { LoginForm } from '../../../App/Containers/Forms'

describe('LoginForm Component', () => {
  let wrapper, content;
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
})