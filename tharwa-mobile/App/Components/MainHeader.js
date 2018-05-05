import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Header, Text } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import styles from './Styles/MainHeaderStyles'
import { Colors } from '../Themes'

MainHeader = ({ openDrawer, notificationsCount = 0 }) => (
  <Header
    style={styles.container}
    backgroundColor={Colors.forground}
    androidStatusBarColor={Colors.forground}
  >
    <TouchableOpacity
      style={styles.leftButton}
      onPress={openDrawer}>
      <Icon size={32} color={Colors.white} name="menu" />
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.rightButton}
      onPress={openDrawer}>
      <Icon size={32} color={Colors.white} name="bell" />
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeTxt}>{notificationsCount}</Text>
      </View>
    </TouchableOpacity>
  </Header>
)

export { MainHeader }