import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { InputField } from '../../../App/Components'

describe('Input Field Component', () => {
  let wrapper, content;

  beforeAll(() => {
    const props = { input: {}, meta: {} }
    wrapper = shallow(<InputField {...props} />)
    content = wrapper.dive();
  })

  it('should render input', () => {
    expect(wrapper).toHaveLength(1)
    expect(content.find('Styled(Icon)')).toHaveLength(1)
    expect(content.find('Styled(Text)')).toHaveLength(0)
  })

  it('should not show input errors', () => {
    wrapper.setProps({ meta: { invalid: true, touched: true, error: 'error' } })
    wrapper.update()
    content = wrapper.dive();
    expect(content.find('Styled(Icon)')).toHaveLength(2)
    expect(content.find('Styled(Text)')).toHaveLength(1)
  })
})