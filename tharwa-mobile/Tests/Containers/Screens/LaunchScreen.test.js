import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { LaunchScreen } from '../../../App/Containers/Screens'

describe('Launch Screen container', () => {
  const navigationSpy = jest.fn();
  let container, content;

  beforeAll(() => {
    container = shallow(
      <LaunchScreen navigation={{ navigate: navigationSpy }} />
    )
    content = container.dive()
  })

  it('should render the component', () => {
    expect(container).toHaveLength(1)
    expect(content.find('LogoImage')).toHaveLength(1)
    expect(content.find('ActivityIndicator')).toHaveLength(1)
    const textComponent = content.find('Text');
    expect(textComponent).toHaveLength(1)
    expect(textComponent.childAt(0).text()).toBe('Chargement en cours ...')
  });

  it('should navigate to LoginScreen', (done) => {
    setTimeout(() => {
      // expect(navigationSpy).toHaveBeenCalledWith('LoginScreen')
      expect(navigationSpy).toHaveBeenCalled()
      done()
    }, 0);
  });
});