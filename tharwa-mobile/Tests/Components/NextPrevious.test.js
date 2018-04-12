import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { NextPrevious } from '../../App/Components'

describe('NextPrevious component', () => {
  let container, content;
  const onPreviousSpy = jest.fn();
  const onSubmitSpy = jest.fn();

  beforeAll(() => {
    container = shallow(
      <NextPrevious
        onPrevious={onPreviousSpy}
        onSubmit={onSubmitSpy}
      />
    );
    content = container.dive()
  })

  it('should render correcty', () => {
    expect(container).toHaveLength(1)
    expect(content.find('Styled(Button)')).toHaveLength(2)
  })

  describe('previous button', () => {
    it('should show on previous text', () => {
      const previousButtonText = content.find('Styled(Text)').at(0)
      expect(previousButtonText.childAt(0).text()).toBe('Précédant')
    })

    it('should call on previous function', () => {
      const previousButton = content.find('Styled(Button)').at(0)
      previousButton.simulate('press')
      expect(onPreviousSpy).toHaveBeenCalled()
      onPreviousSpy.mockClear()
    })

    it('should not render previous button', () => {
      container.setProps({ onPrevious: undefined })
      container.update()
      content = container.dive()
      expect(content.find('Styled(Button)')).toHaveLength(1)
    })

    it('should not call on previous function', () => {
      const previousButton = content.find('Styled(Button)').at(0)
      previousButton.simulate('press')
      expect(onPreviousSpy).toHaveBeenCalledTimes(0)
    })
  })

  describe('Submit button', () => {
    it('should have submit with next icon', () => {
      const submitIcon = content.find('Styled(Icon)').at(0)
      expect(submitIcon.props().name).toBe('ios-arrow-forward-outline')
    })

    it('should show on submit text', () => {
      const submitButtonText = content.find('Styled(Text)').at(1)
      expect(submitButtonText.childAt(0).text()).toBe('Suivant')
    })

    it('should have submit with check icon', () => {
      container.setProps({ isFinal: true })
      container.update()
      content = container.dive()
      const submitIcon = content.find('Styled(Icon)').at(0)
      expect(submitIcon.props().name).toBe('ios-checkmark-circle')
    })

    it('should show on submit text', () => {
      const submitButtonText = content.find('Styled(Text)').at(1)
      expect(submitButtonText.childAt(0).text()).toBe('Confirmer')
    })

    it('should call on submit function', () => {
      const submitButton = content.find('Styled(Button)').at(0)
      submitButton.simulate('press')
      expect(onSubmitSpy).toHaveBeenCalled()
      onSubmitSpy.mockClear()
    })

    it('should not call on previous function', () => {
      container.setProps({ disableSubmit: true })
      container.update()
      content = container.dive()
      const submitButton = content.find('Styled(Button)').at(0)
      submitButton.simulate('press')
      expect(onSubmitSpy).toHaveBeenCalledTimes(0)
      onSubmitSpy.mockClear()
    })
  })
})