import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Container } from 'native-base'
import I18n from 'react-native-i18n'
import { reduxForm } from 'redux-form'
import { Images, Colors } from '../../../Themes'
import { NextPrevious } from "../../../Components";
import styles from './Styles/ReceiverDetailStepStyles'

class ReceiverDetailStep extends Component {
  render() {
    const { previousPage, handleSubmit/*, receiverInfo*/, cancel } = this.props;
    return (
      <Container style={{ flex:1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.topContainer}>
            <Image source={Images.nfcTag} style={styles.nfcLogo} />
            <TouchableOpacity onPress={cancel} activeOpacity={0.8}>
              <Text style={styles.cancelBtn}>{I18n.t('cancel')}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.detailsText}>
            Vous allez effectuer un micro virement vers le client Tharwa suivant, veuiller verifier les information reçu
          </Text>
          <View style={styles.container}>
            <Image source={Images.avatar} style={{ width: 150, height: 150, borderRadius: 150 }} />
            <View style={{ flex: 1, marginTop: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{}}>
                <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold' }}>Nom:</Text>
                <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold' }}>Email:</Text>
                <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold' }}>Code Banquaire:</Text>
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ color: Colors.white, fontSize: 18 }}>User Tharwa</Text>
                <Text style={{ color: Colors.white, fontSize: 18 }}>user@email.com</Text>
                <Text style={{ color: Colors.white, fontSize: 18 }}>THW000000DZD</Text>
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