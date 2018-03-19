import React, { Component } from 'react'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import { SignupForm } from '../Forms'

// Styles
import styles from './Styles/RegisterScreenStyle'

class RegisterScreen extends Component {

  signupFormSubmit = (values) => {
    console.warn(values);
  }

  render() {
    const { fetching } = this.props;
    return (
      <Container style={[styles.container, { paddingTop: 0 }]}>
        <SignupForm
          onSubmit={this.signupFormSubmit}
          editable={!fetching}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
