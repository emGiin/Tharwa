import React, { Component } from 'react'
import I18n from 'react-native-i18n'
import { Image, Text, View, ActivityIndicator } from 'react-native'
import { Images } from '../../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

/* istanbul ignore next */
const LogoImage = () => {
  return <Image source={Images.logo} style={styles.logo} />
}

export default class LaunchScreen extends Component {

  componentDidMount() {
    const { navigate } = this.props.navigation;
    setTimeout(() => navigate('MainScreen'), 0)
  }

  render() {
    return (
      <View style={styles.centered}>
        <LogoImage />
        <ActivityIndicator size={'large'} />
        <Text style={{ marginTop: 10 }}>{`${I18n.t('loading')} ...`}</Text>
      </View>
    )
  }
}
