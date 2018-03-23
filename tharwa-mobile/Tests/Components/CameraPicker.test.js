import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { CameraPicker } from '../../App/Components'

describe('FullButton component', () => {
  let container, content;
  const spy = jest.fn();

  beforeAll(() => {
    container = shallow(
      <CameraPicker
        onCapture={spy}
        input={{ onChange: spy }}
      />
    );
    content = container.dive()
  })

  it('should render correcty', () => {
    expect(container).toHaveLength(1)
  })

  it('should call on capture and change functions', () => {
    const picture = 'data:image/jpeg;base64,picture';
    container.simulate('press')
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith(picture)
    spy.mockClear()
  })

  it('should call only on capture functions', () => {
    container.setProps({ input: undefined })
    container.update()
    const picture = 'data:image/jpeg;base64,picture';
    container.simulate('press')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(picture)
    spy.mockClear()
  })

  it('should should call buttonComponent render function', () => {
    container.setProps({ buttonComponent: spy })
    container.update()
    expect(spy).toHaveBeenCalled()
    spy.mockClear()
  })
})