import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { NavigationActions } from 'react-navigation'
import I18n from 'react-native-i18n'
import Pulse from 'react-native-pulse'
import { Colors, Images } from '../../Themes'
import styles from './Styles/NfcPendingScreenStyles'

import MicroTransferListAction from "../../Redux/MicroTransferListRedux"
import { formatMoney } from '../../Transforms';

class NfcPendingScreen extends Component {
  INTERVAL = 2000
  state = { received: false }
  cancel = () => {
    this.props.reset()
    this.props.navigation.dispatch(NavigationActions.back());
  }

  componentWillReceiveProps({ senderInfo }) {
    if (senderInfo && senderInfo.amount > 0) {
      this.setState({ received: true })
      clearInterval(this.interval)
    }
  }

  componentWillMount() {
    this.interval = setInterval(this.props.fetchList, this.INTERVAL)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
    clearInterval(this.interval)
  }

  render() {
    const size = Dimensions.get('window').width / 2;
    const { senderInfo } = this.props
    return (
      <View style={styles.pageContainer} >
        {
          this.state.received ? (
            <View style={styles.pageContainer} >
              <View style={styles.topContainer}>
                <Image source={Images.nfcTag} style={styles.nfcLogo} />
                <TouchableOpacity onPress={this.cancel} activeOpacity={0.8}>
                  <Text style={styles.cancelBtn}>{I18n.t('close')}</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.detailsText}>
                Micro virement effectué avec success
              </Text>
              <View style={styles.cardContainer}>
                <Text style={styles.amount}>{formatMoney(senderInfo.amount)} DZD</Text>
                <View style={styles.senderDetailsContainer}>
                  <View>
                    <Text style={styles.title}>{I18n.t('emailPlaceholder')}:</Text>
                    <Text style={styles.title}>{I18n.t('name')}:</Text>
                    <Text style={styles.title}>{I18n.t('accountNumber')}:</Text>
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.detail}>{senderInfo.email}</Text>
                    <Text style={styles.detail}>{senderInfo.name}</Text>
                    <Text style={styles.detail}>{senderInfo.accountNumber}</Text>
                  </View>
                </View>
              </View>
            </View >
          ) : (
              <View style={styles.pageContainer} >
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
                  <Pulse color={Colors.button} numPulses={1} diameter={size + 120} speed={10} duration={5000} />
                  <View style={styles.pendingContainer}>
                    <Text style={styles.pendingTxt}> {I18n.t('pending')} </Text>
                  </View>
                </View>
              </View >
            )
        }
      </View >
    )
  }
}

const mapStateToProps = ({ microTransferList: { list, success, fetching } }) => {
  return { senderInfo: list, fetching, success }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchList: () => dispatch(MicroTransferListAction.microTransferListRequest()),
    reset: () => dispatch(MicroTransferListAction.microTransferListReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NfcPendingScreen)