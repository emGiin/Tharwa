import 'react-native'
import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import SignupActions from '../../../App/Redux/SignupRedux'
import { RegisterScreen } from '../../../App/Containers/Screens'

describe('Registration Screen container', () => {
  const initialState = {
    signup: {
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
      <RegisterScreen navigation={{ navigate: navigationSpy }} />,
      { context: { store } }
    )
    content = container.dive()
    instance = content.instance()
    instance.dialog = { dismiss: jest.fn(), show: jest.fn() };
  })


  it('should render the component', () => {
    expect(container).toHaveLength(1)
    expect(content.find('LoadingDialog')).toHaveLength(1)
    expect(content.find('SignupForm')).toHaveLength(1)
  });

  it('should check Prop matching with initialState', () => {
    const { signup } = initialState;
    expect(container.prop('fetching')).toEqual(signup.fetching)
    expect(container.prop('error')).toEqual(signup.error)
    expect(container.prop('success')).toEqual(signup.success)
  });

  it('should call the submit function', () => {
    const data = 'userData'
    content.find('SignupForm').simulate('submit', data);
    expect(dispatchSpy).toHaveBeenCalledWith(SignupActions.signupRequest(data));
    dispatchSpy.mockClear()
    expect(instance.dialog.show).toHaveBeenCalled()
  })

  it('should check signup response', () => {
    const props = { fetching: false, success: true }
    instance.componentWillReceiveProps(props);
    expect(instance.state.showSuccessPage).toBeTruthy()
    content.setProps(props)
    content.update()
    expect(content.find('Styled(Text)')).toHaveLength(2)
    expect(content.find('LogoImage')).toHaveLength(1)
  })
});