import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { Container, Text } from 'native-base'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
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
    <Container style={[styles.container, styles.successContainer]}>
      <Text style={styles.sucessText}>{I18n.t('registrationSuccessTop')}</Text>
      <View style={styles.logoContainer}>
        <Image source={Images.logo} style={styles.logo} />
      </View>
      <Text style={styles.sucessText}>{I18n.t('registrationSuccessBottom')}</Text>
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
