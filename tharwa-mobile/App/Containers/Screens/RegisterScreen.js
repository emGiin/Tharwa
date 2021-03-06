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

/* istanbul ignore next */
const LogoImage = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={Images.logo} style={styles.logo} />
    </View>
  )
}
class RegisterScreen extends Component {
  static propTypes = {
    attemptSignup: PropTypes.func,
    fetching: PropTypes.bool,
    error: PropTypes.string,
    success: PropTypes.bool
  }

  state = { showSuccessPage: false }

  componentWillReceiveProps(props) {
    /* istanbul ignore else */
    if (!props.fetching && props.success) {
      this.setState({ showSuccessPage: true })
    }
  }

  submit = (values) => {
    delete values.passwordConfirmation
    this.dialog.show();
    this.props.attemptSignup(values);
  }

  renderSuccessPage = () => (
    <Container style={[styles.container, styles.successContainer]}>
      <Text style={styles.successText}>{I18n.t('registrationSuccessTop')}</Text>
      <LogoImage />
      <Text style={styles.successText}>{I18n.t('registrationSuccessBottom')}</Text>
    </Container>
  )

  renderForm = () => {
    const { fetching, error } = this.props;
    return (
      <Container style={[styles.container, styles.formContainer]}>
        <LoadingDialog
          init={/* istanbul ignore next */dialog => { this.dialog = dialog }}
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

  render() {
    return this.state.showSuccessPage ? this.renderSuccessPage() : this.renderForm()
  }
}

const mapStateToProps = ({ signup: { fetching, error, success } }) => {
  return { fetching, error, success }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSignup: data => dispatch(SignupActions.signupRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
