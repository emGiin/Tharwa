import React from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'
import styles from './Styles/TransferItemStyles'

TransferItem = ({ item }) => {
  const [date, time] = item.date.split(' ')

  return (
    <View key={item.key}>
      <View style={styles.separator} />
      <View style={styles.container}>
        <View>
          <Text>{item.type}</Text>
          <Text>{item.amount}</Text>
        </View>
        <View>
          <Text>{date}</Text>
          <Text>{time}</Text>
        </View>
      </View>
    </View>
  )
}

export { TransferItem }