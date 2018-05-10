import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import styles from './Styles/ExchangeRateItemStyles'

const ExchangeRateItem = ({ from, to, value, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.5}
    style={styles.container}>
    <View style={styles.subContainer}>
      <Text style={styles.currency}>{from.toUpperCase()}</Text>
      <Text style={styles.value}>1</Text>
    </View>
    <View style={[styles.subContainer, { width: 50 }]}>
      <Icon name={'ios-swap'} style={styles.swapIcon} />
      <Text style={styles.equalIcon}>{'='}</Text>
    </View>
    <View style={styles.subContainer}>
      <Text style={styles.currency}>{to.toUpperCase()}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </TouchableOpacity>
)


export { ExchangeRateItem }