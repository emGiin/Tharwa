import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Text } from 'native-base'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import I18n from 'react-native-i18n'
import { RadioField, NextPrevious } from '../../../Components'
import styles from '../Styles/SignupFormStyle'
import formStyles from './Styles/ProgressStepFormStyle'

export class ProgressStepForm extends Component {
  radio_props = [
    { label: 'Non', value: 1 },
    { label: 'Oui ', value: 2 }
  ]

  render() {
    const { editable, handleSubmit, previousPage, picture } = this.props;
    return (
      <Container style={styles.mainformContainer}>
        <View style={formStyles.container}>
          <Image style={formStyles.imagePreview} source={{ uri: picture }} />
          <Text style={formStyles.employeeText}>
            {I18n.t('employeeAccount')}
          </Text>
          <Field
            radio_props={this.radio_props}
            name={'type'}
            component={RadioField}
            editable={editable}
          />
        </View>

        <NextPrevious isFinal onPrevious={previousPage} onSubmit={handleSubmit} />
      </Container>
    )
  }
}

export default reduxForm({
  form: 'transfer',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ProgressStepForm);