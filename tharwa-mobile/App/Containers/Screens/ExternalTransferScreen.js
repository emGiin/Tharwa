import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { reset as resetReduxForm } from 'redux-form'
import I18n from 'react-native-i18n'
import { ExternalTransferForm } from '../Forms'
import { LoadingDialog } from '../../Components'
// Redux
import ExternalTransferActions from '../../Redux/ExternalTransferRedux'
import BankActions from '../../Redux/BankRedux'

// Styles
import styles from './Styles/TransferScreenStyle'

class TransferScreen extends Component {
  state = { key: 0 }

  componentWillReceiveProps(props) {
    if (props.success || props.error) this.dialog.show()
    return props
  }

  resetScreen = () => {
    this.props.resetForm();
    this.setState({ key: this.state.key + 1 })
  }

  componentWillMount() {
    if (this.props.banks.length === 0) this.props.getBanks()
  }

  renderDialog = ({ fetching, error, success, commission, reset }) => (
    <LoadingDialog
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
    const { fetching, banks } = this.props;

    return (
      <View style={styles.container}>
        {this.renderDialog(this.props)}
        <ExternalTransferForm
          key={this.state.key}
          banks={banks}
          onSubmit={data => {
            this.sup = data.amount > 200000
            this.props.externalTransfer(data)
          }}
          editable={!fetching} />
      </View>
    )
  }
}

const mapStateToProps = ({
  externalTransfer: { fetching, error, success, commission = 0 }, bank: { banks }
}) => {
  return {
    fetching, error, success, commission,
    banks: banks.map(({ code, name }) => ({ label: name, value: code }))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    externalTransfer: (...data) =>
      dispatch(ExternalTransferActions.externalTransferRequest(...data)),
    resetForm: () => dispatch(resetReduxForm('ExternalTransferForm')),
    reset: () => dispatch(ExternalTransferActions.externalTransferReset()),
    getBanks: () => dispatch(BankActions.bankRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferScreen)
