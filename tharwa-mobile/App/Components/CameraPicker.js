import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker';

const MAX_SIZE = 1024

class CameraPicker extends Component {
  static propTypes = {
    onCapture: PropTypes.func.isRequired,
    cameraType: PropTypes.string,
    children: PropTypes.object,
  }

  static defaultProps = {
    cameraType: 'front'
  }

  options = {
    maxWidth: MAX_SIZE,
    maxHeight: MAX_SIZE,
    cameraType: this.props.cameraType,
    mediaType: 'photo',
    quality: 0.5
  }

  onPress = () => {
    ImagePicker.launchCamera(options, ({ data }) => {
      if (data) {
        const base64 = `data:image/jpeg;base64,${data}`;
        if (this.props.input && typeof this.props.input === 'function') {
          this.props.input.onChange(base64);
        }
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
