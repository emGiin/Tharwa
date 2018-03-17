import React, { Component } from 'react'
import RadioForm from 'react-native-simple-radio-button';

class RadioField extends Component {
  state = { value: '' }

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
      />
    )
  }
}

export { RadioField }