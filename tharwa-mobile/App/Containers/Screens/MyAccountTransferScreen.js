import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { reset as resetReduxForm } from 'redux-form'
import I18n from 'react-native-i18n'
import TransferFormClientAccount from '../Forms/TransferFormClientAccount'
import { LoadingDialog } from '../../Components'
// Redux
import TransferActions from '../../Redux/TransferRedux'

// Styles
import styles from './Styles/TransferScreenStyle'

class TransferScreen extends Component {
  state = { key: 0 }

  componentWillReceiveProps(props) {
    if (props.success || props.error) this.dialog.show()
    return props
  }

  resetScreen = () => {
    // this.props.resetForm();
    this.setState({ key: this.state.key++ })
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
    const { fetching, error, success } = this.props;

    return (
      <View style={styles.container} key={this.state.key}>
        {this.renderDialog(this.props)}
        <TransferFormClientAccount
          key={this.state.key}
          onSubmit={data => {
            this.props.myAccountTransfer(data)
            this.dialog.show()
          }}
          editable={!fetching} />
      </View>
    )
  }
}

const mapStateToProps = ({
  transfer: { fetching, error, success, commission = 0 }
}) => {
  return {
    fetching, error, success, commission
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    myAccountTransfer: (...data) =>
      dispatch(TransferActions.myAccountTransferRequest(...data)),
    // resetForm: () => dispatch(resetReduxForm('myAccountTransfer')),
    reset: () => dispatch(TransferActions.transferReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferScreen)
