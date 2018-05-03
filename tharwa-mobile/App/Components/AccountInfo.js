import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'native-base'
import I18n from 'react-native-i18n'
import Carousel from 'react-native-snap-carousel';
import { formatMoney } from '../Transforms'
import { Colors } from '../Themes';

// Styles
import styles from './Styles/AccountInfoStyles'

export const AccountInfo = ({ account, type, symbol }) => (
  <View style={styles.page}>
    <TouchableOpacity activeOpacity={0.9} style={styles.contentContainer}>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>
          {
            account ?
              `${formatMoney(account.amount)} ${symbol}` :
              I18n.t('accountRequest')
          }
        </Text>
      </View>
      <Text style={styles.account}>{type}</Text>
    </TouchableOpacity>
  </View >
)
