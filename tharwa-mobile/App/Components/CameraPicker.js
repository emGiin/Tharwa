import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker';

class CameraPicker extends Component {

  takePicture = () => {
    const options = { quality: 0.5, base64: true };
    this.camera.capture({ metadata: options })
      .then(data => {
        this.props.input.onChange(data);
        this.props.onCapture(data)
      }).catch(err => console.error(err));
  }

  onPress = () => {
    var options = {
      title: 'Select Avatar',
      customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
      ],
      permissionDenied: {
        title: 'titlee',
        text: 'textttt',
        reTryTitle: '3awed',
        okTitle: 'pff'
      },
      maxWidth: 1024,
      maxHeight: 1024,
      cameraType: 'front',
      mediaType: 'photo',
      quality: 0.5
    };
    ImagePicker.launchCamera(options, ({ data }) => {
      if (data) {
        const base64 = `data:image/jpeg;base64,${data}`;
        this.props.input.onChange(base64);
        this.props.onCapture(base64)
      }
    });
  }

  render() {
    return (
      <TouchableOpacity style={this.props.style} onPress={this.onPress.bind(this)}>
        {this.props.buttonComponent()}
      </TouchableOpacity>
    )
  }
}

export { CameraPicker }
