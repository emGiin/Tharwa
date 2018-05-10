import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'
import { InputField, PickerField } from './'
import styles from './Styles/CurrencyConverterStyles'

const CurrencyConverter = ({ from, to, fromCurrencies, toCurrencies, handleChange }) => (
  <View>
    <Text style={styles.title}>{"Convertisseur "}</Text>
    <View style={styles.valueContainer}>
      <InputField
        keyboardType={'numeric'} returnKeyType={'done'}
        input={{ onChangeText: handleChange('from'), value: from.value }} />
      <Icon name={'ios-swap'} style={styles.icon} />
      <InputField
        keyboardType={'numeric'} returnKeyType={'done'}
        input={{ onChangeText: handleChange('to'), value: to.value }} />
    </View>
    <View style={styles.currenciesContainer}>
      <PickerField
        options={fromCurrencies} initialValue={'dzd'}
        input={{ onChange: handleChange('from'), value: from.currency }} />
      <View style={styles.separator} />
      <PickerField
        options={toCurrencies} initialValue={'euro'}
        input={{ onChange: handleChange('from'), value: from.currency }} />
    </View>
  </View>
)

export { CurrencyConverter }