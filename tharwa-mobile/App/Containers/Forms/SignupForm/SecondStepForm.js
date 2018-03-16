import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Content, Text, Button, Icon } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import I18n from 'react-native-i18n'
import { InputField } from '../../../Components'
import { nameValidators } from '../../../Helpers/validators'
import styles from '../Styles/SignupFormStyle'

class SecondStepForm extends Component {
  componentDidMount() {
    this.focusOn('lastName')
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
            name={'lastName'}
            withRef
            refField="lastName"
            ref={ref => this.lastName = ref}
            onEnter={() => this.focusOn('firstName')}
            icon={'person'}
            component={InputField}
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
            icon={'person'}
            component={InputField}
            editable={editable}
            validate={nameValidators}
            returnKeyType={'done'}
            placeholder={I18n.t('firstName')}
          />
        </Content>

        <View style={styles.nextBtnContainer}>
          <Button transparent iconLeft onPress={previousPage} >
            <Icon name='ios-arrow-back-outline' />
            <Text>{I18n.t('previous')}</Text>
          </Button>
          <Button transparent iconRight onPress={handleSubmit} >
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
})(SecondStepForm);