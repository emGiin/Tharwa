import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { CurrencyConverter, ExchangeRateItem, Header } from '../../Components';
// Redux
import ExchangeRateActions from '../../Redux/ExchangeRateRedux';
// Styles
import styles from './Styles/ExchangeRateScreenStyles';



class ExchangeRateScreen extends Component {
  INTERVAL = 10000
  state = {
    from: { value: '0', currency: '' },
    to: { value: '0', currency: '' }
  }

  currencies = []

  extractCurrencies = rates => {
    rates.forEach(rate => {
      if (!this.currencies.includes(rate.from))
        this.currencies.push(rate.from)
      if (!this.currencies.includes(rate.to))
        this.currencies.push(rate.to)
    })
  }

  componentWillReceiveProps({ rates }) {
    if (this.currencies.length === 0) {
      this.extractCurrencies(rates)
      this.setState({
        from: { value: '1', currency: rates[0].from },
        to: { value: `${rates[0].value}`, currency: rates[0].to }
      })
    }
  }

  componentWillMount() {
    if (this.props.rates.length === 0) {
      this.props.getRates()
      this.startFetchingInterval()
    }
  }

  getSelectedExchangeRate = (from, to) => {
    return (this.props.rates.find(rate => {
      return rate.from === from && rate.to === to
    }) || { value: 1 }).value
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  startFetchingInterval = () => {
    this.interval = setInterval(this.props.getRates, this.INTERVAL)
  }

  selectRate = (from, to, value) => {
    this.setState({
      from: { value: '1', currency: from },
      to: { value: `${value}`, currency: to }
    })
  }

  renderExchageRateItem = () => this.props.rates.map(data => (
    <ExchangeRateItem onPress={this.selectRate} key={`${data.from}-${data.to}`} {...data} />
  ))

  handleInputChange = field => v => {
    const value = parseInt(v, 10)
    const from = this.state.from.currency
    const to = this.state.to.currency
    const rate = this.getSelectedExchangeRate(from, to)
    if (field === 'from') {
      this.setState({
        from: { value: v, currency: from },
        to: { value: `${((value * rate) || 0).toFixed(4)}`, currency: to }
      })
    } else {
      this.setState({
        from: { value: `${((1 / rate * value) || 0).toFixed(4)}`, currency: from },
        to: { value: v, currency: to }
      })
    }
  }

  handleSelectChange = field => value => {
    if (field === 'from') {
      const to = this.state.to.currency
      const rate = this.getSelectedExchangeRate(value, to)
      this.setState({
        from: { value: '1', currency: value },
        to: { value: `${rate}`, currency: to }
      })
    } else {
      const from = this.state.from.currency
      const rate = this.getSelectedExchangeRate(value, from)
      this.setState({
        from: { value: `${(1 / rate).toFixed(4)}`, currency: from },
        to: { value: '1', currency: value }
      })
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header icon={'md-arrow-round-back'} text={I18n.t('exchangeRate')} />
        <CurrencyConverter
          from={this.state.from}
          to={this.state.to}
          currencies={this.currencies}
          handleInputChange={this.handleInputChange}
          handleSelectChange={this.handleSelectChange} />
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
