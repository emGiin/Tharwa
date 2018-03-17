import React, { Component } from 'react'
import { Image, Text, View, ActivityIndicator } from 'react-native'
import { Images } from '../../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {

  componentDidMount() {
    const { navigate } = this.props.navigation;
    setTimeout(() => navigate('LoginScreen'), 0)
  }

  render() {
    return (
      <View style={styles.centered}>
        <Image source={Images.logo} style={styles.logo} />
        <ActivityIndicator size={'large'} />
        <Text style={{ marginTop: 10 }}>Chargement en cours ...</Text>
      </View>
    )
  }
}
