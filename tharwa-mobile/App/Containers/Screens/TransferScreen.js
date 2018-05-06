import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { reset } from 'redux-form';
import TransferFormClientAccount from '../Forms/TransferFormClientAccount'
import { TransferForm } from '../Forms'
import { Colors} from '../../Themes'
// Redux
import TransferActions from '../../Redux/TransferRedux'
import BankActions from '../../Redux/BankRedux'

// Styles
import styles from './Styles/TransferScreenStyle'

class TransferScreen extends Component {
  state = { key: 0 }

  forms = {
    "myAccount": {
      component: TransferFormClientAccount,
      submit: this.props.myAccountTransfer
    },
    "tharwaAccount": {
      component: TransferForm,
      submit: this.props.tharwaTransfer
    },
    "externalAccount": {
      component: TransferForm,
      submit: this.props.externalTransfer
    }
  }

  componentWillMount() {
    if (this.props.banks.length === 0) this.props.getBanks()
  }

  render() {
    const { params = { type: 'externalAccount' } } = this.props.navigation.state;
    const { fetching, banks } = this.props;
    const Form = this.forms[params.type]

    return (
      <View style={{ height: '100%', flex: 1, backgroundColor: Colors.background }}>
        <Form.component onSubmit={Form.submit} editable={!fetching} />
      </View>
    )
  }
}

const mapStateToProps = ({
  transfer: { fetching, error, success }, bank: { banks }
}) => {
  return {
    fetching, error, success,
    banks: banks.map(({ code, name }) => ({ label: name, value: code }))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    myAccountTransfer: (...data) =>
      dispatch(TransferActions.myAccountTransferRequest(...data)),
    tharwaTransfer: (...data) =>
      dispatch(TransferActions.tharwaTransferRequest(...data)),
    externalTransfer: (...data) =>
      dispatch(TransferActions.externalTransferRequest(...data)),
    reset: () => {
      dispatch(TransferActions.reset())
      dispatch(reset('transfer'));
    },
    getBanks: () => dispatch(BankActions.bankRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferScreen)
