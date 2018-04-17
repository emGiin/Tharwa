import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { FourthStepForm } from '../../../../App/Containers/Forms/SignupForm/FourthStepForm'

describe('Signup FourthStepForm Component', () => {
  let container, content, instance;

  beforeAll(() => {
    container = shallow(
      <FourthStepForm
        handleSubmit={() => { }}
        previousPage={() => { }}
      />
    );
    content = container.dive()
    instance = container.instance()
  })

  it("should render correctly", () => {
    expect(container).toHaveLength(1);
    expect(content.find('Field')).toHaveLength(1)
    expect(instance.state.picture).toBe('')
  });

  it("should display hint text correctly", () => {
    const textComponent = content.find('Styled(Text)')
    expect(textComponent).toHaveLength(1);
    expect(textComponent.childAt(0).text()).toBe("Veuillez vous prendre en photo pour votre compte bancaire en cliquant sur l'image ci-dessous")
  });

  it("should change state", () => {
    const picture = 'picture'
    instance.capturePicture(picture)
    expect(instance.state.picture).toBe(picture)
  });
})