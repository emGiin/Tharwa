import React, { Component } from 'react'
import { View } from 'react-native'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import styles from '../Styles/SignupFormStyle'
import { Header } from '../../../Components'
import InfoStepForm from './InfoStepForm'
import ProofStepForm from './ProofStepForm'
import ProgressStepForm from './ProgressStepForm'
import { Colors } from '../../../Themes';

class TharwaTransferForm extends Component {
  formSteps = [
    InfoStepForm,
    ProgressStepForm
  ]

  constructor(props) {
    super(props)
    this.state = { currentPage: 1 }
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  componentWillReceiveProps({ amount }) {
    if (amount > this.props.maxTransfer) {
      this.formSteps = [
        InfoStepForm,
        ProofStepForm,
        ProgressStepForm
      ]
    } else {
      this.formSteps = [
        InfoStepForm,
        ProgressStepForm
      ]
    }
  }

  nextPage() {
    this.setState({ currentPage: this.state.currentPage + 1 })
  }

  previousPage() {
    this.setState({ currentPage: this.state.currentPage - 1 })
  }

  getNextComponent = (currentPage) => {
    const { editable, onSubmit } = this.props;
    const formStepProps = {
      editable,
      onSubmit: currentPage !== this.formSteps.length ? this.nextPage : onSubmit
    };
    if (currentPage !== 1) formStepProps.previousPage = this.previousPage;
    const CurrentFormComponent = this.formSteps[currentPage - 1];
    return { CurrentFormComponent, formStepProps }
  }

  render() {
    const { CurrentFormComponent, formStepProps } = this.getNextComponent(this.state.currentPage)
    return (
      <View style={[styles.mainformContainer, {
        backgroundColor: Colors.background
      }]}>
        <Header icon={'md-arrow-round-back'} text={I18n.t('transfer')} />
        <CurrentFormComponent {...formStepProps} />
      </View>
    )
  }
}

let Form = reduxForm({
  form: 'tharwaTransfer',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(TharwaTransferForm);

// connect our component again to get some additional state
Form = connect(
  /* istanbul ignore next */
  state => ({
    amount: formValueSelector('tharwaTransfer')(state, 'amount')
  })
)(Form)

export default Form