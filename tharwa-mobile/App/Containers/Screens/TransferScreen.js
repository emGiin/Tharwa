import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { reset as resetReduxForm } from 'redux-form'
import I18n from 'react-native-i18n'
import TransferFormClientAccount from '../Forms/TransferFormClientAccount'
import { ExternalTransferForm, TharwaTransferForm } from '../Forms'
import { LoadingDialog } from '../../Components'
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
      submit: data => {
        this.props.myAccountTransfer(data)
        this.dialog.show()
      }
    },
    "tharwaAccount": {
      component: TharwaTransferForm,
      submit: data => {
        this.sup = data.amount > 200000
        this.props.tharwaTransfer(data)

      }
    },
    "externalAccount": {
      component: ExternalTransferForm,
      submit: data => {
        this.sup = data.amount > 200000
        this.props.externalTransfer(data)
      }
    }
  }

  componentWillReceiveProps(props) {
    // if (props.success || props.error) this.dialog.show()
    return props
  }

  resetScreen = () => {
    this.props.reset();
    // this.setState({ key: this.state.key++ })
  }

  componentWillMount() {
    if (this.props.banks.length === 0) this.props.getBanks()
  }

  renderDialog = ({ fetching, error, success, commission, reset }, type) => (
    <LoadingDialog
      key={`${type}_${this.state.key}`}
      reset={reset}
      onSuccess={this.resetScreen}
      init={/* istanbul ignore next */dialog => { this.dialog = dialog }}
      error={error}
      errorTitle={I18n.t('transferDialogTitleError')}
      success={success}
      successMessage={I18n.t(`transferDialogMessageSuccess${this.sup ? 'Validation' : ''}`) + commission + ' DZD'}
      successTitle={I18n.t('transferDialogTitleSuccess')}
      fetching={fetching}
      fetchingTitle={I18n.t('transferDialogTitleFetching')}
      fetchingMessage={I18n.t('transferInProgress')}>
    </LoadingDialog>
  )

  render() {
    const { params = { type: 'tharwaAccount' } } = this.props.navigation.state;
    const { fetching, error, success, banks } = this.props;
    const Form = this.forms[params.type]

    return (
      <View style={styles.container} key={`${params.type}_${this.state.key}`}>
        {this.renderDialog(this.props, params.type)}
        <Form.component
          key={`${params.type}_${this.state.key}`}
          banks={banks}
          onSubmit={Form.submit}
          editable={!fetching} />
      </View>
    )
  }
}

const mapStateToProps = ({
  transfer: { fetching, error, success, commission = 0 }, bank: { banks }
}) => {
  return {
    fetching, error, success, commission,
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
    resetForm: () => {
      dispatch(resetReduxForm('ExternalTransferForm'))
      dispatch(resetReduxForm('tharwaTransfer'))
      dispatch(resetReduxForm('myAccountTransfer'))
    },
    reset: () => dispatch(TransferActions.transferReset()),
    getBanks: () => dispatch(BankActions.bankRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferScreen)
