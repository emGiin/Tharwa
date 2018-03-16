import 'react-native'
import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import PinCodeActions from '../../../App/Redux/PinCodeRedux'
import { PinCodeScreen } from '../../../App/Containers/Screens'
import { NavigationActions } from 'react-navigation'

describe('Login Screen container', () => {
  const initialState = {
    pinCode: {
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
      <PinCodeScreen navigation={{ dispatch: navigationSpy, navigate: navigationSpy }} />,
      { context: { store } }
    )
    content = container.dive()
  })

  it('should render the component', () => {
    expect(container.length).toEqual(1)
  });

  it('should check pin code confirmation response', () => {
    const instance = content.instance();
    instance.dialog = { dismiss: jest.fn() };
    content.setProps({ error: 'WRONG' });
    expect(content.find('Styled(Text)')).toHaveLength(4)

    instance.componentWillReceiveProps({ fetching: false, success: true });
    expect(instance.dialog.dismiss).toHaveBeenCalled()
    expect(navigationSpy).toHaveBeenCalled()
    navigationSpy.mockClear()
  })

  it('should check Prop matching with initialState', () => {
    const { fetching, error, success } = initialState.pinCode;
    expect(container.prop('fetching')).toEqual(fetching)
    expect(container.prop('error')).toEqual(error)
    expect(container.prop('success')).toEqual(success)
  });

  it('should call the confirmation function', () => {
    const instance = content.instance();
    const pinCode = '1234'
    instance.dialog = { show: jest.fn() }
    content.find('ConfirmationCodeInput').simulate('fulfill', pinCode)
    expect(instance.dialog.show).toHaveBeenCalled()
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(PinCodeActions.pinCodeRequest(pinCode));
    dispatchSpy.mockClear();
  })

  it('should call the navigation go back function', () => {
    content.find('Styled(Button)').at(0).simulate('press');
    expect(navigationSpy).toHaveBeenCalled();
    expect(navigationSpy).toHaveBeenCalledWith(NavigationActions.back());
    navigationSpy.mockClear()
  })

  it('should show activity indicator when fetching', () => {
    content.setProps({ fetching: true });
    expect(content.find('ActivityIndicator')).toHaveLength(1)
  })
});