import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { Images } from '../../../Themes'
import I18n from 'react-native-i18n'
import styles from './Styles/ReceiverDetailStepStyles'
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
    this.state = { currentPage: 2 }
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
    const { fetching, onSubmit, maxAmount, receiverInfo } = this.props;
    const formStepProps = {
      editable: !fetching,
      onSubmit: currentPage !== this.formSteps.length ? this.nextPage : onSubmit,
      maxAmount,
      receiverInfo
    };
    if (currentPage !== 1) formStepProps.previousPage = this.previousPage;
    const CurrentFormComponent = this.formSteps[currentPage - 1];
    return { CurrentFormComponent, formStepProps }
  }

  render() {
    const { CurrentFormComponent, formStepProps } = this.getNextComponent(this.state.currentPage)
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Image source={Images.nfcTag} style={styles.nfcLogo} />
          <TouchableOpacity onPress={this.props.cancel} activeOpacity={0.8}>
            <Text style={styles.cancelBtn}>{I18n.t('cancel')}</Text>
          </TouchableOpacity>
        </View>
        <CurrentFormComponent {...formStepProps} />
      </View>
    )
  }
}

export default NfcTransferForm