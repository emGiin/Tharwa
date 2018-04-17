import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { AlertMessage } from '../../App/Components'

describe('AlertMessage component', () => {
  let container, content;
  beforeAll(() => {
    container = shallow(<AlertMessage title='howdy' />)
    content = container.dive()
  })

  it('should render correctly if show is true', () => {
    expect(content).toMatchSnapshot()
  })


  it('should not render if show is false', () => {
    container.setProps({ show: false })
    container.update()
    expect(content).toMatchSnapshot()
  })
})
