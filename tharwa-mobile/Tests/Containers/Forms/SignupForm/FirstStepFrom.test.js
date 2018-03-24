import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { FirstStepForm } from '../../../../App/Containers/Forms/SignupForm/FirstStepForm'

describe('LoginForm Component', () => {
  let container, content, instance;
  const spy = jest.fn();

  beforeAll(() => {
    container = shallow(
      <FirstStepForm
        handleSubmit={() => { }}
      />
    );
    instance = container.instance()
    instance.focusOn = spy
    content = container.dive()
  })

  it("should render correctly", () => {
    expect(container).toHaveLength(1);
  });

  describe('password matching', () => {
    it("should no show any errors", () => {
      const password = 'password'
      container.setProps({ password, passwordConfirmation: password })
      container.update()
      content = container.dive()
      expect(content.find('Styled(Text)')).toHaveLength(0)
    });

    it("should show any errors", () => {
      const password = 'password'
      const passwordConfirmation = 'passwordc'
      container.setProps({ password, passwordConfirmation })
      container.update()
      content = container.dive()
      const errorComponent = content.find('Styled(Text)')
      expect(errorComponent).toHaveLength(1)
      expect(errorComponent.childAt(0).text()).toBe('Les mots de passe ne correspondent pas')
    });
  })

  describe('input focus', () => {
    it('should focus on password', () => {
      content.find('Field').at(0).simulate('enter')
      expect(spy).toHaveBeenCalledWith('password')
    })

    it('should focus on password confirmation', () => {
      content.find('Field').at(1).simulate('enter')
      expect(spy).toHaveBeenCalledWith('passwordConfirmation')
    })
  })
})