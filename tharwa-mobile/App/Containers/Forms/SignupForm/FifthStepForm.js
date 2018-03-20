import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Text } from 'native-base'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import I18n from 'react-native-i18n'
import { RadioField, NextPrevious } from '../../../Components'
import styles from '../Styles/SignupFormStyle'
import formStyles from './Styles/FifthStepFormStyle'

class FifthStepForm extends Component {
  radio_props = [
    { label: 'Non', value: 0 },
    { label: 'Oui ', value: 1 }
  ]

  render() {
    const { editable, handleSubmit, previousPage, picture: { mediaUri } } = this.props;
    return (
      <Container style={styles.mainformContainer}>
        <View style={formStyles.container}>
          <Image style={formStyles.imagePreview} source={{ uri: mediaUri }} />
          <Text style={formStyles.employeeText}>
            {I18n.t('employeeAccount')}
          </Text>
          <Field
            radio_props={this.radio_props}
            name={'entreprise'}
            component={RadioField}
            editable={editable}
          />
        </View>

        <NextPrevious isFinal onPrevious={previousPage} onSubmit={handleSubmit} />
      </Container>
    )
  }
}

FifthStepForm = reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(FifthStepForm);

// connect our component again to get some additional state
FifthStepForm = connect(
  state => {
    const picture = formValueSelector('signup')(state, 'picture')
    return { picture }
  }
)(FifthStepForm)

export default FifthStepForm