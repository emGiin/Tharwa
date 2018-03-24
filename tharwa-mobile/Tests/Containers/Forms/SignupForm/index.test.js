import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import SignupForm from '../../../../App/Containers/Forms/SignupForm'

describe('Signup FirstStepForm Component', () => {
  let container, content, instance;

  beforeAll(() => {
    container = shallow(
      <SignupForm
        onSubmit={() => { }}
      />
    );
    instance = container.instance()
    content = container.dive()
  })

  it("should render correctly", () => {
    expect(container).toHaveLength(1);
    expect(instance.state.currentPage).toBe(1)
    expect(content.find('Header')).toHaveLength(1)
    expect(content.find('Connect(ReduxForm)')).toHaveLength(1)
  });

  describe('form steps controllers', () => {
    it("should change to next form step", () => {
      instance.nextPage()
      expect(instance.state.currentPage).toBe(2)
    });

    it("should change to previous form step", () => {
      instance.previousPage()
      expect(instance.state.currentPage).toBe(1)
    });
  })

  describe('current form step', () => {
    let currentPage = 1

    it('should show first step form', () => {
      const { CurrentFormComponent, formStepProps } = instance.getNextComponent(currentPage++)
      expect(formStepProps.onSubmit).toBe(instance.nextPage)
      expect(formStepProps.previousPage).toBeUndefined()
      expect(CurrentFormComponent).toBe(instance.formSteps[0])
    })

    it('should show second step form', () => {
      const { CurrentFormComponent, formStepProps } = instance.getNextComponent(currentPage++)
      expect(formStepProps.onSubmit).toBe(instance.nextPage)
      expect(formStepProps.previousPage).toBe(instance.previousPage)
      expect(CurrentFormComponent).toBe(instance.formSteps[1])
    })

    it('should show third step form', () => {
      const { CurrentFormComponent, formStepProps } = instance.getNextComponent(currentPage++)
      expect(formStepProps.onSubmit).toBe(instance.nextPage)
      expect(formStepProps.previousPage).toBe(instance.previousPage)
      expect(CurrentFormComponent).toBe(instance.formSteps[2])
    })

    it('should show fourth step form', () => {
      const { CurrentFormComponent, formStepProps } = instance.getNextComponent(currentPage++)
      expect(formStepProps.onSubmit).toBe(instance.nextPage)
      expect(formStepProps.previousPage).toBe(instance.previousPage)
      expect(CurrentFormComponent).toBe(instance.formSteps[3])
    })

    it('should show fifth step form', () => {
      const { CurrentFormComponent, formStepProps } = instance.getNextComponent(currentPage++)
      expect(formStepProps.onSubmit).toBe(instance.props.onSubmit)
      expect(formStepProps.previousPage).toBe(instance.previousPage)
      expect(CurrentFormComponent).toBe(instance.formSteps[4])
    })
  })
})