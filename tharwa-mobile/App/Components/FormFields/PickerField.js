import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Item, Picker, Icon } from 'native-base'
import styles from '../Styles/FormFieldStyles'

class PickerField extends Component {
  state = { itemValue: 'placeholder' }

  renderOptions = () => {
    let options = []
    const { placeholder } = this.props
    if (placeholder)
      options.push(<Item key={'placeholder'} color={'#00000090'} label={placeholder} value="placeholder" />)
    options = options.concat(this.props.options.map(data => (
      <Item label={data.label || data} value={data.value || data} key={data.value || data} />
    )).filter(data => !!data))
    return options
  }

  handleChange = (itemValue) => {
    this.setState({ itemValue });
    this.props.input.onChange(itemValue);
    this.props.onChange && this.props.onChange(itemValue)
  }

  render() {
    const {
      input, meta, refField, icon, initialValue, editable, placeholder, selectedValue
    } = this.props;
    const error = meta && meta.invalid && (input.value === 'placeholder' || meta.touched);
    const hasValue = !!input.value

    return (
      <View style={{ flex: 1 }}>
        {
          hasValue && !!placeholder &&
          <Text style={styles.placeholder}>
            {placeholder}
          </Text>
        }
        <Item style={[styles.inputTxt, icon && { paddingLeft: 10 }, (!hasValue || !placeholder) && { marginTop: 10 }]}>
          <Icon name={icon} style={styles.inputIcon} />
          <Picker
            style={{ flex: 1, color: '#fff' }}
            ref={refField}
            disabled={!editable}
            iosHeader={placeholder}
            mode={"dialog"}
            selectedValue={selectedValue || input.value || initialValue}
            onValueChange={this.handleChange}
          >
            {this.renderOptions()}
          </Picker>
          {error && <Icon style={styles.alertIcon} name='md-alert' />}
        </Item>
        {!!meta && error && <Text style={styles.errorText}>{meta.error}</Text>}
      </View>
    )
  }
}

export { PickerField }