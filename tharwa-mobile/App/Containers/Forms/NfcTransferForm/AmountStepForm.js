import React, { Component } from 'react'
import { Container, Content } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import { InputField, NextPrevious } from "../../../Components";
import { nfcAmountValidators } from '../../../Helpers/validators'
import styles from '../Styles/SignupFormStyle'

export class InfoStepForm extends Component {
  componentDidMount() {
    this.focusOn('amount')
  }

  focusOn = (field) => {
    /* istanbul ignore next */
    if (this[field] && this[field].getRenderedComponent)
      this[field].getRenderedComponent().refs[field]._root.focus()
  }

  render() {
    const { editable, handleSubmit, previousPage, maxAmount } = this.props;

    return (
      <Container style={[styles.mainformContainer, { marginTop: 20 }]}>
        <Content style={styles.inputContainer}>
          <Field
            name={'amount'}
            withRef
            refField="amount"
            icon={'md-cash'}
            ref={/* istanbul ignore next */ref => this.amount = ref}
            component={InputField}
            editable={editable}
            validate={nfcAmountValidators(maxAmount)}
            returnKeyType={'done'}
            keyboardType={'numeric'}
            placeholder={I18n.t('amount')}
          />
        </Content>
        <NextPrevious onPrevious={previousPage} onSubmit={handleSubmit} />
      </Container>
    )
  }
}


export default reduxForm({
  form: 'NfcTransferForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(InfoStepForm);