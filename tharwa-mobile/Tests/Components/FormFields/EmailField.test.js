import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { EmailField } from '../../../App/Components'

describe('LoginForm Component', () => {
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

  it('should not show email errors', () => {
    wrapper.setProps({ meta: { invalid: true, touched: true, error: 'error' } })
    wrapper.update()
    content = wrapper.dive();
    expect(content.find('Styled(Icon)')).toHaveLength(2)
    expect(content.find('Styled(Text)')).toHaveLength(1)
  })
})