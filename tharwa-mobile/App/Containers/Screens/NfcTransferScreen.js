import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { NfcTransferForm } from '../Forms';
import styles from './Styles/NfcTransferScreenStyles'
import { Images } from '../../Themes';

class NfcTransferScreen extends Component {
  cancel = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  componentWillMount() {
    // get params from route
    this.receiverInfo = {
      email: 'user@email.com',
      name: 'User Tharwa',
      picture: null ? Images.avatar : { uri: 'picture' },
      accountNumber: "THW000000DZD"
    }
  }

  submit = data => {
    console.warn(data);
  }

  render() {
    const { fetching = false, maxAmount } = this.props
    return (
      <View style={styles.pageContainer}>
        <NfcTransferForm
          onSubmit={this.submit}
          editable={!fetching}
          cancel={this.cancel.bind(this)}
          receiverInfo={this.receiverInfo}
          maxAmount={maxAmount}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ account: { accountType, information: { infos = {} } } }) => {
  return {
    maxAmount: infos.max_nfc_amount || 5000
  };
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NfcTransferScreen)