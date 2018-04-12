import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../../App/Components'

describe('Header component', () => {
  let container, content;
  const spy = jest.fn();
  const iconName = 'md-arrow-round-back'

  beforeAll(() => {
    container = shallow(
      <Header
        onLeftButtonPress={spy}
        icon={iconName}
        text='test'
      />
    );
    content = container.dive()
  })

  it('should render correcty', () => {
    expect(container).toHaveLength(1)
  })

  it('should display return button', () => {
    const icon = content.find('Styled(Icon)')
    expect(icon).toHaveLength(1)
    expect(icon.props().name).toBe(iconName)
  })

  it('should default icon to left arrow', () => {
    container.setProps({ icon: undefined })
    container.update()
    content = container.dive()
    const icon = content.find('Styled(Icon)')
    expect(icon).toHaveLength(1)
    expect(icon.props().name).toBe(iconName)
  })

  it('should call on press function', () => {
    content.find('Styled(Button)').simulate('press')
    expect(spy).toHaveBeenCalled()
  })

  it('should not display Button and Icon', () => {
    container.setProps({ onLeftButtonPress: null })
    container.update()
    content = container.dive()
    expect(content.find('Styled(Left)')).toHaveLength(0)
    expect(content.find('Styled(Button)')).toHaveLength(0)
    expect(content.find('Styled(Icon)')).toHaveLength(0)
  })
})