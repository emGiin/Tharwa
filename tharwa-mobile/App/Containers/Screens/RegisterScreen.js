import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { Container, Text } from 'native-base'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { LoadingDialog } from '../../Components'
import { Images } from '../../Themes'
import { SignupForm } from '../Forms'
import SignupActions from '../../Redux/SignupRedux'

// Styles
import styles from './Styles/RegisterScreenStyle'

class RegisterScreen extends Component {
  static propTypes = {
    attemptSignup: PropTypes.func,
    fetching: PropTypes.bool,
    error: PropTypes.string,
    success: PropTypes.bool
  }

  componentWillReceiveProps(props) {
    if (!props.fetching && props.success) {
      this.dialog.dismiss();
    }
  }

  renderSuccessPage = () => (
    <Container style={[styles.container, styles.successContainer]}>
      <Text style={styles.successText}>{I18n.t('registrationSuccessTop')}</Text>
      <View style={styles.logoContainer}>
        <Image source={Images.logo} style={styles.logo} />
      </View>
      <Text style={styles.successText}>{I18n.t('registrationSuccessBottom')}</Text>
    </Container>
  )

  renderForm = () => {
    const { fetching, error } = this.props;
    return (
      <Container style={[styles.container, styles.formContainer]}>
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
    this.props.attemptSignup(...values);
  }

  render() {
    return this.props.success ? this.renderSuccessPage() : this.renderForm()
  }
}

const mapStateToProps = ({ signup: { fetching, error, success } }) => {
  return { fetching, error, success }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSignup: (...data) => dispatch(SignupActions.signupRequest(...data)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
