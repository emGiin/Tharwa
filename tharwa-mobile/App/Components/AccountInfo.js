import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'native-base'
import I18n from 'react-native-i18n'
import { formatMoney } from '../Transforms'

// Styles
import styles from './Styles/AccountInfoStyles'
import { Colors } from '../Themes';

export const AccountInfo = ({ account, type, label, symbol, onPress }) => {
  let blocked = false
  const getText = () => {
    if (account) {
      const { status } = account
      if (!status) return `${formatMoney(account.amount)} ${symbol}`
      if (status === 'requested') return I18n.t('accountRequested')
      if (status === 'blocked') {
        blocked = true;
        return I18n.t('accountBlocked')
      }
    } else return I18n.t('accountRequest')
  }

  const text = getText()

  return (
    <View style={styles.page}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={styles.contentContainer}>
        <View style={[styles.amountContainer, blocked && { backgroundColor: Colors.fire }]}>
          <Text style={styles.amount}>
            {text}
          </Text>
        </View>
        <Text style={styles.account}>{label}</Text>
      </TouchableOpacity>
    </View >
  )
}