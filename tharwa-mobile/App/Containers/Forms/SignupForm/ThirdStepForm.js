import React, { Component } from 'react'
import { Container, Content } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import { InputField, NextPrevious } from "../../../Components";
import {
  addressValidators,
  phoneValidators,
  nameValidators
} from '../../../Helpers/validators'
import styles from '../Styles/SignupFormStyle'

export class ThirdStepForm extends Component {
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
            onEnter={() => this.focusOn('function')}
            refField="address"
            name={'address'}
            component={InputField}
            editable={editable}
            validate={addressValidators}
            returnKeyType={'next'}
            placeholder={I18n.t('address')}
          />

          <Field
            withRef
            icon={'ios-briefcase'}
            ref={/* istanbul ignore next */ref => this.function = ref}
            refField="function"
            name={'function'}
            component={InputField}
            editable={editable}
            validate={nameValidators}
            returnKeyType={'done'}
            placeholder={I18n.t('function')}
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