import React, { Component } from 'react'
import { View } from 'react-native'
import { reset as resetReduxForm } from 'redux-form'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { TharwaTransferForm } from '../Forms'
import { LoadingDialog } from '../../Components'
// Redux
import TharwaTransferRedux from '../../Redux/TharwaTransferRedux'

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
    const { fetching } = this.props;

    return (
      <View style={styles.container}>
        {this.renderDialog(this.props)}
        <TharwaTransferForm
          key={this.state.key}
          onSubmit={data => {
            this.sup = data.amount > 200000
            this.props.tharwaTransfer(data)
          }}
          editable={!fetching}
        />
      </View>
    )
  }
}

const mapStateToProps = ({
  tharwaTransfer: { fetching, error, success, commission = 0 } }) => {
  return {
    fetching, error, success, commission
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tharwaTransfer: (...data) =>
      dispatch(TharwaTransferRedux.tharwaTransferRequest(...data)),
    resetForm: () => dispatch(resetReduxForm('tharwaTransfer')),
    reset: () => dispatch(TharwaTransferRedux.tharwaTransferReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferScreen)
