import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'native-base'
import I18n from 'react-native-i18n'
import { formatMoney } from '../Transforms'

// Styles
import styles from './Styles/AccountInfoStyles'

export const AccountInfo = ({ account, type, label, symbol, onPress }) => {
  const getText = () => {
    if (account) {
      const { status } = account
      if (!status) return `${formatMoney(account.amount)} ${symbol}`
      if (status === 'requested') return I18n.t('accountRequested')
      if (status === 'blocked') return I18n.t('accountBlocked')
    } else return I18n.t('accountRequest')
  }

  return (
    <View style={styles.page}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={styles.contentContainer}>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>
            {getText()}
          </Text>
        </View>
        <Text style={styles.account}>{label}</Text>
      </TouchableOpacity>
    </View >
  )
}