import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import I18n from 'react-native-i18n'
import { reset as resetReduxForm } from 'redux-form'
import { NavigationActions } from 'react-navigation'
import { TransferOrderForm } from '../Forms'
import { LoadingDialog } from '../../Components'

// Redux
import TransferOrderActions from '../../Redux/TransferOrderRedux'
import BankActions from '../../Redux/BankRedux'

// Styles
import styles from './Styles/NewTransferOrderScreenStyle'

class TransferOrderHistoryScreen extends Component {
  state = { key: 0 }

  submit = data => {
    const transferOrder = {
      reason: data.reason,
      receivers: {
        intern: [],
        extern: []
      }
    }
    data.receivers.forEach(receiver => {
      if (receiver.account.substring(0, 3) === "THW") {
        if (receiver.name) delete receiver.name
        transferOrder.receivers.intern.push(receiver)
      } else {
        transferOrder.receivers.extern.push(receiver)
      }
    })
    this.props.sendTransferOrder(transferOrder)
    this.dialog.show()
  }

  resetScreen = () => {
    this.props.resetForm();
    this.setState({ key: this.state.key + 1 })
    this.props.navigation.dispatch(NavigationActions.back());
  }


  componentWillMount() {
    if (this.props.banks.length === 0) this.props.getBanks()
  }

  render() {
    const { fetching, banks, reset, error, success } = this.props;
    return (
      <View style={styles.mainContainer}>
        <LoadingDialog
          reset={reset}
          onSuccess={this.resetScreen}
          init={/* istanbul ignore next */dialog => { this.dialog = dialog }}
          error={error}
          errorTitle={I18n.t('orderTransferDialogTitleError')}
          success={success}
          successMessage={I18n.t('orderTransferDialogMessageSuccess')}
          successTitle={I18n.t('orderTransferDialogTitleSuccess')}
          fetching={fetching}
          fetchingTitle={I18n.t('orderTransferDialogTitleFetching')}
          fetchingMessage={I18n.t('orderTransferInProgress')}
        />
        <TransferOrderForm
          key={this.state.key}
          banks={banks}
          onSubmit={this.submit}
          editable={!fetching}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ transferOrder: { fetching, error, success }, bank: { banks } }) => {
  return {
    fetching, error, success,
    banks: banks.map(({ code, name }) => ({ label: name, value: code }))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTransferOrder: data => dispatch(TransferOrderActions.newTransferOrderRequest(data)),
    reset: dispatch(TransferOrderActions.transferOrderReset()),
    resetForm: () => dispatch(resetReduxForm('OrderForm')),
    getBanks: () => dispatch(BankActions.bankRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferOrderHistoryScreen)
