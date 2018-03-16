import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Content, Text, Button, Item, Input, Icon } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import { nameValidators } from '../../../Helpers/validators'
import styles from '../Styles/SignupFormStyle'

export class FieldInput extends Component {
  render() {
    const {
      input, meta, refField, onEnter,
      editable, placeholder, returnKeyType
    } = this.props;
    return (
      <View>
        <Item regular style={styles.inputTxt}>
          <Icon name='person' style={styles.inputIcon} />
          <Input
            ref={refField}
            placeholder={placeholder}
            returnKeyType={returnKeyType}
            autoCapitalize='words'
            onSubmitEditing={onEnter}
            editable={editable}
            placeholderTextColor="#ffffff90"
            autoFocus={false}
            style={styles.whiteColor}
            {...input} />
          {meta.invalid && meta.touched && <Icon style={{ color: '#e74c3cb0' }} name='md-alert' />}
        </Item>
        {meta.invalid && meta.touched && <Text style={styles.errorText}> {meta.error} </Text>}
      </View>
    );
  }
}

class FirstStepForm extends Component {
  componentDidMount() {
    this.lastName.getRenderedComponent().refs.lastName._root.focus()
  }

  focusOnFirstName = () => {
    this.firstName.getRenderedComponent().refs.firstName._root.focus()
  }

  render() {
    const { editable, handleSubmit } = this.props;
    // const { store } = this.context
    // const state = store.getState()
    // const values = getFormValues('form-id')(state)
    return (
      <Container style={styles.mainformContainer}>

        {/* <View style={{ flex: 1 }}>
          <Image style={styles.imagePreview} source={{ uri: mediaUri }} />
          <View style={styles.buttonsContainer}>
            <Button full bordered rounded success style={{ marginBottom: 20 }}>
              <Text>Confirmer</Text>
            </Button>
            <Button full bordered rounded danger>
              <Text>Annuler</Text>
            </Button>
          </View>
        </View> */}
        <Content style={styles.inputContainer} >
          <Field
            name={'lastName'}
            withRef
            refField="lastName"
            ref={ref => this.lastName = ref}
            onEnter={this.focusOnFirstName}
            autoFocus={true}
            component={FieldInput}
            editable={editable}
            validate={nameValidators}
            returnKeyType={'next'}
            placeholder={I18n.t('lastName')}
          />

          <Field
            withRef
            ref={ref => this.firstName = ref}
            refField="firstName"
            name={'firstName'}
            autoFocus={false}
            component={FieldInput}
            editable={editable}
            validate={nameValidators}
            returnKeyType={'done'}
            placeholder={I18n.t('firstName')}
          />
        </Content>

        <View style={styles.nextBtnContainer}>
          <Button iconRight transparent onPress={handleSubmit} Right>
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
})(FirstStepForm);