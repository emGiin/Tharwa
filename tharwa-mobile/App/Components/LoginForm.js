import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Button, Item, Input, Icon } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import styles from './Styles/LoginFormStyle'

// validators
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const emailValidators = [
  (val) => val ? undefined : 'Le champ Email est obligatoire',
  (val) => val && emailRegex.test(val) ? undefined : 'Le format d\'email est invalide'
]

const passwordValidators = [
  (val) => val ? undefined : 'Le champ Mot de passe est obligatoire',
  (val) => val && val.length >= 8 ? undefined : 'Le mot de passe doit comporter au moins 8 caractères'
]


class EmailInput extends Component {
  render() {
    const { input, meta, onEnter } = this.props;
    return (
      <View>
        <Item regular style={styles.inputTxt}>
          <Icon name='person' style={styles.inputIcon} />
          <Input
            placeholder='Email'
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
          {meta.invalid && meta.touched && <Icon style={{ color: '#e74c3cb0' }} name='close-circle' />}
        </Item>
        {meta.invalid && meta.touched && <Text style={styles.errorText}> {meta.error} </Text>}
      </View>
    );
  }
}

class PasswordInput extends Component {
  constructor(props) {
    super(props)
    this.state = { showPassword: false }
  }

  togglePassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  render() {
    const { input, meta, onEnter, refField } = this.props;
    const { showPassword } = this.state;
    return (
      <View>
        <Item regular style={styles.inputTxt}>
          <Icon name='lock' style={styles.inputIcon} />
          <Input
            ref={refField}
            placeholder='Password'
            secureTextEntry={!showPassword}
            placeholderTextColor="#ffffff90"
            returnKeyType='go'
            selectionColor='#fff'
            autoCorrect={false}
            onChangeText={input.onChange}
            onSubmitEditing={onEnter}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.password}
            editable={input.editable}
            style={styles.whiteColor}
          />
          {
            (meta.invalid && meta.touched) ?
              <Icon style={{ color: '#e74c3cb0' }} name='close-circle' />
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
          onEnter={props.handleSubmit}
        />
      </ScrollView>

      <Button style={styles.loginBtn} onPress={props.handleSubmit} >
        <Text style={{ color: '#16a085' }}>Se connecter</Text>
      </Button>
      <Button transparent style={styles.signupBtn} onPress={props.onRegisterClicked}>
        <Text style={styles.whiteColor}>Je n'ai pas de compte</Text>
      </Button>
    </View>
  )
}


export default reduxForm({ form: 'signIn' })(LoginForm);