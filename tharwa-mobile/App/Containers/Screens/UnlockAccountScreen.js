import React, { Component } from 'react'
import { Container, Text } from 'native-base'
import { Image, View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import I18n from 'react-native-i18n'
import { LoadingDialog, CameraPicker, NextPrevious, Header } from '../../Components'

import UnlockAccountActions from '../../Redux/UnlockAccountRedux'

// Styles
import styles from './Styles/UnlockAccountScreenStyle'
import { Images } from '../../Themes';

class UnlockAccountScreen extends Component {
  state = { picture: "" }

  componentWillMount() {
    // get params from route
    const { params } = this.props.navigation.state
    if (params) {
      this.accountType = params.type
    }
  }

  capturePicture = (data) => {
    this.setState({ picture: data })
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
    this.props.reset()
  }

  send = () => {
    this.props.sendUnlockRequest({ account_type: this.accountType, justification: this.state.picture })
    this.dialog.show()
  }

  render() {
    const { fetching, error, success, reset } = this.props;
    const imageSrc = this.state.picture ? { uri: this.state.picture } : Images.document
    return (
      <Container style={styles.mainContainer}>
        <Header text={"Demande déblocage"} />
        <LoadingDialog
          reset={reset}
          onSuccess={() => this.goBack()}
          init={/* istanbul ignore next */dialog => { this.dialog = dialog }}
          error={error}
          errorTitle={I18n.t('unlockAccountDialogTitleError')}
          success={success}
          successMessage={I18n.t('unlockAccountDialogMessageSuccess')}
          successTitle={I18n.t('unlockAccountDialogTitleSuccess')}
          fetching={fetching}
          fetchingTitle={I18n.t('unlockAccountDialogTitleFetching')}
          fetchingMessage={I18n.t('unlockAccountDialogMessageFetching')}>
        </LoadingDialog>
        <View style={styles.container}>
          <Text style={styles.detailsText}>
            {I18n.t('unlockProofPicture')}
          </Text>
          <CameraPicker
            onCapture={this.capturePicture.bind(this)}
            style={styles.buttonContainer}
            buttonComponent={() => <Image style={styles.imagePreview} source={imageSrc} />}
          />
        </View>
        <NextPrevious isFinal onSubmit={() => this.send()} />
      </Container>
    )
  }
}

const mapStateToProps = ({ unlockAccount: { fetching, success, error } }) => {
  return { fetching, success, error };
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendUnlockRequest: data => dispatch(UnlockAccountActions.unlockAccountRequest(data)),
    reset: () => dispatch(UnlockAccountActions.unlockAccountReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockAccountScreen)
