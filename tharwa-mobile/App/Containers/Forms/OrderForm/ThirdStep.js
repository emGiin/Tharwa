import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Text } from 'native-base'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import I18n from 'react-native-i18n'
import { InputField, NextPrevious } from "../../../Components";
import {
  nameValidators, extenalAccountValidators,
  requiredValidator, amountValidators
} from '../../../Helpers/validators'
import styles from '../Styles/SignupFormStyle'
import { Colors } from '../../../Themes'

export class ThirdStep extends Component {
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
            {I18n.t('employeInformation')}
          </Text>

          <Field
            name={'receiver.account'}
            withRef
            icon={'md-barcode'}
            refField="accountNumber"
            ref={/* istanbul ignore next */ref => this.accountNumber = ref}
            onEnter={() => this.focusOn('name')}
            component={InputField}
            editable={editable}
            validate={extenalAccountValidators(banks)}
            returnKeyType={'next'}
            placeholder={I18n.t('accountNumber')}
          />

          <Field
            name={'receiver.name'}
            withRef
            refField="name"
            icon={'md-person'}
            ref={/* istanbul ignore next */ref => this.name = ref}
            onEnter={() => this.focusOn('lastName')}
            component={InputField}
            editable={editable}
            validate={nameValidators}
            returnKeyType={'next'}
            placeholder={I18n.t('nom')}
          />
           <Field
            name={'receiver.lastName'}
            withRef
            refField="lastName"
            icon={'md-person'}
            ref={/* istanbul ignore next */ref => this.name = ref}
            onEnter={() => this.focusOn('amount')}
            component={InputField}
            editable={editable}
            validate={nameValidators}
            returnKeyType={'next'}
            placeholder={I18n.t('prenom')}
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
            returnKeyType={'done'}
            placeholder={I18n.t('amount')}
          />

      
        </Content>
        <NextPrevious onPrevious={previousPage} onSubmit={handleSubmit} />
      </Container>
    )
  }
}

export default reduxForm({
    form: 'OrderForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
  })(ThirdStep);