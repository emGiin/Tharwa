import React, { Component } from 'react'
import { View } from 'react-native'
import I18n from 'react-native-i18n'
import styles from '../Styles/SignupFormStyle'
import { Header } from '../../../Components'
import InfoStepForm from './InfoStepForm'
import ProofStepForm from './ProofStepForm'
import ProgressStepForm from './ProgressStepForm'

class TransferForm extends Component {
  formSteps = [
    InfoStepForm,
    ProofStepForm,
    ProgressStepForm
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

  getNextComponent = (currentPage) => {
    const { fetching, onSubmit } = this.props;
    const formStepProps = {
      editable: !fetching,
      onSubmit: currentPage !== this.formSteps.length ? this.nextPage : onSubmit,
    };
    if (currentPage !== 1) formStepProps.previousPage = this.previousPage;
    const CurrentFormComponent = this.formSteps[currentPage - 1];
    return { CurrentFormComponent, formStepProps }
  }

  render() {
    const { CurrentFormComponent, formStepProps } = this.getNextComponent(this.state.currentPage)
    return (
      <View style={styles.mainformContainer}>
        <Header icon={'md-arrow-round-back'} text={I18n.t('transfer')} />
        <CurrentFormComponent {...formStepProps} />
      </View>
    )
  }
}


export default TransferForm;