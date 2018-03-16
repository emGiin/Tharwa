import React, { Component } from 'react'
import { View } from 'react-native'
import styles from '../Styles/SignupFormStyle'

import FirstStepForm from './FirstStepForm'
import SecondStepForm from './SecondStepForm'
import ThirdStepForm from './ThirdStepForm'
import FourthStepForm from './FourthStepForm'
import FifthStepForm from './FifthStepForm'

class SignupForm extends Component {
  formSteps = [
    FirstStepForm,
    SecondStepForm,
    ThirdStepForm,
    FourthStepForm,
    FifthStepForm,
  ]

  constructor(props) {
    super(props)
    this.state = { currentPage: 1 }
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  nextPage() {
    this.setState({ currentPage: this.state.currentPage + 1 })
  }

  previousPage() {
    this.setState({ currentPage: this.state.currentPage - 1 })
  }

  render() {
    const { fetching, onSubmit } = this.props;
    const { currentPage } = this.state;
    const formStepProps = {
      editable: !fetching,
      onSubmit: currentPage !== this.formSteps.length ? this.nextPage : onSubmit,
    };
    if (currentPage !== 1) formStepProps.previousPage = this.previousPage;
    const CurrentFormComponent = this.formSteps[currentPage - 1];

    return (
      <View style={styles.mainformContainer}>
        <CurrentFormComponent {...formStepProps} />
      </View>
    )
  }
}


export default SignupForm;