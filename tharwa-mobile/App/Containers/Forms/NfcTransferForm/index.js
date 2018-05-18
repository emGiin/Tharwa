import React, { Component } from 'react'
import { View } from 'react-native'
import ReceiverDetailStep from './ReceiverDetailStep'
import AmountStepForm from './AmountStepForm'
import ProgressStepForm from './ProgressStepForm'

class NfcTransferForm extends Component {
  formSteps = [
    ReceiverDetailStep,
    AmountStepForm,
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
    const { fetching, onSubmit, maxAmount, receiverInfo, cancel } = this.props;
    const formStepProps = {
      editable: !fetching,
      onSubmit: currentPage !== this.formSteps.length ? this.nextPage : onSubmit,
      maxAmount,
      receiverInfo,
      cancel
    };
    if (currentPage !== 1) formStepProps.previousPage = this.previousPage;
    const CurrentFormComponent = this.formSteps[currentPage - 1];
    return { CurrentFormComponent, formStepProps }
  }

  render() {
    const { CurrentFormComponent, formStepProps } = this.getNextComponent(this.state.currentPage)
    return (
      <View style={{ flex: 1 }}>
        {/* <Header icon={'md-arrow-round-back'} text={I18n.t('transfer')} /> */}
        <CurrentFormComponent {...formStepProps} />
      </View>
    )
  }
}

export default NfcTransferForm