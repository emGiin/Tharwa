import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import I18n from 'react-native-i18n'
import { reset as resetReduxForm } from 'redux-form'
import { NavigationActions } from 'react-navigation'
import { LoadingDialog } from '../../Components'
import { NfcTransferForm } from '../Forms';

// Redux
import NfcTransferRedux from '../../Redux/NfcTransferRedux'
import AccountActions from '../../Redux/AccountRedux'

// Styles
import styles from './Styles/NfcTransferScreenStyles'

class NfcTransferScreen extends Component {
  cancel = () => {
    this.props.resetForm();
    this.props.getProfile();
    this.props.navigation.dispatch(NavigationActions.back());
  }

  componentWillReceiveProps(props) {
    if (props.success || props.error) this.dialog.show()
    return props
  }

  renderDialog = ({ fetching, error, success, commission, reset }) => (
    <LoadingDialog
      reset={reset}
      onSuccess={this.cancel}
      init={/* istanbul ignore next */dialog => { this.dialog = dialog }}
      error={error}
      errorTitle={I18n.t('transferDialogTitleError')}
      success={success}
      successMessage={I18n.t('transferDialogMessageSuccess') + commission + ' DZD'}
      successTitle={I18n.t('transferDialogTitleSuccess')}
      fetching={fetching}
      fetchingTitle={I18n.t('transferDialogTitleFetching')}
      fetchingMessage={I18n.t('transferInProgress')}>
    </LoadingDialog>
  )

  componentWillMount() {
    // get params from route
    const { params } = this.props.navigation.state
    if (params) {
      this.receiverInfo = params.receiverInfo
    }
  }

  submit = ({ amount }) => {
    const data = { amount, accountNumber: this.receiverInfo.accountNumber }
    this.props.nfcTransfer(data)
  }

  render() {
    const { fetching = false, maxAmount } = this.props
    return (
      <View style={styles.pageContainer}>
        {this.renderDialog(this.props)}
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

const mapStateToProps = ({
  nfcTransfer: { fetching, error, success, commission = 0 },
  account: { information: { infos = {} } }
}) => {
  return {
    fetching, error, success, commission,
    maxAmount: infos.max_nfc_amount || 5000
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    nfcTransfer: (...data) => dispatch(NfcTransferRedux.nfcTransferRequest(...data)),
    getProfile: () => dispatch(AccountActions.accountRequest()),
    resetForm: () => dispatch(resetReduxForm('NfcTransferForm')),
    reset: () => dispatch(NfcTransferRedux.nfcTransferReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NfcTransferScreen)