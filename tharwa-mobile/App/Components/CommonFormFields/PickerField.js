import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Item, Picker } from 'native-base'
import styles from '../../Styles/SignupFormStyle'

class PickerField extends Component {
  render() {
    const {
      input, meta, refField,
      editable, placeholder
    } = this.props;
    return (
      <View>
        <Picker
          placeholder={placeholder}
          ref={refField}
          disabled={!editable}
          iosHeader="Select one"
          mode="dropdown"
          selectedValue={input.value}
          onValueChange={input.onChange}
        >
          <Item label="Wallet" value="key0" />
          <Item label="ATM Card" value="key1" />
          <Item label="Debit Card" value="key2" />
          <Item label="Credit Card" value="key3" />
          <Item label="Net Banking" value="key4" />
        </Picker>
        {meta.invalid && meta.touched && <Text style={styles.errorText}> {meta.error} </Text>}
      </View>
    )
  }
}

export default PickerField