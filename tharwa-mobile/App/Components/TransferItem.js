import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Icon } from 'native-base'
import styles from './Styles/TransferItemStyles'
import { Colors } from '../Themes';
import { formatMoney } from '../Transforms';

TransferItem = ({ item }) => {
  const [date, time] = item.created_at.split(' ')
  const type = item.transaction_direction === 'out'
  const color = type ? "#e74c3c" : "#218c74"
  const icon = type ? 'arrow-up' : 'arrow-down'

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.target}>{item.target}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={[styles.amount, { color }]}>
          {formatMoney(item.amount)} DZF
        </Text>
        <Icon style={[styles.icon, { color }]} name={icon} />
      </View>
    </TouchableOpacity>
  )
}

export { TransferItem }