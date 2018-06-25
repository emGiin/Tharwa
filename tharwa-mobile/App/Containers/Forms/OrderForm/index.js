import React, { Component } from 'react'
import { View } from 'react-native'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import styles from '../Styles/SignupFormStyle'
import { Header } from '../../../Components'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import { Colors } from '../../../Themes';

class ExternalTransferForm extends Component {
  formSteps = [
    FirstStep,
    SecondStep,
    ThirdStep
  ]

  constructor(props) {
    super(props)
    this.state = { currentPage: 1 }
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  componentWillReceiveProps({ OrderInfos }) {
    
      this.formSteps = [
        FirstStep,
        SecondStep,
        ThirdStep
      ]
    
  }

  nextPage() {
    this.setState({ currentPage: this.state.currentPage + 1 })
  }

  previousPage() {
    this.setState({ currentPage: this.state.currentPage - 1 })
  }

  getNextComponent = (currentPage) => {
    const { fetching, onSubmit, OrderInfos } = this.props;
    const formStepProps = {
      editable: !fetching,
      onSubmit: currentPage !== this.formSteps.length ? this.nextPage : onSubmit,
      banks
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
  form: 'OrderForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ExternalTransferForm);

// connect our component again to get some additional state
Form = connect(
  /* istanbul ignore next */
  state => ({
    OrderInfos: formValueSelector('OrderForm')(state, 'OrderInfos')
  })
)(Form)

export default Form