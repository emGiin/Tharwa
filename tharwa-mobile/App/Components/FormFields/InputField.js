import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Item, Input, Icon } from 'native-base'
import styles from '../Styles/FormFieldStyles'


class InputField extends Component {
  render() {
    const {
      input, meta, refField, onEnter, icon,
      editable, placeholder, returnKeyType, keyboardType
    } = this.props;
    const hasValue = !!input.value
    return (
      <View style={{ flex: 1 }}>
        {
          hasValue &&
          <Text style={styles.placeholder}>
            {placeholder}
          </Text>
        }
        <Item regular style={[styles.inputTxt, !hasValue && { marginTop: 10 }]}>
          <Icon name={icon} style={styles.inputIcon} />
          <Input
            ref={refField}
            placeholder={placeholder}
            returnKeyType={returnKeyType}
            autoCapitalize={'words'}
            onSubmitEditing={onEnter}
            editable={editable}
            selectionColor={'#fff'}
            placeholderTextColor={"#ffffff90"}
            keyboardType={keyboardType}
            autoFocus={false}
            style={styles.whiteColor}
            {...input} />
          {meta.invalid && meta.touched && <Icon style={styles.alertIcon} name='md-alert' />}
        </Item>
        {meta.invalid && meta.touched && <Text style={styles.errorText}>{meta.error}</Text>}
      </View>
    );
  }
}

export { InputField }