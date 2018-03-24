import 'react-native'
import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import AuthActions from '../../../App/Redux/AuthRedux'
import { LoginScreen } from '../../../App/Containers/Screens'

describe('Login Screen container', () => {
  const initialState = {
    auth: {
      fetching: false, error: null, success: false
    }
  }
  const mockStore = configureStore()
  const dispatchSpy = jest.fn();
  const navigationSpy = jest.fn();
  let store, container, content, instance;

  beforeAll(() => {
    store = mockStore(initialState);
    store.dispatch = dispatchSpy;
    container = shallow(
      <LoginScreen navigation={{ navigate: navigationSpy }} />,
      { context: { store } }
    )
    content = container.dive()
    instance = content.instance()
    instance.dialog = { dismiss: jest.fn(), show: jest.fn() };
  })


  it('should render the component', () => {
    expect(container).toHaveLength(1)
  });

  it('should check authentication response', () => {
    instance.componentWillReceiveProps({ fetching: false, success: true });
    expect(instance.dialog.dismiss).toHaveBeenCalled()
    expect(navigationSpy).toHaveBeenCalled()
    navigationSpy.mockClear()
  })

  it('should check Prop matching with initialState', () => {
    const { auth } = initialState;
    expect(container.prop('fetching')).toEqual(auth.fetching)
    expect(container.prop('error')).toEqual(auth.error)
    expect(container.prop('success')).toEqual(auth.success)
  });

  it('should check container initial values of email and password', () => {
    expect(instance.email).toBeUndefined()
    expect(instance.password).toBeUndefined()
  });

  it('should call the login function', () => {
    content.find('ReduxForm').simulate('submit', {
      email: 'user@email.com', password: 'password'
    })
    expect(instance.email).toBe('user@email.com')
    expect(instance.password).toBe('password')
    expect(instance.dialog.show).toHaveBeenCalled()
  })

  it('should call the submit function', () => {
    content.find('DialogButton').at(0).simulate('press');
    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.authRequest(
      'user@email.com', 'password', 'email'
    ));
    dispatchSpy.mockClear()
    content.find('DialogButton').at(1).simulate('press');
    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.authRequest(
      'user@email.com', 'password', 'sms'
    ));
    dispatchSpy.mockClear()
  })

  it('should call the submit function', () => {
    instance.goToPinCodePage();
    expect(navigationSpy).toHaveBeenCalledWith('PinCodeScreen');
    navigationSpy.mockClear()
    instance.goToSignUpPage();
    expect(navigationSpy).toHaveBeenCalledWith('RegisterScreen');
    navigationSpy.mockClear()
  })
});