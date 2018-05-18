import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { NfcTransferForm } from '../Forms';
import styles from './Styles/NfcTransferScreenStyles'
import { Colors } from '../../Themes';

class NfcTransferScreen extends Component {
  cancel = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  componentWillMount() {
    // get params from route
    this.receiverInfo = {
      email: 'user@email.com',
      firstname: 'User',
      lastname: 'Tharwa',
      picture: null,
      code: "THW000000DZD"
    }
  }

  submit = data => {
    console.warn(data);
  }

  render() {
    const { fetching = false, maxAmount = 5000 } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
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

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NfcTransferScreen)