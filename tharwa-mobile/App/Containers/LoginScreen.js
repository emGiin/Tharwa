import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, View, Image, ActivityIndicator } from 'react-native'
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

const Logo = () => (
  <View style={styles.logoContainer}>
    <Image source={Images.logo} style={styles.logo} />
  </View>
)

class LoginScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    error: PropTypes.string,
    success: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  componentWillReceiveProps(props) {
    if (!props.fetching) {
      if (props.error && props.error === 'WRONG') {
        // Alert.alert('Erreur', 'Email ou mot de passe incorrect!', [{ text: 'Fermer' }])
        this.slideAnimationDialog.dismiss();
      } else if (props.success && !this.props.success) {
        this.slideAnimationDialog.dismiss();
        this.goToPinCodePage();
      }
    }
  }

  submit = (confirmationMethod) => {
    this.props.attemptLogin(this.email, this.password, confirmationMethod)
  }

  loginFormSubmit = (values) => {
    this.email = values.email;
    this.password = values.password;
    this.slideAnimationDialog.show();
  }

  goToPinCodePage = () => {
    this.props.navigation.navigate('PinCodeScreen');
  }

  goToSignUpPage = () => {
    this.props.navigation.navigate('RegisterScreen');
  }

  render() {
    const { fetching, error } = this.props;
    return (
      <Container style={{ backgroundColor: '#2c3e50' }}>
        <PopupDialog
          width={0.95}
          height={170}
          ref={(popupDialog) => { this.slideAnimationDialog = popupDialog; }}
          dialogAnimation={slideAnimation}
          dialogTitle={<DialogTitle title="Code d'authentification" />}>
          <View style={styles.dialogContentView}>
            <Text style={styles.dialogContent}>
              Comment souhaiter-vous recevoir votre code d'authentification?
            </Text>
            {
              fetching ? <ActivityIndicator size='large' />
                : <View style={{ flex: 1, flexDirection: 'row' }}>
                  <DialogButton disabled={fetching} text="Par Email" key="button-1"
                    onPress={() => { this.submit('email'); }} />
                  <DialogButton disabled={fetching} text="Par SMS" key="button-2"
                    onPress={() => { this.submit('sms'); }} />
                </View>
            }
          </View>
        </PopupDialog>
        <Content>
          <Logo />
          <LoginForm
            onSubmit={this.loginFormSubmit}
            onRegisterClicked={this.goToSignUpPage}
            editable={!fetching}
          />
          {!!error && <Text>{error}</Text>}
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
