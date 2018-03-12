import React, { Component } from 'react'
// import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { Container } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import SignupForm from '../Components/SignupForm'

// Styles
import styles from './Styles/RegisterScreenStyle'

class RegisterScreen extends Component {

  signupFormSubmit = values => console.tron.log(values)


  render() {
    const { fetching } = this.props;
    return (
      <Container style={[styles.container, { paddingTop: 0 }]}>
        {/* <Text style={styles.signupTxt}>Remplisser les champs suivants</Text> */}
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
