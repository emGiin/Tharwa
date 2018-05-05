import React, { Component } from 'react'
import { View, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Container, Text } from 'native-base'
import { reduxForm, formValueSelector } from 'redux-form'
import Pulse from 'react-native-pulse'
import I18n from 'react-native-i18n'
import { NextPrevious } from '../../../Components'
import formStyles from '../Styles/SignupFormStyle'
import styles from './Styles/ProgressStepFormStyle'
import { Colors } from '../../../Themes';
import { formatMoney } from '../../../Transforms';

export class ProgressStepForm extends Component {
  render() {
    const { editable, handleSubmit, previousPage } = this.props;
    const size = Dimensions.get('window').width / 2;
    const { confirmed } = !editable
    return (
      <Container style={formStyles.mainformContainer}>
        <Text style={styles.detailsText}>
          {confirmed ? I18n.t("transferInProgress") : I18n.t("confirmTransfer")}
        </Text>
        <View style={styles.container}>
          {
            confirmed && <Pulse color={Colors.button} numPulses={3} diameter={size + 100} speed={10} duration={1000} />
          }
          <TouchableOpacity style={styles.button}
            disabled={confirmed}
            activeOpacity={0.8}
            onPress={handleSubmit}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.amount}>
              {formatMoney(this.props.amount || 0)} DZD
            </Text>
          </TouchableOpacity>
        </View>
        <NextPrevious disablePrevious={confirmed} onPrevious={previousPage} />
      </Container>
    )
  }
}

let StepForm = reduxForm({
  form: 'transfer',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ProgressStepForm);

// connect our component again to get some additional state
StepForm = connect(
  /* istanbul ignore next */
  state => ({
    amount: formValueSelector('transfer')(state, 'amount')
  })
)(StepForm)

export default StepForm