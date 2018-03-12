import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Item, Input, Icon } from 'native-base'
import styles from '../Styles/SignupFormStyle'

export class InputField extends Component {
  render() {
    const {
      input, meta, refField, onEnter, icon,
      editable, placeholder, returnKeyType
    } = this.props;

    return (
      <View>
        <Item regular style={styles.inputTxt}>
          <Icon name={icon} style={styles.inputIcon} />
          <Input
            ref={refField}
            placeholder={placeholder}
            returnKeyType={returnKeyType}
            autoCapitalize='words'
            onSubmitEditing={onEnter}
            editable={editable}
            placeholderTextColor="#ffffff90"
            autoFocus={false}
            style={styles.whiteColor}
            {...input} />
          {meta.invalid && meta.touched && <Icon style={styles.alertIcon} name='md-alert' />}
        </Item>
        {meta.invalid && meta.touched && <Text style={styles.errorText}> {meta.error} </Text>}
      </View>
    );
  }
}

export default InputField