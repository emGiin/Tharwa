import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { Container, Content, Text, Button } from 'native-base';
import { connect } from 'react-redux'
import CodeInput from 'react-native-confirmation-code-input'
import PinCodeActions from '../Redux/PinCodeRedux'

// Styles
import styles from './Styles/PinCodeScreenStyle'

class PinCodeScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    confirmPinCode: PropTypes.func
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.fetching) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Error', 'Code Invalid', [{ text: 'Fermer' }])
        }
      } else if (newProps.success) {
        this.goToMainPage();
      }
    }
  }

  goToMainPage = () => {
    this.props.navigation.navigate('MainScreen')
  }

  resendPinCode = () => {
    this.props.navigation.navigate('LoginScreen')
  }

  render() {
    return (
      <Container>
        <Text style={styles.mainText}>
          Veuiller saisir le code pin sur 4 chiffres
        </Text>
        <Content  >
          <CodeInput
            keyboardType='numeric'
            codeLength={4}
            className='border-circle'
            autoFocus={true}
            activeColor='rgba(41, 128, 185,1.0)'
            inactiveColor='rgba(41, 128, 185,0.5)'
            codeInputStyle={{ fontWeight: '800' }}
            onFulfill={code => this.props.confirmPinCode(code)}
          />
        </Content>
        <Text style={styles.noCodeText}>
          Vous n'avez pas recu un code?
        </Text>
        <Button transparent style={styles.resendButton} onPress={this.resendPinCode}>
          <Text style={styles.resendButtonText}>Obtenir un nouveau</Text>
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
