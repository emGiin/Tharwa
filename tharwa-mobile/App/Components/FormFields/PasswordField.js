import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Item, Input, Icon } from 'native-base'
import styles from '../Styles/FormFieldStyles'

class PasswordField extends Component {
  constructor(props) {
    super(props)
    this.state = { showPassword: false }
  }

  togglePassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  render() {
    const { input, meta, refField, placeholder, onEnter } = this.props;
    const { showPassword } = this.state;
    return (
      <View>
        <Item regular style={styles.inputTxt}>
          <Icon name='lock' style={styles.inputIcon} />
          <Input
            ref={refField}
            placeholder={placeholder}
            secureTextEntry={!showPassword}
            placeholderTextColor={"#ffffff90"}
            returnKeyType='go'
            selectionColor={'#fff'}
            autoCorrect={false}
            autoCapitalize={'none'}
            onSubmitEditing={onEnter}
            {...input}
            editable={input.editable}
            style={styles.whiteColor}
          />
          {
            (meta.invalid && meta.touched) ?
              <Icon style={{ color: '#e74c3cb0' }} name='md-alert' />
              : <Icon name={!showPassword ? 'eye-off' : 'eye'} style={styles.inputIcon} onPress={this.togglePassword.bind(this)} />
          }
        </Item>
        {meta.invalid && meta.touched && <Text style={styles.errorText}>{meta.error}</Text>}
      </View>
    )
  }
}

export { PasswordField }