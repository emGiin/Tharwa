import React, { Component } from 'react'
import RadioForm from 'react-native-simple-radio-button';
import { Colors } from '../../Themes'

class RadioField extends Component {
  constructor(props) {
    super(props)
    const { value } = props.radio_props[0]
    this.state = { value }
    props.input.onChange(value);
  }

  handleChange = (value) => {
    this.setState({ value });
    this.props.input.onChange(value);
  }

  render() {
    const { refField, radio_props, editable } = this.props;
    return (
      <RadioForm
        radio_props={radio_props}
        ref={refField}
        disabled={!editable}
        initial={0}
        animation={false}
        onPress={this.handleChange}
        buttonColor={Colors.button}
        selectedButtonColor={Colors.button}
        labelColor={Colors.white}
        selectedLabelColor={Colors.white}
      />
    )
  }
}

export { RadioField }