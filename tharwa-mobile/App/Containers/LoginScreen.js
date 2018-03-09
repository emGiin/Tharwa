import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, ActivityIndicator } from 'react-native'
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux'
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation
} from 'react-native-popup-dialog';
import { Images } from '../Themes'
import AuthActions from '../Redux/AuthRedux'
import LoginForm from '../Components/LoginForm'

// Styles
import styles from './Styles/LoginScreenStyle'

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });

class LoginScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
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
    let dialogTitle = 'Code d\'authentification';
    let dialogDescription = 'Comment souhaiter-vous recevoir votre code d\'authentification?';
    if (fetching) {
      dialogTitle = 'Authentification'
      dialogDescription = 'Authentification en cours'
    } else if (error && !this.state.newRequest) {
      dialogTitle = 'Erreur'
      dialogDescription = 'Email ou mot de passe incorrect!'
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
            {
              fetching &&
              <ActivityIndicator size='large' style={{ marginVertical: 20 }} />
            }
            {
              error && !this.state.newRequest ?
                <DialogButton text="Fermer"
                  onPress={() => { this.dialog.dismiss(); }} />
                : !fetching &&
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <DialogButton disabled={fetching} text="Par Email"
                    onPress={() => { this.submit('email'); }} />
                  <DialogButton disabled={fetching} text="Par SMS"
                    onPress={() => { this.submit('sms'); }} />
                </View>
            }
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
