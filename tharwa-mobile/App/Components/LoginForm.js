import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Button, Item, Input, Icon } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import { emailValidators, passwordValidators } from '../Helpers/validators'
import styles from './Styles/LoginFormStyle'

export class EmailInput extends Component {
  render() {
    const { input, meta, onEnter } = this.props;
    return (
      <View>
        <Item regular style={styles.inputTxt}>
          <Icon name='person' style={styles.inputIcon} />
          <Input
            placeholder={I18n.t('emailPlaceholder')}
            keyboardType='email-address'
            returnKeyType='next'
            autoCapitalize='none'
            onSubmitEditing={onEnter}
            value={input.value}
            editable={input.editable}
            autoFocus={false}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            style={styles.whiteColor}
            placeholderTextColor="#ffffff90" />
          {meta.invalid && meta.touched && <Icon style={{ color: '#e74c3cb0' }} name='md-alert' />}
        </Item>
        {meta.invalid && meta.touched && <Text style={styles.errorText}> {meta.error} </Text>}
      </View>
    );
  }
}

export class PasswordInput extends Component {
  constructor(props) {
    super(props)
    this.state = { showPassword: false }
  }

  togglePassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  render() {
    const { input, meta, refField } = this.props;
    const { showPassword } = this.state;
    return (
      <View>
        <Item regular style={styles.inputTxt}>
          <Icon name='lock' style={styles.inputIcon} />
          <Input
            ref={refField}
            placeholder={I18n.t('passwordPlaceholder')}
            secureTextEntry={!showPassword}
            placeholderTextColor="#ffffff90"
            returnKeyType='go'
            selectionColor='#fff'
            autoCorrect={false}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.password}
            editable={input.editable}
            style={styles.whiteColor}
          />
          {
            (meta.invalid && meta.touched) ?
              <Icon style={{ color: '#e74c3cb0' }} name='md-alert' />
              : <Icon name={showPassword ? 'eye-off' : 'eye'} style={styles.inputIcon} onPress={this.togglePassword.bind(this)} />
          }
        </Item>
        {meta.invalid && meta.touched && <Text style={styles.errorText}> {meta.error} </Text>}
      </View>
    )
  }
}

const LoginForm = (props) => {

  return (
    <View style={styles.mainformContainer}>
      <ScrollView style={styles.inputContainer} keyboardShouldPersistTaps={'handled'}>
        <Field
          name={'email'}
          onEnter={() => {
            this.password.getRenderedComponent().refs.password._root.focus()
          }}
          component={EmailInput}
          editable={props.editable}
          validate={emailValidators}
        />

        <Field
          withRef
          ref={(componentRef) => this.password = componentRef}
          refField="password"
          name={'password'}
          component={PasswordInput}
          editable={props.editable}
          validate={passwordValidators}
        />
      </ScrollView>

      <Button style={styles.loginBtn} onPress={props.handleSubmit} >
        <Text style={{ color: '#16a085' }}>{I18n.t('signIn')}</Text>
      </Button>
      <Button transparent style={styles.signupBtn} onPress={props.onRegisterClicked}>
        <Text style={styles.whiteColor}>{I18n.t('noAccount')}</Text>
      </Button>
    </View>
  )
}


export default reduxForm({ form: 'signIn' })(LoginForm);