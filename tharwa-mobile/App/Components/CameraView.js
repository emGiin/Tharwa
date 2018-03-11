import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon, Text } from 'native-base'
import Camera from 'react-native-camera';
import { NavigationActions } from 'react-navigation'

import styles from './Styles/CameraViewStyle'

class CameraView extends Component {
  takePicture = () => {
    const options = {};
    //options.location = ...
    this.camera.capture({ metadata: options })
      .then(data => this.props.onCapture)
      .catch(err => console.error(err));
  }

  goBack() {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  render() {
    const { cancel } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backIcon} onPress={cancel}>
          <Icon
            name={'ios-arrow-dropleft-outline'}
            size={40}
            style={{ color: '#fff' }} />
        </TouchableOpacity>
        <Camera
          ref={cam => this.camera = cam}
          style={styles.preview}
          onBarCodeRead={() => { }}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture}>
            [CAPTURE]
          </Text>
        </Camera>
      </View>
    )
  }
}

export default CameraView
