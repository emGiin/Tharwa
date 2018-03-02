import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Container, Content, Text, Button, Item, Input, Icon, Toast } from 'native-base';
import { connect } from 'react-redux'
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation
} from 'react-native-popup-dialog';
import axios from 'axios'
import config from 'react-native-config'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });

class LoginScreen extends Component {
  emailRegex = /(\w(=?@)\w+\.{1}[a-zA-Z]{2,})/i;

  componentWillMount() {
    this.email = 'peter@klaven';
    this.password = 'cityslicka';
  }

  signIn(authType) {
    console.log(this.email, this.password);
    if (!this.emailRegex.test(this.email)) {
      console.log("Email invalid!");
    }
    this.slideAnimationDialog.dismiss();
    axios.post(`${config.API_URL}/login`, {
      email: this.email,
      password: this.password
    }).then(response => {
      Toast.show(`Success: ${response}`, 'bottom', 'success')
    }).catch(error => Toast.show(error, 'bottom', 'danger'));
  }

  goToSignUp() {
    this.props.navigation.navigate('signup');
  }

  render() {
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
              <DialogButton text="Par Email" key="button-1"
                onPress={() => { this.signIn('email'); }} />
              <DialogButton text="Par SMS" key="button-2"
                onPress={() => { this.signIn('sms'); }} />
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
                  autoFocus={false}
                  onSubmitEditing={() => { this.PasswordInputRef._root.focus() }}
                  style={styles.whiteColor}
                  placeholderTextColor="#ffffff90"
                  onChangeText={email => { this.email = email }} />
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
                  style={styles.whiteColor}
                  onSubmitEditing={() => this.slideAnimationDialog.show()}
                  onChangeText={password => { this.password = password }} />
              </Item>
            </View>

            <Button style={styles.loginBtn} onPress={() => { this.slideAnimationDialog.show() }} >
              <Text>Se connecter</Text>
            </Button>
            <Button transparent style={styles.signupBtn} onPress={this.goToSignUp.bind(this)}>
              <Text style={styles.whiteColor}>Je n'ai pas de compte</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
