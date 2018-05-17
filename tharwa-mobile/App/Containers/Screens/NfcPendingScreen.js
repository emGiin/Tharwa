import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { NavigationActions } from 'react-navigation'
import I18n from 'react-native-i18n'
import Pulse from 'react-native-pulse'
import { Colors, Images } from '../../Themes'
import styles from './Styles/NfcPendingScreenStyles'

class NfcPendingScreen extends Component {
  cancel = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  render() {
    const size = Dimensions.get('window').width / 2;
    return (
      <View style={styles.pageContainer}>
        <View style={styles.topContainer}>
          <Image source={Images.nfcTag} style={styles.nfcLogo} />
          <TouchableOpacity onPress={this.cancel} activeOpacity={0.8}>
            <Text style={styles.cancelBtn}>{I18n.t('cancel')}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.detailsText}>
          {I18n.t('pendingMicroTransferDetails')}
        </Text>
        <View style={styles.container}>
          <Pulse color={Colors.button} numPulses={3} diameter={size + 150} speed={20} duration={1000} />
          <View style={styles.pendingContainer}>
            <Text style={styles.pendingTxt}> {I18n.t('pending')} </Text>
          </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(NfcPendingScreen)