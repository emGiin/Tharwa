import 'react-native'
import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import AuthActions from '../../App/Redux/AuthRedux'
import LoginScreen from '../../App/Containers/LoginScreen'

describe('Login Screen container', () => {
  const initialState = {
    auth: {
      fetching: false, error: null, success: false
    }
  }
  const mockStore = configureStore()
  const dispatchSpy = jest.fn();
  const navigationSpy = jest.fn();
  let store, container, content;

  beforeAll(() => {
    store = mockStore(initialState);
    store.dispatch = dispatchSpy;
    container = shallow(
      <LoginScreen navigation={{ navigate: navigationSpy }} />,
      { context: { store } }
    )
    content = container.dive()
  })

  it('should check authentication response', () => {
    const instance = content.instance();
    const spy = jest.fn();
    instance.dialog = { dismiss: spy };
    content.setProps({ error: 'WRONG' });
    instance.componentWillReceiveProps({ fetching: false, error: 'WRONG' });
    expect(content.find('Styled(Text)')).toHaveLength(1)

    instance.componentWillReceiveProps({ fetching: false, success: true });
    expect(spy).toHaveBeenCalled()
    expect(navigationSpy).toHaveBeenCalled()
    navigationSpy.mockClear()
  })

  it('should render the component', () => {
    expect(container.length).toEqual(1)
  });

  it('should check Prop matching with initialState', () => {
    const { auth } = initialState;
    expect(container.prop('fetching')).toEqual(auth.fetching)
    expect(container.prop('error')).toEqual(auth.error)
    expect(container.prop('success')).toEqual(auth.success)
  });

  it('should check container initial values of email and password', () => {
    const instance = container.instance();
    expect(instance.email).toBeUndefined()
    expect(instance.password).toBeUndefined()
  });

  it('should call the login function', () => {
    const instance = content.instance();
    const showSpy = jest.fn();
    instance.dialog = { show: showSpy }
    content.find('ReduxForm').simulate('submit', {
      email: 'user@email.com', password: 'password'
    })
    expect(instance.email).toBe('user@email.com')
    expect(instance.password).toBe('password')
    expect(showSpy).toHaveBeenCalled()
  })

  it('should call the submit function', () => {
    content.find('DialogButton').at(0).simulate('press');
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.authRequest(
      'user@email.com', 'password', 'email'
    ));
    dispatchSpy.mockClear()
    content.find('DialogButton').at(1).simulate('press');
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.authRequest(
      'user@email.com', 'password', 'sms'
    ));
    dispatchSpy.mockClear()
  })

  it('should show activity indicator when fetching', () => {
    content.setProps({ fetching: true });
    expect(content.find('ActivityIndicator')).toHaveLength(1)
  })

  it('should call the submit function', () => {
    const instance = content.instance();
    instance.goToPinCodePage();
    expect(navigationSpy).toHaveBeenCalled();
    expect(navigationSpy).toHaveBeenCalledWith('PinCodeScreen');
    navigationSpy.mockClear()
    instance.goToSignUpPage();
    expect(navigationSpy).toHaveBeenCalled();
    expect(navigationSpy).toHaveBeenCalledWith('RegisterScreen');
    navigationSpy.mockClear()
  })
});