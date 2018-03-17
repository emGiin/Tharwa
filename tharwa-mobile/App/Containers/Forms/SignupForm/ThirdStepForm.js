import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Content, Text, Button, Icon } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import { PickerField, InputField } from "../../../Components";
import {
  addressValidators,
  phoneValidators,
  pickerValidators
} from '../../../Helpers/validators'
import styles from '../Styles/SignupFormStyle'

class ThirdStepForm extends Component {
  functions = [
    { label: 'Etudiant', value: 'student' },
    { label: 'Ingénieur', value: 'engineer' },
  ]

  componentDidMount() {
    this.focusOn('phone')
  }

  focusOn = (field) => {
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
            ref={ref => this.phone = ref}
            onEnter={() => this.focusOn('address')}
            component={InputField}
            editable={editable}
            validate={phoneValidators}
            returnKeyType={'next'}
            placeholder={I18n.t('phone')}
          />

          <Field
            withRef
            icon={'ios-home'}
            ref={ref => this.address = ref}
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

        <View style={styles.nextBtnContainer}>
          <Button iconLeft transparent onPress={previousPage} >
            <Icon name='ios-arrow-back-outline' />
            <Text>{I18n.t('previous')}</Text>
          </Button>
          <Button iconRight transparent onPress={handleSubmit} >
            <Text>{I18n.t('next')}</Text>
            <Icon name='ios-arrow-forward-outline' />
          </Button>
        </View>
      </Container>
    )
  }
}


export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ThirdStepForm);