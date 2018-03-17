import React, { Component } from 'react'
import { Container, Content } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import { emailValidators, passwordValidators } from '../../../Helpers/validators'
import { EmailField, PasswordField, NextPrevious } from '../../../Components'
import styles from '../Styles/SignupFormStyle'


class FirstStepForm extends Component {
  componentDidMount() {
    this.focusOn('email')
  }

  focusOn = (field) => {
    this[field].getRenderedComponent().refs[field]._root.focus()
  }

  render() {
    const { editable, handleSubmit } = this.props;
    return (
      <Container style={styles.mainformContainer}>
        <Content style={styles.inputContainer} >
          <Field
            withRef
            refField="email"
            ref={ref => this.email = ref}
            name={'email'}
            placeholder={I18n.t('emailPlaceholder')}
            onEnter={() => this.focusOn('password')}
            component={EmailField}
            editable={editable}
            validate={emailValidators}
          />

          <Field
            withRef
            ref={ref => this.password = ref}
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
            ref={ref => this.passwordConfirmation = ref}
            refField="passwordConfirmation"
            name={'passwordConfirmation'}
            placeholder={I18n.t('passwordConfitmationPlaceholder')}
            component={PasswordField}
            editable={editable}
            validate={passwordValidators}
          />
          {/* TODO: add password matching validation */}
        </Content>
        <NextPrevious onSubmit={handleSubmit}/>
      </Container>
    )
  }
}


export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(FirstStepForm);