import React, { Component } from 'react'
import { Container, Content } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import { PickerField, InputField, NextPrevious } from "../../../Components";
import {
  nameValidators
} from '../../../Helpers/validators'
import styles from '../Styles/SignupFormStyle'

export class InfoStepForm extends Component {
  focusOn = (field) => {
    /* istanbul ignore next */
    if (this[field] && this[field].getRenderedComponent)
      this[field].getRenderedComponent().refs[field]._root.focus()
  }

  render() {
    const { editable, handleSubmit, previousPage } = this.props;
    return (
      <Container style={styles.mainformContainer}>
        <Content style={styles.inputContainer} >
          <Field
            name={'accountNumber'}
            withRef
            refField="accountNumber"
            icon={'md-barcode'}
            ref={/* istanbul ignore next */ref => this.accountNumber = ref}
            onEnter={() => this.focusOn('lastName')}
            component={InputField}
            editable={editable}
            // validate={phoneValidators}
            returnKeyType={'next'}
            placeholder={I18n.t('accountNumber')}
          />

          <Field
            name={'lastName'}
            withRef
            refField="lastName"
            icon={'md-person'}
            ref={/* istanbul ignore next */ref => this.lastName = ref}
            onEnter={() => this.focusOn('firstName')}
            component={InputField}
            editable={editable}
            validate={nameValidators}
            returnKeyType={'next'}
            placeholder={I18n.t('lastName')}
          />

          <Field
            withRef
            icon={'md-person'}
            ref={/* istanbul ignore next */ref => this.firstName = ref}
            onEnter={() => this.focusOn('amount')}
            refField="firstName"
            name={'firstName'}
            component={InputField}
            editable={editable}
            validate={nameValidators}
            returnKeyType={'next'}
            placeholder={I18n.t('firstName')}
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
            returnKeyType={'done'}
            placeholder={I18n.t('reason')}
          />
        </Content>
        <NextPrevious onPrevious={previousPage} onSubmit={handleSubmit} />
      </Container>
    )
  }
}


export default reduxForm({
  form: 'transfer',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(InfoStepForm);