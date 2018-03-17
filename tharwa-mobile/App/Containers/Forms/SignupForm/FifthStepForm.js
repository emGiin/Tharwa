import React, { Component } from 'react'
import { View, Image } from 'react-native'
import Dimensions from 'Dimensions'
import { connect } from 'react-redux'
import { Container, Content, Text, Button, Icon } from 'native-base'
import RadioForm from 'react-native-simple-radio-button';
import { reduxForm, Field, formValueSelector } from 'redux-form'
import I18n from 'react-native-i18n'
import styles from '../Styles/SignupFormStyle'

class FirstStepForm extends Component {
  radio_props = [
    { label: 'Oui ', value: true },
    { label: 'Non', value: false }
  ]

  render() {
    const size = Dimensions.get('window').width / 2
    const { editable, handleSubmit, previousPage, picture: { mediaUri } } = this.props;
    return (
      <Container style={styles.mainformContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image style={{ marginVertical: 20, width: size, height: size, borderRadius: 100 }} source={{ uri: mediaUri }} />
          <Text style={{ marginVertical: 20, textAlign: 'center', paddingHorizontal: 30 }}>
            Voulez vous utiliser votre compte pour payer vos employés ?
          </Text>
          <RadioForm
            radio_props={this.radio_props}
            initial={0}
            animation={false}
            onPress={(value) => { this.setState({ value: value }) }}
          />
        </View>

        <View style={styles.nextBtnContainer}>
          <Button transparent iconLeft onPress={previousPage} >
            <Icon name='ios-arrow-back-outline' />
            <Text>{I18n.t('previous')}</Text>
          </Button>
          <Button transparent iconRight onPress={handleSubmit} >
            <Text>{I18n.t('confirm')}</Text>
            <Icon name='ios-checkmark-circle' />
          </Button>
        </View>
      </Container>
    )
  }
}

FirstStepForm = reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(FirstStepForm);

// connect our component again to get some additional state
FirstStepForm = connect(
  state => {
    const picture = formValueSelector('signup')(state, 'picture')
    return { picture }
  }
)(FirstStepForm)

export default FirstStepForm