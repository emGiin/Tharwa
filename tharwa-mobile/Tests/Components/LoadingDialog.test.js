import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { LoadingDialog } from '../../App/Components'

describe('LoadinDialog component', () => {
  let container, content, instance;
  const spy = jest.fn();

  beforeAll(() => {
    container = shallow(
      <LoadingDialog
        init={spy}
        success={false}
        error={null}
        defaultTitle={'title'}
        defaultMessage={'message'}>
        content
      </LoadingDialog>
    );
    content = container.dive()
    instance = container.instance()
  })

  it('should render correctly', () => {
    expect(container).toHaveLength(1)
  })

  // it('should call init function', () => {
  // console.warn(content.find('Dialog').debug());
  // TODO find a way to test ref functions
  // })

  it('should show default content', () => {
    const dContent = instance.getDialogContent()
    expect(dContent.dialogTitle).toBe('title')
    expect(dContent.dialogMessage).toBe('message')
    expect(dContent.dialogContent).toEqual('content')
  })

  it('should show default fetching content', () => {
    container.setProps({ fetching: true })
    container.update()
    content = container.dive()
    const dContent = instance.getDialogContent()
    expect(dContent.dialogTitle).toBe('Requête en cours')
    expect(dContent.dialogMessage).toBe('La requête est en cours\n de traitement')
    expect(content.find('ActivityIndicator')).toHaveLength(1)
  })

  it('should show default error content', () => {
    const error = 'error'
    container.setProps({ fetching: false, error })
    container.setState({ new: false })
    container.update()
    content = container.dive()
    const dContent = instance.getDialogContent()
    expect(dContent.dialogTitle).toBe('Erreur')
    expect(dContent.dialogMessage).toBe(error)
    expect(dContent.dialogContent).toBeDefined()
    expect(content.find('DialogButton')).toHaveLength(1)
    expect(content.find('ActivityIndicator')).toHaveLength(0)
  })

  it('should dismiss error dialog', () => {
    const dismissSpy = jest.fn()
    instance.dialog = { dismiss: dismissSpy }
    content.find('DialogButton').simulate('press')
    expect(dismissSpy).toHaveBeenCalled()
  })
})