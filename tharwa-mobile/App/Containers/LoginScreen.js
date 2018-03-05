import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, View, Image } from 'react-native'
import { Container, Content, Text, Button, Item, Input, Icon } from 'native-base';
import { connect } from 'react-redux'
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation
} from 'react-native-popup-dialog';
import { Images } from '../Themes'
import AuthActions from '../Redux/AuthRedux'

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
    this.state = {
      email: '',
      password: ''
    }
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
    if (this.formIsValid())
      this.props.attemptLogin(email, password, confirmationMethod)
  }

  formIsValid = () => {
    return true;
  }

  handleChange = (name) => {
    return value => this.setState({ [name]: value });
  }

  goToPinCodePage = () => {
    this.props.navigation.navigate('PinCodeScreen');
  }

  goToSignUpPage = () => {
    this.props.navigation.navigate('RegisterScreen');
  }

  render() {
    const { email, password } = this.state
    const { fetching } = this.props
    const editable = !fetching
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
          <View style={styles.centered}>
            <View style={styles.inputContainer}>
              <Item regular style={styles.inputTxt}>
                <Icon name='person' style={styles.inputIcon} />
                <Input
                  placeholder='Email'
                  keyboardType='email-address'
                  returnKeyType='next'
                  autoCapitalize='none'
                  selectionColor='#fff'
                  value={email}
                  editable={editable}
                  autoFocus={false}
                  onSubmitEditing={() => { this.PasswordInputRef._root.focus() }}
                  style={styles.whiteColor}
                  placeholderTextColor="#ffffff90"
                  onChangeText={this.handleChange('email')} />
              </Item>

              <Item regular style={styles.inputTxt}>
                <Icon name='lock' style={styles.inputIcon} />
                <Input
                  placeholder='Password'
                  ref={input => { this.PasswordInputRef = input }}
                  secureTextEntry={true}
                  placeholderTextColor="#ffffff90"
                  returnKeyType='go'
                  selectionColor='#fff'
                  autoCorrect={false}
                  value={password}
                  editable={editable}
                  style={styles.whiteColor}
                  onSubmitEditing={() => this.slideAnimationDialog.show()}
                  onChangeText={this.handleChange('password')} />
              </Item>
            </View>

            <Button style={styles.loginBtn} onPress={() => { this.slideAnimationDialog.show() }} >
              <Text>Se connecter</Text>
            </Button>
            <Button transparent style={styles.signupBtn} onPress={this.goToSignUpPage}>
              <Text style={styles.whiteColor}>Je n'ai pas de compte</Text>
            </Button>
          </View>
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
