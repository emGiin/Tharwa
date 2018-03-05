import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, View, Image } from 'react-native'
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
    attemptLogin: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = { email: '', password: '' }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.fetching) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Error', 'Invalid login', [{ text: 'OK' }])
          this.slideAnimationDialog.dismiss();
        }
      } else if (newProps.success) {
        this.slideAnimationDialog.dismiss();
        this.goToPinCodePage();
      }
    }
  }

  submit = (confirmationMethod) => {
    const { email, password } = this.state
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(email, password, confirmationMethod)
  }

  loginFormSubmit = (values) => {
    console.tron.log(values);
    this.slideAnimationDialog.show();
  }

  goToPinCodePage = () => {
    this.props.navigation.navigate('PinCodeScreen');
  }

  goToSignUpPage = () => {
    this.props.navigation.navigate('RegisterScreen');
  }

  render() {
    const { fetching } = this.props
    return (
      <Container>
        <PopupDialog
          width={0.95}
          height={170}
          ref={(popupDialog) => { this.slideAnimationDialog = popupDialog; }}
          dialogAnimation={slideAnimation}
          dialogTitle={<DialogTitle title="Code d'authentification" />}>
          <View style={styles.dialogContentView}>
            <Text style={styles.dialogContent}>
              Comment souhaiter-vous recevoir
              votre code d'authentification?
            </Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <DialogButton disabled={fetching} text="Par Email" key="button-1"
                onPress={() => { this.submit('email'); }} />
              <DialogButton disabled={fetching} text="Par SMS" key="button-2"
                onPress={() => { this.submit('sms'); }} />
            </View>
          </View>
        </PopupDialog>
        <Image source={Images.login} style={styles.loginBg} resizeMode='contain' />
        <Content>
          <View style={styles.centered}>
            <Image source={Images.logo} style={styles.logo} />
            <Text style={styles.logoName}>THARWA</Text>
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
