import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { Container, Text } from 'native-base'
import { connect } from 'react-redux'
import { LoadingDialog } from '../../Components'
import { Images } from '../../Themes'
import { SignupForm } from '../Forms'

// Styles
import styles from './Styles/RegisterScreenStyle'

class RegisterScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    error: PropTypes.string,
    success: PropTypes.bool
  }

  state = { showSuccessPage: false };

  componentWillReceiveProps(props) {
    if (!props.fetching && props.success) {
      this.dialog.dismiss();
      this.setState({ showSuccessPage: true });
    }
  }

  renderSuccessPage = () => (
    <Container style={[styles.container, { flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#2c3e50' }]}>
      <Text style={{ fontSize: 18, paddingHorizontal: 30, color: '#fff', textAlign: 'center' }}>
        Votre demande de creation de compte Tharwa a ete envoyee avec succes.
      </Text>

      <View style={styles.logoContainer}>
        <Image source={Images.logo} style={styles.logo} />
      </View>

      <Text style={{ fontSize: 18, paddingHorizontal: 30, color: '#fff', textAlign: 'center' }}>
        En attente de la validation de votre compte par nos banquiers.
      </Text>
    </Container>
  )

  renderForm = () => {
    const { fetching, error } = this.props;
    return (
      <Container style={[styles.container, { paddingTop: 0 }]}>
        <LoadingDialog
          init={dialog => { this.dialog = dialog }}
          error={error}
          fetching={fetching}
        />
        <SignupForm
          onSubmit={this.submit}
          editable={!fetching}
        />
      </Container>
    )
  }

  submit = (values) => {
    this.dialog.show();
    setTimeout(() => {
      this.dialog.dismiss();
      this.setState({ showSuccessPage: true });
    }, 2000)
    // this.props.confirmPinCode(code);
  }

  render() {
    return this.state.showSuccessPage ? this.renderSuccessPage() : this.renderForm()
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: true
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
