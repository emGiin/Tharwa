import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { PasswordField } from '../../../App/Components'

describe('LoginForm Component', () => {
  let wrapper, content;

  beforeAll(() => {
    const props = { input: {}, meta: {} }
    wrapper = shallow(<PasswordField {...props} />)
    content = wrapper.dive();
  })

  it('should render password input', () => {
    expect(wrapper).toHaveLength(1)
    expect(content.find('Styled(Icon)')).toHaveLength(2)
    expect(content.find('Styled(Text)')).toHaveLength(0)
    expect(content.find('Styled(Icon)').at(1).props().name).toBe('eye')
  })

  it('should render password input', () => {
    wrapper.setProps({ meta: { invalid: true, touched: true, error: 'error' } })
    wrapper.update()
    content = wrapper.dive();
    expect(content.find('Styled(Icon)')).toHaveLength(2)
    expect(content.find('Styled(Text)')).toHaveLength(1)
    expect(content.find('Styled(Icon)').at(1).props().name).toBe('md-alert')
  })

  it('should show password value input', () => {
    wrapper.setProps({ meta: {} })
    wrapper.instance().togglePassword()
    wrapper.update()
    content = wrapper.dive();
    expect(content.find('Styled(Icon)')).toHaveLength(2)
    expect(content.find('Styled(Icon)').at(1).props().name).toBe('eye-off')
  })
})