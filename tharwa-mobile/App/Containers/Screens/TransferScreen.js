import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { reset } from 'redux-form';
import TransferFormClientAccount from '../Forms/TransferFormClientAccount'
import { TransferForm } from '../Forms'
import { Colors} from '../../Themes'
// Redux
import TransferActions from '../../Redux/TransferRedux'

// Styles
import styles from './Styles/TransferScreenStyle'

class TransferScreen extends Component {
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
      submit: this.props.tharwaTransfer
    }
  }

  render() {
    const { params = { type: 'tharwaAccount' } } = this.props.navigation.state;
    const { fetching } = this.props;
    const Form = this.forms[params.type]

    return (
      <View style={{ height: '100%', flex: 1, backgroundColor: Colors.white }}>
        <Form.component onSubmit={Form.submit} editable={!fetching} />
      </View>
    )
  }
}

const mapStateToProps = ({ transfer: { fetching, error, success } }) => {
  return { fetching, error, success }
}

const mapDispatchToProps = (dispatch) => {
  return {
    myAccountTransfer: (...data) =>
      dispatch(TransferActions.myAccountTransferRequest(...data)),
    tharwaTransfer: (...data) =>
      dispatch(TransferActions.tharwaTransferRequest(...data)),
    reset: () => {
      dispatch(TransferActions.reset())
      dispatch(reset('transfer'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferScreen)
