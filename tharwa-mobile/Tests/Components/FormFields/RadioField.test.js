import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { RadioField } from '../../../App/Components'

describe('Input Field Component', () => {
  let container, instance;
  const options = [
    { label: '1', value: 1 },
    { label: '2', value: 2 }
  ]
  const spy = jest.fn()

  beforeAll(() => {
    const props = { input: { onChange: spy }, meta: {}, radio_props: options }
    container = shallow(<RadioField {...props} />)
    instance = container.instance();
  })

  it('should render field', () => {
    const { value } = options[0]
    expect(container).toHaveLength(1)
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(value)
    expect(instance.state.value).toBe(value)
    spy.mockClear()
  })

  it('should changed selected value', () => {
    const { value } = options[1]
    container.simulate('press', value)
    expect(instance.state.value).toBe(value)
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(value)
    spy.mockClear()
  })
})