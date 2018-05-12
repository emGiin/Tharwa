import 'react-native'
import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import { MainScreen } from '../../../App/Containers/Screens'

describe('Registration Screen container', () => {
  const initialState = {
    account: {
      information: {}
    }
  }
  const mockStore = configureStore()
  const dispatchSpy = jest.fn();
  const navigationSpy = jest.fn();
  let store, container;

  beforeAll(() => {
    store = mockStore(initialState);
    store.dispatch = dispatchSpy;
    container = shallow(
      <MainScreen navigation={{ navigate: navigationSpy }} />,
      { context: { store } }
    )
  })

  it('should render the component', () => {
    expect(container).toHaveLength(1)
  });
});