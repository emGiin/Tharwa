import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, ActivityIndicator } from 'react-native'
import { Container, Content, Text } from 'native-base'
import { connect } from 'react-redux'
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation
} from 'react-native-popup-dialog'
import I18n from 'react-native-i18n'
import { Images } from '../../Themes'
import AuthActions from '../../Redux/AuthRedux'
import LoginForm from '../Forms/LoginForm'

// Styles
import styles from './Styles/LoginScreenStyle'

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });

class LoginScreen extends Component {
  static propTypes = {
    fetching: PropTypes.bool,
    error: PropTypes.string,
    success: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = { newRequest: true }
  }

  componentWillReceiveProps(props) {
    if (!props.fetching && props.success) {
      this.dialog.dismiss();
      this.goToPinCodePage();
    }
    if (props.error) this.setState({ newRequest: false })
  }

  submit = (confirmationMethod) => {
    this.props.attemptLogin(this.email, this.password, confirmationMethod)
  }

  loginFormSubmit = (values) => {
    this.email = values.email;
    this.password = values.password;
    this.setState({ newRequest: true })
    this.dialog.show();
  }

  goToPinCodePage = () => {
    this.props.navigation.navigate('PinCodeScreen');
  }

  goToSignUpPage = () => {
    this.props.navigation.navigate('RegisterScreen');
  }

  render() {
    const { fetching, error } = this.props;
    let dialogTitle = I18n.t('authDialogTitle');
    let dialogDescription = I18n.t('authDialogDescription');
    let dialogContent;
    if (fetching) {
      dialogTitle = I18n.t('authDialogTitleFetching');
      dialogDescription = I18n.t('authDialogDescriptionFetching');
      dialogContent = <ActivityIndicator size='large' style={{ marginVertical: 20 }} />;
    } else if (error && !this.state.newRequest) {
      dialogTitle = I18n.t('authDialogTitleError')
      dialogDescription = error
      dialogContent = <DialogButton text={I18n.t('authDialogClose')}
        onPress={() => { this.dialog.dismiss(); }} />
    } else {
      dialogContent =
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <DialogButton disabled={fetching} text={I18n.t('authDialogPinByEmail')}
            onPress={() => { this.submit('email'); }} />
          <DialogButton disabled={fetching} text={I18n.t('authDialogPinBySms')}
            onPress={() => { this.submit('sms'); }} />
        </View>
    }
    return (
      <Container style={{ backgroundColor: '#2c3e50' }}>
        <PopupDialog
          width={0.95}
          height={170}
          dismissOnTouchOutside={!fetching}
          dismissOnHardwareBackPress={!fetching}
          ref={(dialog) => { this.dialog = dialog; }}
          dialogAnimation={slideAnimation}
          dialogTitle={<DialogTitle title={dialogTitle} />}
        >
          <View style={styles.dialogContentView}>
            <Text style={styles.dialogContent}>
              {dialogDescription}
            </Text>
            {dialogContent}
          </View>
        </PopupDialog>
        <Content>
          <View style={styles.logoContainer}>
            <Image source={Images.logo} style={styles.logo} />
          </View>
          <LoginForm
            onSubmit={this.loginFormSubmit}
            onRegisterClicked={this.goToSignUpPage}
            editable={!fetching}
          />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { fetching, error, success } = state.auth;
  return { fetching, error, success }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (email, password, confirmationMethod) =>
      dispatch(AuthActions.authRequest(email, password, confirmationMethod)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
