import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Alert, View, ActivityIndicator } from 'react-native'
import { Container, Content, Text, Button } from 'native-base';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation
} from 'react-native-popup-dialog';
import CodeInput from 'react-native-confirmation-code-input'
import PinCodeActions from '../Redux/PinCodeRedux'

// Styles
import styles from './Styles/PinCodeScreenStyle'

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });

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
        <PopupDialog
          width={0.95}
          height={170}
          ref={(dialog) => { this.dialog = dialog; }}
          dialogAnimation={slideAnimation}
          dialogTitle={
            <DialogTitle title={!!error ? 'Erreur' : 'Confirmation en cours'} />
          }>
          <View>
            {fetching && <ActivityIndicator size='large' />}
            {!!error &&
              <View>
                <Text>{error}</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <DialogButton disabled={fetching} text="Fermer" key="button-1"
                    onPress={() => { this.dialog.dismiss() }} />
                </View>
              </View>
            }
          </View>
        </PopupDialog>
        <Text style={styles.mainText}>
          Veuiller saisir le code pin sur 4 chiffres
        </Text>
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
