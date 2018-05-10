import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView } from 'react-native'
import I18n from 'react-native-i18n'
import { CurrencyConverter, Header, ExchangeRateItem } from '../../Components'

// Redux
import ExchangeRateActions from '../../Redux/ExchangeRateRedux'

// Styles
import styles from './Styles/ExchangeRateScreenStyles'

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

  renderExchageRateItem = () => this.props.rates.map(data => (
    <ExchangeRateItem key={`${data.from}-${data.to}`} {...data} />
  ))

  handleChange = field => value => {
    this.setState({ [field]: { value, currecy: this.state[field].currecy } })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header icon={'md-arrow-round-back'} text={I18n.t('exchangeRate')} />
        <CurrencyConverter
          from={this.state.from}
          to={this.state.to}
          fromCurrencies={this.fromCurrencies}
          toCurrencies={this.toCurrencies}
          handleChange={this.handleChange} />
        <Text style={styles.title}>{I18n.t('realTimeValue')}</Text>
        <ScrollView style={styles.currenciesList}>
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
