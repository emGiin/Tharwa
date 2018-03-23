import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { PickerField } from '../../../App/Components'

describe('Input Field Component', () => {
  let container, content, instance;
  const options = [
    { label: '1', value: 1 },
    { label: '2', value: 2 }
  ]
  const spy = jest.fn()

  beforeAll(() => {
    const props = { input: { onChange: spy }, meta: {}, options }
    container = shallow(<PickerField {...props} />)
    content = container.dive();
    instance = container.instance();
  })

  it('should render field', () => {
    expect(container).toHaveLength(1)
    expect(content.find('Styled(Icon)')).toHaveLength(1)
    expect(content.find('Styled(Text)')).toHaveLength(0)
    expect(instance.state.itemValue).toBe('placeholder')
  })

  it('should changed selected value', () => {
    content.find('Styled(PickerNB)').simulate('valueChange', 1)
    expect(instance.state.itemValue).toBe(1)
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(1)
  })

  it('should show field errors', () => {
    container.setProps({ meta: { invalid: true, touched: true, error: 'error' } })
    container.update()
    content = container.dive();
    expect(content.find('Styled(Icon)')).toHaveLength(2)
    expect(content.find('Styled(Text)')).toHaveLength(1)
  })
})