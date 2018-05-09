import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Icon } from 'native-base'
import { connect } from 'react-redux'
import { InputField, PickerField, Header } from '../../Components'
import ExchangeRateActions from '../../Redux/ExchangeRateRedux'

// Styles
import styles from './Styles/ExchangeRateScreenStyles'
import { Colors } from '../../Themes';

class ExchangeRateScreen extends Component {
  INTERVAL = 10000
  state = {
    from: { value: '1', currecy: 'dzd' },
    to: { value: '139.4', currecy: 'euro' }
  }
  fromCurrencies = ['dzd', 'euro', 'usd']
  toCurrencies = ['euro', 'usd']

  componentWillMount() {
    if (this.props.rates.length === 0) {
      this.props.getRates()
      this.startFetchingInterval()
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  startFetchingInterval = () => {
    this.interval = setInterval(this.props.getRates, this.INTERVAL)
  }

  renderExchageRateItem = () => this.props.rates.map(({ from, to, value }) => (
    <TouchableOpacity activeOpacity={0.5} style={styles.container} key={`${from}-${to}`}>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', marginHorizontal: 20 }}>
        <Text style={{ color: Colors.white, fontSize: 20, textAlign: 'center' }}>{from.toUpperCase()}</Text>
        <Text style={{ color: Colors.white, fontSize: 18, textAlign: 'center' }}>1</Text>
      </View>
      <View style={{ width: 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', marginHorizontal: 20 }}>
        <Icon name={'ios-swap'} style={{ color: Colors.white, fontSize: 30, marginTop: 10, marginHorizontal: 10 }} />
        <Text style={{ color: Colors.white, fontSize: 20, textAlign: 'center' }}>{'='}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', marginHorizontal: 20 }}>
        <Text style={{ color: Colors.white, fontSize: 20, textAlign: 'center' }}>{to.toUpperCase()}</Text>
        <Text style={{ color: Colors.white, fontSize: 18, textAlign: 'center' }}>{value}</Text>
      </View>
    </TouchableOpacity>
  ))

  handleChange = field => value => {
    this.setState({ [field]: { value, currecy: this.state[field].currecy } })
  }

  renderConverter = () => (
    <View>
      <Text style={{ color: Colors.white, fontSize: 18, marginLeft: 20 }}>{"Convertisseur "}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
        <InputField
          keyboardType={'numeric'}
          returnKeyType={'done'}
          input={{
            onChangeText: this.handleChange('from'),
            value: this.state.from.value
          }}
        />
        <Icon name={'ios-swap'} style={{ color: Colors.white, fontSize: 30, marginTop: 10, marginHorizontal: 10 }} />
        <InputField
          keyboardType={'numeric'}
          returnKeyType={'done'}
          input={{
            onChangeText: this.handleChange('to'),
            value: this.state.to.value
          }}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
        <PickerField
          options={this.fromCurrencies}
          initialValue={'dzd'}
          input={{
            onChange: this.handleChange('from'),
            value: this.state.from.currency
          }}
        />
        <View style={{ width: 30, marginTop: 10, marginHorizontal: 8 }} />
        <PickerField
          options={this.toCurrencies}
          initialValue={'euro'}
          input={{
            onChange: this.handleChange('from'),
            value: this.state.from.currency
          }}
        />
      </View>
    </View>
  )

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header icon={'md-arrow-round-back'} text={'Taux d\'échange'} />
        {this.renderConverter()}
        <ScrollView style={{ marginTop: 20, marginHorizontal: 20 }}>
          {this.renderExchageRateItem()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({ exchangeRate: { rates } }) => {
  return { rates }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRates: () => dispatch(ExchangeRateActions.exchangeRateRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRateScreen)
