import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Text, Icon } from 'native-base'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import I18n from 'react-native-i18n'
import { InputField, NextPrevious, PickerField, AccountField } from "../../../Components";
import {
  nameValidators, accountValidators,
  requiredValidator, amountValidators,
  pickerValidators
} from '../../../Helpers/validators'
import styles from '../Styles/SignupFormStyle'
import { Colors } from '../../../Themes';

export class InfoStepForm extends Component {
  focusOn = (field) => {
    /* istanbul ignore next */
    if (this[field] && this[field].getRenderedComponent)
      this[field].getRenderedComponent().refs[field]._root.focus()
  }

  render() {
    const { editable, handleSubmit, previousPage, banks } = this.props;
    let { selectedBank } = this.props
    if (!selectedBank || selectedBank === 'placeholder') selectedBank = "_ _ _"
    return (
      <Container style={styles.mainformContainer}>
        <Content style={styles.inputContainer} >
          <Text style={{ color: Colors.white }}>
            {I18n.t('recieverInformation')}
          </Text>

          <Field
            name={'receiver.bank'}
            icon={'md-home'}
            component={PickerField}
            editable={editable}
            placeholder={I18n.t('bank')}
            validate={pickerValidators}
            options={banks}
          />

          <Field
            name={'receiver.account'}
            withRef
            refField="accountNumber"
            ref={/* istanbul ignore next */ref => this.accountNumber = ref}
            onEnter={() => this.focusOn('name')}
            component={AccountField}
            editable={editable}
            validate={accountValidators}
            returnKeyType={'next'}
            placeholder={I18n.t('accountNumber')}
            selectedBank={selectedBank}
          />

          <Field
            name={'receiver.name'}
            withRef
            refField="name"
            icon={'md-person'}
            ref={/* istanbul ignore next */ref => this.name = ref}
            onEnter={() => this.focusOn('amount')}
            component={InputField}
            editable={editable}
            validate={nameValidators}
            returnKeyType={'next'}
            placeholder={I18n.t('name')}
          />

          <Field
            name={'amount'}
            withRef
            refField="amount"
            icon={'md-cash'}
            onEnter={() => this.focusOn('reason')}
            ref={/* istanbul ignore next */ref => this.amount = ref}
            component={InputField}
            editable={editable}
            validate={amountValidators}
            returnKeyType={'next'}
            keyboardType={'numeric'}
            placeholder={I18n.t('amount')}
          />

          <Field
            withRef
            icon={'md-information-circle'}
            ref={/* istanbul ignore next */ref => this.reason = ref}
            refField="reason"
            name={'reason'}
            component={InputField}
            editable={editable}
            validate={[requiredValidator]}
            returnKeyType={'done'}
            placeholder={I18n.t('reason')}
          />
        </Content>
        <NextPrevious onPrevious={previousPage} onSubmit={handleSubmit} />
      </Container>
    )
  }
}

let StepForm = reduxForm({
  form: 'ExternalTransferForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(InfoStepForm);

// connect our component again to get some additional state
StepForm = connect(
  /* istanbul ignore next */
  state => ({
    selectedBank: formValueSelector('ExternalTransferForm')(state, 'receiver.bank')
  })
)(StepForm)

export default StepForm