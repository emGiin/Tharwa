import React, { Component } from 'react'
import { Container, Content, Text } from 'native-base'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { emailValidators, passwordValidators } from '../../../Helpers/validators'
import { EmailField, PasswordField, NextPrevious } from '../../../Components'
import styles from '../Styles/SignupFormStyle'


export class FirstStepForm extends Component {
  componentDidMount() {
    this.focusOn('email')
  }

  focusOn = (field) => {
    /* istanbul ignore next */
    if (this[field] && this[field].getRenderedComponent)
      this[field].getRenderedComponent().refs[field]._root.focus()
  }

  validatePasswords = ({ password, passwordConfirmation }) => {
    if (
      !passwordValidators[0](password) &&
      !passwordValidators[0](password) &&
      !passwordValidators[1](passwordConfirmation) &&
      !passwordValidators[1](passwordConfirmation) &&
      password !== passwordConfirmation
    ) {
      return <Text style={{ color: '#e74c3cd0', fontSize: 13 }}>{I18n.t('passwordsDoNotMatch')}</Text>
    } else return null;
  }

  render() {
    const { editable, handleSubmit } = this.props;
    const error = this.validatePasswords(this.props);
    return (
      <Container style={styles.mainformContainer}>
        <Content style={styles.inputContainer} >
          <Field
            withRef
            refField="email"
            ref={/* istanbul ignore next */ref => this.email = ref}
            name={'email'}
            placeholder={I18n.t('emailPlaceholder')}
            onEnter={() => this.focusOn('password')}
            component={EmailField}
            editable={editable}
            validate={emailValidators}
          />

          <Field
            withRef
            ref={/* istanbul ignore next */ref => this.password = ref}
            refField="password"
            name={'password'}
            onEnter={() => this.focusOn('passwordConfirmation')}
            placeholder={I18n.t('passwordPlaceholder')}
            component={PasswordField}
            editable={editable}
            validate={passwordValidators}
          />

          <Field
            withRef
            ref={/* istanbul ignore next */ref => this.passwordConfirmation = ref}
            refField="passwordConfirmation"
            name={'passwordConfirmation'}
            placeholder={I18n.t('passwordConfitmationPlaceholder')}
            component={PasswordField}
            editable={editable}
            validate={passwordValidators}
          />
          {error}
        </Content>
        <NextPrevious onSubmit={handleSubmit} disableSubmit={!!error} />
      </Container>
    )
  }
}

let StepForm = reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(FirstStepForm);

// connect our component again to get some additional state
StepForm = connect(
  /* istanbul ignore next */
  state => ({
    password: formValueSelector('signup')(state, 'password'),
    passwordConfirmation: formValueSelector('signup')(state, 'passwordConfirmation')
  })
)(StepForm)

export default StepForm