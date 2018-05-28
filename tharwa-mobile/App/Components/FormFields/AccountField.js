import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Item, Input, Icon } from 'native-base'
import styles from '../Styles/FormFieldStyles'


class AccountField extends Component {
  render() {
    const {
      input, meta, refField, onEnter, selectedBank = '_ _ _',
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
        <View style={{
          flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'
        }}>

          <Text style={{
            color: '#fff', marginLeft: 2, paddingHorizontal: 10, paddingBottom: 5, backgroundColor: '#00000040',
            borderColor: '#00000070',
            borderRadius: 3, lineHeight: 35
          }}>
            {selectedBank}
          </Text>
          <Item regular style={[styles.inputTxt, { flex: 1 }, !hasValue && { marginTop: 10 }]}>
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
          <Text style={{
            color: '#fff', marginLeft: 2, paddingHorizontal: 10, paddingBottom: 5, backgroundColor: '#00000040',
            borderColor: '#00000070',
            borderRadius: 3, lineHeight: 35
          }}>
            DZD
          </Text>
        </View>
        {meta.invalid && meta.touched && <Text style={styles.errorText}>{meta.error}</Text>}
      </View>
    );
  }
}

export { AccountField }