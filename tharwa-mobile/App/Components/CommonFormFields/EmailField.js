import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Item, Input, Icon } from 'native-base'
import styles from '../Styles/LoginFormStyle'

class EmailInput extends Component {
  render() {
    const { input, meta, onEnter, placeholder, refField } = this.props;
    return (
      <View>
        <Item regular style={styles.inputTxt}>
          <Icon name='ios-at' style={styles.inputIcon} />
          <Input
            placeholder={placeholder}
            ref={refField}
            keyboardType='email-address'
            returnKeyType='next'
            autoCapitalize='none'
            onSubmitEditing={onEnter}
            {...input}
            style={styles.whiteColor}
            placeholderTextColor="#ffffff90" />
          {meta.invalid && meta.touched && <Icon style={styles.alertIcon} name='md-alert' />}
        </Item>
        {meta.invalid && meta.touched && <Text style={styles.errorText}> {meta.error} </Text>}
      </View>
    );
  }
}

export default EmailInput