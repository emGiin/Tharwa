import React, { Component } from 'react'
import { Container, Content } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import { PickerField, InputField, NextPrevious } from "../../../Components";
import {
  addressValidators,
  phoneValidators,
  pickerValidators
} from '../../../Helpers/validators'
import styles from '../Styles/SignupFormStyle'

export class ThirdStepForm extends Component {
  functions = [
    { label: 'Etudiant', value: 'student' },
    { label: 'Ingénieur', value: 'engineer' },
  ]

  componentDidMount() {
    this.focusOn('phone')
  }

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
            name={'phone'}
            withRef
            refField="phone"
            icon={'md-keypad'}
            ref={/* istanbul ignore next */ref => this.phone = ref}
            onEnter={() => this.focusOn('address')}
            component={InputField}
            editable={editable}
            validate={phoneValidators}
            returnKeyType={'next'}
            keyboardType={'numeric'}
            placeholder={I18n.t('phone')}
          />

          <Field
            withRef
            icon={'ios-home'}
            ref={/* istanbul ignore next */ref => this.address = ref}
            refField="address"
            name={'address'}
            component={InputField}
            editable={editable}
            validate={addressValidators}
            returnKeyType={'done'}
            placeholder={I18n.t('address')}
          />

          <Field
            name={'function'}
            icon={'ios-briefcase'}
            component={PickerField}
            editable={editable}
            placeholder={I18n.t('functionSelection')}
            validate={pickerValidators}
            options={this.functions}
          />
        </Content>
        <NextPrevious onPrevious={previousPage} onSubmit={handleSubmit} />
      </Container>
    )
  }
}


export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ThirdStepForm);