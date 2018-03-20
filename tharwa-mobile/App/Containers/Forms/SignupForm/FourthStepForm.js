import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Button, Text } from 'native-base'
import I18n from 'react-native-i18n'
import { reduxForm, Field } from 'redux-form'
import { CameraView } from "../../../Components/CameraView";
import styles from './Styles/FourthStepFormStyle'

class FourthStepForm extends Component {
  state = { pictureTaken: false, image: {} }

  capturePicture = (picture) => {
    this.setState({ pictureTaken: true, image: picture })
  }

  cancel = () => {
    this.setState({ pictureTaken: false, image: {} })
  }

  renderConfirmation = () => {
    const { handleSubmit } = this.props;
    const { image: { mediaUri } } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Image style={styles.imagePreview} source={{ uri: mediaUri }} />
        <View style={styles.buttonsContainer}>
          <Button full bordered rounded success style={{ marginBottom: 20 }} onPress={handleSubmit}>
            <Text>{I18n.t('confirm')}</Text>
          </Button>
          <Button full bordered rounded danger onPress={this.cancel.bind(this)}>
            <Text>{I18n.t('cancel')}</Text>
          </Button>
        </View>
      </View>
    )
  }

  render() {
    const { previousPage } = this.props;
    const { pictureTaken } = this.state;
    return (
      <View style={styles.container}>
        {
          pictureTaken ? this.renderConfirmation() :
            <Field
              name={'picture'}
              component={CameraView}
              onCapture={this.capturePicture.bind(this)}
              previousPage={previousPage}
            />
        }
      </View>

    )
  }
}


export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(FourthStepForm);