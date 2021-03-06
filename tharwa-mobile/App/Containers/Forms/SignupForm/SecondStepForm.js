import React, { Component } from 'react'
import { Container, Content } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import { InputField, NextPrevious } from '../../../Components'
import { nameValidators } from '../../../Helpers/validators'
import styles from '../Styles/SignupFormStyle'

export class SecondStepForm extends Component {
  componentDidMount() {
    this.focusOn('lastName')
  }

  focusOn = (field) => {
    /* istanbul ignore next */
    if (this[field] && this[field].getRenderedComponent)
      this[field].getRenderedComponent().refs[field]._root.focus()
  }

  render() {
    const { editable, handleSubmit, previousPage } = this.props;
    return (
      <Container style={styles.mainformContainer}>
        <Content style={styles.inputContainer} >
          <Field
            name={'lastName'}
            withRef
            refField="lastName"
            ref={/* istanbul ignore next */ref => this.lastName = ref}
            onEnter={() => this.focusOn('firstName')}
            component={InputField}
            editable={editable}
            validate={nameValidators}
            returnKeyType={'next'}
            placeholder={I18n.t('lastName')}
          />

          <Field
            withRef
            ref={/* istanbul ignore next */ref => this.firstName = ref}
            refField="firstName"
            name={'firstName'}
            component={InputField}
            editable={editable}
            validate={nameValidators}
            returnKeyType={'done'}
            placeholder={I18n.t('firstName')}
          />
        </Content>
        <NextPrevious onPrevious={previousPage} onSubmit={handleSubmit} />
      </Container>
    )
  }
}


export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(SecondStepForm);