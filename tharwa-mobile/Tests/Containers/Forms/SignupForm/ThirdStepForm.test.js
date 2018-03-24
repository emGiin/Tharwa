import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { ThirdStepForm } from '../../../../App/Containers/Forms/SignupForm/ThirdStepForm'

describe('Signup ThirdStepForm Component', () => {
  let container, content, instance;
  const spy = jest.fn();

  beforeAll(() => {
    container = shallow(
      <ThirdStepForm
        handleSubmit={() => { }}
        previousPage={() => { }}
      />
    );
    instance = container.instance()
    instance.focusOn = spy
    content = container.dive()
  })

  it("should render correctly", () => {
    expect(container).toHaveLength(1);
    expect(content.find('Field')).toHaveLength(3)
  });

  describe('input focus', () => {
    it('should focus on firstName', () => {
      content.find('Field').at(0).simulate('enter')
      expect(spy).toHaveBeenCalledWith('address')
    })
  })
})