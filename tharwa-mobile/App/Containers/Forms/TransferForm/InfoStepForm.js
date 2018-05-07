import React, { Component } from 'react'
import { Container, Content, Text } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import { InputField, NextPrevious, PickerField } from "../../../Components";
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
    const isExternal = this.props.transferType === 'externalAccount'
    return (
      <Container style={styles.mainformContainer}>
        <Content style={styles.inputContainer} >
          <Text style={{ color: Colors.white }}>{I18n.t('recieverInformation')}
          </Text>

          {
            isExternal &&
            <Field
              name={'receiver.bank'}
              icon={'md-home'}
              component={PickerField}
              editable={editable}
              placeholder={I18n.t('bank')}
              validate={pickerValidators}
              options={banks}
            />
          }

          <Field
            name={'receiver.account'}
            withRef
            refField="accountNumber"
            icon={'md-barcode'}
            ref={/* istanbul ignore next */ref => this.accountNumber = ref}
            onEnter={() => this.focusOn('lastName')}
            component={InputField}
            editable={editable}
            // validate={accountValidators}
            returnKeyType={'next'}
            placeholder={I18n.t('accountNumber')}
          />

          {
            isExternal &&
            <Field
              name={'receiver.lastName'}
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
          }

          {
            isExternal &&
            <Field
              withRef
              icon={'md-person'}
              ref={/* istanbul ignore next */ref => this.firstName = ref}
              onEnter={() => this.focusOn('amount')}
              refField="firstName"
              name={'receiver.firstName'}
              component={InputField}
              editable={editable}
              validate={nameValidators}
              returnKeyType={'next'}
              placeholder={I18n.t('firstName')}
            />
          }

          <Field
            name={'amount'}
            withRef
            refField="amount"
            icon={'md-cash'}
            onEnter={() => this.focusOn('reason')}
            ref={/* istanbul ignore next */ref => this.amount = ref}
            component={InputField}
            editable={editable}
            // validate={amountValidators}
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
            // validate={[requiredValidator]}
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