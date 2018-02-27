import React, { Component } from 'react'
import {
  ScrollView, View,
  TextInput, Image,
  KeyboardAvoidingView
} from 'react-native'
import { Container, Content, Text, Button } from 'native-base';
import { connect } from 'react-redux'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  emailRegex = /(\w(=?@)\w+\.{1}[a-zA-Z]{2,})/i;

  login() {
    console.log('====================================');
    console.log(this.email, this.password);
    console.log('====================================');
    if (!this.emailRegex.test(this.email)) {
      console.log("Email invalid!");
    }
  }

  render() {
    return (
      <Content>
        <Text style={styles.logoName}>THARWA</Text>
        <View style={styles.centered}>
          <Image source={Images.launch} style={styles.logo} />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholder='Email'
            keyboardType='email-address'
            onChangeText={email => { this.email = email }} />

          <TextInput
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={password => { this.password = password }} />

          <View style={styles.centered}>
            <Button style={styles.loginBtn} onPress={() => { this.login() }} >
              <Text>Se connecter</Text>
            </Button>
            <Button transparent style={styles.signupBtn} onPress={() => { }}>
              <Text>Je n'ai pas de compte</Text>
            </Button>
          </View>
        </View>
      </Content>
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
