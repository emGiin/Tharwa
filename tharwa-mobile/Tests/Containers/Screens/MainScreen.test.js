import 'react-native'
import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import { MainScreen } from '../../../App/Containers/Screens'

describe('Registration Screen container', () => {
  const initialState = {}
  const mockStore = configureStore()
  const dispatchSpy = jest.fn();
  const navigationSpy = jest.fn();
  let store, container, content;

  beforeAll(() => {
    store = mockStore(initialState);
    store.dispatch = dispatchSpy;
    container = shallow(
      <MainScreen navigation={{ navigate: navigationSpy }} />,
      { context: { store } }
    )
    content = container.dive()
  })

  it('should render the component', () => {
    expect(container).toHaveLength(1)
    expect(content.find('KeyboardAvoidingView')).toHaveLength(1)
    const textComponent = content.find('Text')
    expect(textComponent).toHaveLength(1)
    expect(textComponent.childAt(0).text()).toBe('Bienvenue')
  });
});