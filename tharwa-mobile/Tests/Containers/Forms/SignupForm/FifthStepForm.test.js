import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { FifthStepForm } from '../../../../App/Containers/Forms/SignupForm/FifthStepForm'

describe('Signup FifthStepForm Component', () => {
  let container, content, instance;

  beforeAll(() => {
    container = shallow(
      <FifthStepForm
        handleSubmit={() => { }}
        previousPage={() => { }}
        picture={''}
      />
    );
    instance = container.instance()
    content = container.dive()
  })

  it("should render correctly", () => {
    expect(container).toHaveLength(1);
    expect(content.find('Field')).toHaveLength(1)
    expect(content.find('Image')).toHaveLength(1)
  });

  it("should show hint text correctly", () => {
    const textComponent = content.find('Styled(Text)')
    expect(textComponent).toHaveLength(1)
    expect(textComponent.childAt(0).text()).toBe("Voulez vous utiliser votre compte pour payer vos employés ?")
  });
})