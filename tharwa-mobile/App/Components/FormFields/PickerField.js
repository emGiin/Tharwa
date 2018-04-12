import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Item, Picker, Icon } from 'native-base'
import styles from '../Styles/FormFieldStyles'

class PickerField extends Component {
  state = { itemValue: 'placeholder' }

  renderOptions = () => this.props.options.map(({ label, value }) => (
    <Item label={label} value={value} key={value} />
  ))

  handleChange = (itemValue) => {
    this.setState({ itemValue });
    this.props.input.onChange(itemValue);
  }

  render() {
    const {
      input, meta, refField, icon,
      editable, placeholder
    } = this.props;
    const error = meta.invalid && (input.value === 'placeholder' || meta.touched);
    return (
      <View>
        <Item style={[styles.inputTxt, { paddingLeft: 10 }]}>
          <Icon name={icon} style={styles.inputIcon} />
          <Picker
            style={{ flex: 1, color: '#fff' }}
            ref={refField}
            disabled={!editable}
            iosHeader={placeholder}
            mode="dialog"
            selectedValue={this.state.itemValue}
            onValueChange={this.handleChange}
          >
            <Item color={'#00000090'} label={placeholder} value="placeholder" />
            {this.renderOptions()}
          </Picker>
          {error && <Icon style={styles.alertIcon} name='md-alert' />}
        </Item>
        {error && <Text style={styles.errorText}>{meta.error}</Text>}
      </View>
    )
  }
}

export { PickerField }