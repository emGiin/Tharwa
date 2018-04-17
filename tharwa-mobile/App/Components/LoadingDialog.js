import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator } from 'react-native'
import { Text } from 'native-base'
import I18n from 'react-native-i18n'
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation
} from 'react-native-popup-dialog'
// Styles
import styles from './Styles/LoadingDialogStyle'

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });

class LoadingDialog extends Component {
  static propTypes = {
    init: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
    fetchingTitle: PropTypes.string,
    fetchingMessage: PropTypes.string,
    defaultTitle: PropTypes.string,
    defaultMessage: PropTypes.string,
    error: PropTypes.string,
    errorTitle: PropTypes.string
  }

  static defaultProps = {
    fetching: false,
    fetchingTitle: I18n.t('dialogFetchingTitle'),
    fetchingMessage: I18n.t('dialogFetchingMessage'),
    error: I18n.t('dialogErrorMessage'),
    errorTitle: I18n.t('dialogErrorTitle')
  }

  state = { new: true }

  renderCloseButton = () => (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <DialogButton disabled={this.props.fetching} text={I18n.t('close')} key="button-1"
        onPress={() => { this.dialog.dismiss(); }} />
    </View>
  )

  renderActivityIndicator = () => (
    <ActivityIndicator size='large' style={{ marginVertical: 20 }} />
  )

  getDialogContent = () => {
    let dialogTitle, dialogContent, dialogMessage;
    if (this.props.fetching) {
      dialogTitle = this.props.fetchingTitle;
      dialogMessage = this.props.fetchingMessage;
      dialogContent = this.renderActivityIndicator();
    } else if (this.props.error && !this.state.new) {
      dialogTitle = this.props.errorTitle;
      dialogMessage = this.props.error;
      dialogContent = this.renderCloseButton();
    } else {
      dialogTitle = this.props.defaultTitle;
      dialogMessage = this.props.defaultMessage;
      dialogContent = this.props.children;
    }
    return { dialogTitle, dialogContent, dialogMessage }
  }

  render() {
    const { fetching } = this.props;
    let { dialogTitle, dialogContent, dialogMessage } = this.getDialogContent();
    return (
      <PopupDialog
        width={0.95}
        height={170}
        dismissOnTouchOutside={!fetching}
        dismissOnHardwareBackPress={!fetching}
        ref={/* istanbul ignore next*/(dialog) => { this.dialog = dialog; this.props.init(dialog); }}
        dialogAnimation={slideAnimation}
        dialogTitle={<DialogTitle title={dialogTitle} />}
        onShown={() => this.setState({ new: false })}
        onDismissed={() => this.setState({ new: true })}
      >
        <View style={styles.dialogContentView}>
          <Text style={styles.dialogContent}> {dialogMessage} </Text>
          {dialogContent}
        </View>
      </PopupDialog>
    )
  }
}

export { LoadingDialog }