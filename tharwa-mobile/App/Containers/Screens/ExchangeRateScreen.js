import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import ExchangeRateActions from '../../Redux/ExchangeRateRedux'

// Styles
import styles from './Styles/ExchangeRateScreenStyles'


class ExchangeRateScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRateScreen)
