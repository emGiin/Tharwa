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
    const { editable, handleSubmit, previousPage } = this.props;

    return (
      <Container style={styles.mainformContainer}>
        <Content style={styles.inputContainer} >
          <Text style={{ color: Colors.white }}>{I18n.t('recieverInformation')}
          </Text>

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
  form: 'tharwaTransfer',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(InfoStepForm);