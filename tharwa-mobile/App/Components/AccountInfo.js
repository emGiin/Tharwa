import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'native-base'
import Carousel from 'react-native-snap-carousel';
import { formatMoney } from '../Transforms'
import { Colors } from '../Themes';

// Styles
import styles from './Styles/AccountInfoStyles'

export const AccountInfo = ({ account, type, symbol }) => (
  <View style={styles.page}>
    {
      account ?
        (
          <TouchableOpacity style={styles.contentContainer}>
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>
                {`${formatMoney(account.amount)} ${symbol}`}
              </Text>
            </View>
            <Text style={styles.account}>{type}</Text>
          </TouchableOpacity>
        ) :
        (
          <TouchableOpacity style={styles.contentContainer}>
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>
                Demander la creation de ce compte
              </Text>
            </View>
            <Text style={styles.account}>
              {type}
            </Text>
          </TouchableOpacity>
        )
    }
  </View>
)
