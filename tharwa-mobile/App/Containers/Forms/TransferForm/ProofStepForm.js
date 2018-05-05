import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text, Container } from 'native-base'
import I18n from 'react-native-i18n'
import { reduxForm, Field } from 'redux-form'
import { Images } from '../../../Themes'
import { CameraPicker, NextPrevious } from "../../../Components";
import fomrsStyles from '../Styles/SignupFormStyle'
import styles from './Styles/ProofStepFormStyle'

export class ProofStepForm extends Component {
  state = { picture: '' }

  capturePicture = (picture) => {
    this.setState({ picture: picture })
  }

  render() {
    const { previousPage, handleSubmit } = this.props;
    const imageSrc = this.state.picture ? { uri: this.state.picture } : Images.avatar
    return (
      <Container style={fomrsStyles.mainformContainer}>
        <View style={styles.container}>
          <Text style={styles.detailsText}>
            {I18n.t('transferProofPicture')}
          </Text>
          <Field
            name={'picture'}
            component={CameraPicker}
            onCapture={this.capturePicture.bind(this)}
            previousPage={previousPage}
            style={styles.buttonContainer}
            buttonComponent={/* istanbul ignore next */() => <Image style={styles.imagePreview} source={imageSrc} />}
          />
        </View>
        <NextPrevious onPrevious={previousPage} onSubmit={handleSubmit} />
      </Container>
    )
  }
}


export default reduxForm({
  form: 'transfer',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ProofStepForm);