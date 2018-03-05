import React from 'react'
// import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native'
import { Text, Button, Item, Input, Icon } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import styles from './Styles/LoginFormStyle'

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const EmailInput = (props) => {
  const { input, meta } = props;

  console.tron.log(props, true)
  return (
    <View>
      <Item error={meta.invalid && meta.touched} regular style={styles.inputTxt}>
        <Icon name='person' style={styles.inputIcon} />
        <Input
          placeholder='Email'
          keyboardType='email-address'
          returnKeyType='next'
          autoCapitalize='none'
          value={input.value}
          editable={input.editable}
          autoFocus={false}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          style={styles.whiteColor}
          placeholderTextColor="#ffffff90" />
        {meta.invalid && meta.touched && <Icon name='close-circle' />}
      </Item>
      {meta.invalid && meta.touched && <Text style={styles.errorText}> {meta.error} </Text>}
    </View>
  );
}

const PasswordInput = (props) => {
  const { input, meta } = props;

  return (
    <View>
      <Item error={meta.invalid && meta.touched} regular style={styles.inputTxt}>
        <Icon name='lock' style={styles.inputIcon} />
        <Input
          placeholder='Password'
          ref={input => { this.PasswordInputRef = input }}
          secureTextEntry={!input.showPassword}
          placeholderTextColor="#ffffff90"
          returnKeyType='go'
          selectionColor='#fff'
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.password}
          editable={input.editable}
          style={styles.whiteColor}
        />
        {
          (meta.invalid && meta.touched) ?
            <Icon name='close-circle' />
            : <Icon name={input.showPassword ? 'eye-off' : 'eye'} style={styles.inputIcon} onPress={props.togglePassword} />
        }
      </Item>
      {meta.invalid && meta.touched && <Text style={styles.errorText}> {meta.error} </Text>}
    </View>
  );
}
// validators
const emailValidators = [
  (val) => val ? undefined : 'Email field is required',
  (val) => val && val.length >= 8 ? undefined : 'Email format is invalid'
]

const passwordValidators = [
  (val) => val ? undefined : 'Password field is required',
  (val) => val && val.length >= 8 ? undefined : 'Password must be at least 8 characters long'
]

const LoginForm = (props) => {
  // submit = () => {
  //   if (this.validateForm()) this.props.submit()
  // }

  // togglePassword = () => {
  //   this.setState({ showPassword: !this.state.showPassword })
  // }

  return (
    <View style={styles.centered}>
      <ScrollView style={styles.inputContainer} keyboardShouldPersistTaps={'handled'}>
        <Field
          name={'email'}
          component={EmailInput}
          editable={props.editable}
          validate={emailValidators}
        />

        <Field
          name={'password'}
          component={PasswordInput}
          editable={props.editable}
          validate={passwordValidators}
        />
      </ScrollView>

      <Button style={styles.loginBtn} onPress={props.handleSubmit} >
        <Text>Se connecter</Text>
      </Button>
      <Button transparent style={styles.signupBtn} onPress={props.onRegisterClicked}>
        <Text style={styles.whiteColor}>Je n'ai pas de compte</Text>
      </Button>
      <Text style={{ color: '#fff' }}>{JSON.stringify(props.error)}</Text>
    </View>
  )
}


export default reduxForm({
  form: 'signIn',
  validate: (values) => {
    const errors = {};
    errors.email = !values.email
      ? 'Email field is required'
      : !emailRegex.test(values.email)
        ? 'Email format is invalid'
        : undefined;

    errors.password = !values.password
      ? 'Password field is required'
      : values.password.length < 8
        ? 'Password must be at least 8 characters long'
        : undefined;
    return errors;
  },

  // shouldAsyncValidate: (params) => {
  //   return params.trigger === 'blur' && params.syncValidationPasses; // do not async validate on submit
  // }
})(LoginForm);