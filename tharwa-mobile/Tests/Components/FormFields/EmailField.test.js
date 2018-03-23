import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { EmailField } from '../../../App/Components'

describe('Email Field Component', () => {
  let wrapper, content;

  beforeAll(() => {
    const props = { input: {}, meta: {} }
    wrapper = shallow(<EmailField {...props} />)
    content = wrapper.dive();
  })

  it('should render email input', () => {
    expect(wrapper).toHaveLength(1)
    expect(content.find('Styled(Icon)')).toHaveLength(1)
    expect(content.find('Styled(Text)')).toHaveLength(0)
  })

  it('should show email errors', () => {
    const error = 'error'
    wrapper.setProps({ meta: { invalid: true, touched: true, error } })
    wrapper.update()
    content = wrapper.dive();
    expect(content.find('Styled(Icon)')).toHaveLength(2)
    expect(content.find('Styled(Text)')).toHaveLength(1)
    expect(content.find('Styled(Text)').childAt(0).text()).toBe(error)
  })
})