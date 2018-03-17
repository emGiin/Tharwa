import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import Camera from 'react-native-camera';
import styles from './Styles/CameraViewStyle'

class CameraView extends Component {
  state = { type: Camera.constants.Type.front }

  takePicture = () => {
    const options = { quality: 0.5, base64: true };
    this.camera.capture({ metadata: options })
      .then(data => {
        this.props.input.onChange(data);
        this.props.onCapture(data)
      }).catch(err => console.error(err));
  }

  switchCamera = () => {
    const type = Camera.constants.Type
    this.setState({ type: this.state.type === type.front ? type.back : type.front })
  }

  render() {
    const { previousPage } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backIcon} onPress={previousPage}>
          <Icon
            name={'ios-arrow-dropleft'}
            style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraTypeIcon} onPress={this.switchCamera}>
          <Icon
            name={'ios-reverse-camera'}
            style={styles.icon} />
        </TouchableOpacity>
        <Camera
          ref={cam => this.camera = cam}
          style={styles.preview}
          onBarCodeRead={() => { }}
          type={this.state.type}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          aspect={Camera.constants.Aspect.fill}>
          <TouchableOpacity onPress={this.takePicture}>
            <Icon
              name={'ios-camera'}
              style={{ color: '#fff', fontSize: 70 }} />
          </TouchableOpacity>
        </Camera>
      </View>
    )
  }
}

export { CameraView }
