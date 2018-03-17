import React, { Component } from 'react'
import { View, Image } from 'react-native'
import Dimensions from 'Dimensions'
import { connect } from 'react-redux'
import { Container, Text } from 'native-base'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import I18n from 'react-native-i18n'
import { RadioField, NextPrevious } from '../../../Components'
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
            {I18n.t('employeeAccount')}
          </Text>
          <Field
            radio_props={this.radio_props}
            name={'entreprise'}
            component={RadioField}
            editable={editable}
          />
        </View>

        <NextPrevious isFinal onPrevious={previousPage} onSubmit={handleSubmit}/>
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