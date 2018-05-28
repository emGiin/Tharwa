import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Container } from 'native-base'
import I18n from 'react-native-i18n'
import { reduxForm } from 'redux-form'
import { NextPrevious } from "../../../Components";
import styles from './Styles/ReceiverDetailStepStyles'

class ReceiverDetailStep extends Component {
  render() {
    const { previousPage, handleSubmit, receiverInfo } = this.props;
    return (
      <Container style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.detailsText}>
            {I18n.t('microTransferReceiverDetails')}
          </Text>
          <View style={styles.container}>
            <Image source={receiverInfo.picture} style={styles.avatar} />
            <View style={styles.receiverDetailsContainer}>
              <View>
                <Text style={styles.title}>{I18n.t('emailPlaceholder')}:</Text>
                <Text style={styles.title}>{I18n.t('name')}:</Text>
                <Text style={styles.title}>{I18n.t('accountNumber')}:</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detail}>{receiverInfo.email}</Text>
                <Text style={styles.detail}>{receiverInfo.name}</Text>
                <Text style={styles.detail}>{receiverInfo.accountNumber}</Text>
              </View>
            </View>
          </View>
        </View>
        <NextPrevious onPrevious={previousPage} onSubmit={handleSubmit} />
      </Container>
    )
  }
}

export default reduxForm({
  form: 'NfcTransferForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ReceiverDetailStep);