import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'
import { InputField, PickerField } from './'
import styles from './Styles/CurrencyConverterStyles'

const CurrencyConverter = ({
  from, to, currencies,
  handleInputChange, handleSelectChange
}) => (
    <View>
      <Text style={styles.title}>{"Convertisseur "}</Text>
      <View style={styles.valueContainer}>
        <InputField
          keyboardType={'numeric'} returnKeyType={'done'}
          input={{ onChangeText: handleInputChange('from'), value: from.value }} />
        <Icon name={'ios-swap'} style={styles.icon} />
        <InputField
          keyboardType={'numeric'} returnKeyType={'done'}
          input={{ onChangeText: handleInputChange('to'), value: to.value }} />
      </View>
      <View style={styles.currenciesContainer}>
        <PickerField
          options={currencies} initialValue={currencies[0]}
          input={{ onChange: handleSelectChange('from'), value: from.currency }} />
        <View style={styles.separator} />
        <PickerField
          options={currencies} initialValue={currencies[1]}
          input={{ onChange: handleSelectChange('to'), value: to.currency }} />
      </View>
    </View>
  )

export { CurrencyConverter }