import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Container, Content, Text, Button } from 'native-base'
import I18n from 'react-native-i18n'
import CodeInput from 'react-native-confirmation-code-input'
import { LoadingDialog } from '../../Components'
import PinCodeActions from '../../Redux/PinCodeRedux'

// Styles
import styles from './Styles/PinCodeScreenStyle'


class PinCodeScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    error: PropTypes.string,
    success: PropTypes.bool,
    confirmPinCode: PropTypes.func
  }

  componentWillReceiveProps(props) {
    if (!props.fetching && props.success) {
      this.dialog.dismiss();
      this.goToMainPage();
    }
  }

  goToMainPage = () => {
    this.props.navigation.navigate('MainScreen');
  }

  resendPinCode = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  submit = (code) => {
    this.dialog.show();
    this.props.confirmPinCode(code);
  }

  render() {
    const { fetching, error } = this.props;
    return (
      <Container>
        <LoadingDialog
          init={dialog => { this.dialog = dialog }}
          error={error}
          errorTitle={I18n.t('pinCodeTitleError')}
          fetching={fetching}
          fetchingTitle={I18n.t('pinCodeTitleFetching')}
          fetchingMessage={I18n.t('pinCodeDescriptionFetching')}
        />
        <Text style={styles.mainText}>{I18n.t('pinCodeDescription')}</Text>
        <Content>
          <CodeInput
            keyboardType='numeric'
            codeLength={4}
            className='border-circle'
            autoFocus={true}
            activeColor='rgba(41, 128, 185,1.0)'
            inactiveColor='rgba(41, 128, 185,0.5)'
            codeInputStyle={{ fontWeight: '800' }}
            onFulfill={this.submit}
          />
        </Content>
        <Text style={styles.noCodeText}> {I18n.t('pinCodeNotReceived')} </Text>
        <Button transparent style={styles.resendButton} onPress={this.resendPinCode}>
          <Text style={styles.resendButtonText}>{I18n.t('pinCodeGetNew')}</Text>
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { fetching, error, success } = state.pinCode;
  return { fetching, error, success }
}

const mapDispatchToProps = (dispatch) => {
  return {
    confirmPinCode: (pinCode) => dispatch(PinCodeActions.pinCodeRequest(pinCode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PinCodeScreen)
