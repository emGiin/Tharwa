import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Content, Text, Button, Icon } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import { PickerField, InputField } from "../../../Components";
import { addressValidators, phoneValidators } from '../../../Helpers/validators'
import styles from '../Styles/SignupFormStyle'

class ThirdStepForm extends Component {
  componentDidMount() {
    this.focusOn('phone')
  }

  focusOn = (field) => {
    this[field].getRenderedComponent().refs[field]._root.focus()
  }

  render() {
    const { editable, handleSubmit } = this.props;
    return (
      <Container style={styles.mainformContainer}>
        <Content style={styles.inputContainer} >
          <Field
            name={'phone'}
            withRef
            refField="phone"
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
            component={PickerField}
            editable={editable}
            placeholder={I18n.t('function')}
          />
        </Content>

        <View style={styles.nextBtnContainer}>
          <Button iconLeft transparent onPress={handleSubmit} >
            <Icon name='ios-arrow-back-outline' />
            <Text>Précédant</Text>
          </Button>
          <Button iconRight transparent onPress={handleSubmit} >
            <Text>Suivant</Text>
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