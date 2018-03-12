import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Button } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import styles from './Styles/LoginFormStyle'
import { emailValidators, passwordValidators } from '../Helpers/validators'
import { EmailField, PasswordField } from './CommonFormFields'


const LoginForm = ({ editable, handleSubmit, onRegisterClicked }) => {
  const focusOnPassword = () => {
    this.password.getRenderedComponent().refs.password._root.focus()
  }

  return (
    <View style={styles.mainformContainer}>
      <ScrollView style={styles.inputContainer} keyboardShouldPersistTaps={'handled'}>
        <Field
          name={'email'}
          onEnter={focusOnPassword}
          placeholder={I18n.t('emailPlaceholder')}
          component={EmailField}
          editable={editable}
          validate={emailValidators}
        />

        <Field
          withRef
          ref={(componentRef) => this.password = componentRef}
          refField="password"
          name={'password'}
          placeholder={I18n.t('passwordPlaceholder')}
          component={PasswordField}
          editable={editable}
          validate={passwordValidators}
        />
      </ScrollView>

      <Button style={styles.loginBtn} onPress={handleSubmit} >
        <Text style={{ color: '#16a085' }}>{I18n.t('signIn')}</Text>
      </Button>
      <Button transparent style={styles.signupBtn} onPress={onRegisterClicked}>
        <Text style={styles.whiteColor}>{I18n.t('noAccount')}</Text>
      </Button>
    </View>
  )
}


export default reduxForm({ form: 'signIn' })(LoginForm);