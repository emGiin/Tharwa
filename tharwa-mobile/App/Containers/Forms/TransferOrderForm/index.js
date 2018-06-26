import React, { Component } from 'react'
import { View } from 'react-native'
import { reduxForm } from 'redux-form'
import styles from '../Styles/SignupFormStyle'
import { Header } from '../../../Components'
import FirstStep from './FirstStep'
import { Colors } from '../../../Themes';

class TransferOrderForm extends Component {
  formSteps = [
    FirstStep
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
    const { fetching, onSubmit, banks } = this.props;
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
        <Header icon={'md-arrow-round-back'} text={'Nouveau ordre de virement'} />
        <CurrentFormComponent {...formStepProps} />
      </View>
    )
  }
}

export default TransferOrderForm