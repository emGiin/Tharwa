import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { TransferOrderForm } from '../Forms'

// Redux
import TransferOrderActions from '../../Redux/TransferOrderRedux'
import BankActions from '../../Redux/BankRedux'

// Styles
import styles from './Styles/NewTransferOrderScreenStyle'

class TransferOrderHistoryScreen extends Component {

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
    console.warn(transferOrder);
    this.props.sendTransferOrder(transferOrder)
  }

  componentWillMount() {
    if (this.props.banks.length === 0) this.props.getBanks()
  }

  render() {
    const { fetching, banks } = this.props;
    return (
      <View style={styles.mainContainer}>
        <TransferOrderForm
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
    getBanks: () => dispatch(BankActions.bankRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferOrderHistoryScreen)
