import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import FullButton from '../../App/Components/FullButton'

describe('FullButton component', () => {
  let container, content;
  const spy = jest.fn();

  beforeAll(() => {
    container = shallow(<FullButton onPress={spy} text='test' />)
    content = container.dive()
  })

  it('should render correctly', () => {
    expect(content).toMatchSnapshot()
  })

  it('should call on press function', () => {
    container.simulate('press')
    expect(spy).toHaveBeenCalled()
  })
})