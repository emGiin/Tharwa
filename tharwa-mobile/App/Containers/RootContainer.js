import React, { Component } from 'react'
import { View, Text, StatusBar, BackHandler, NetInfo, AppState } from 'react-native'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '../Themes'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import StartupActions from '../Redux/StartupRedux'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  state = {
    isConnected: true,
    appState: AppState.currentState
  }

  componentDidMount() {
    this.props.startup();

    BackHandler.addEventListener('hardwareBackPress', this.handleHardwareBackPress);
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnetionChange);
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
    NetInfo.isConnected.removeEventListener('connectionChange')
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      // console.warn('App has come to the foreground!')
      // TODO show pin code if logged in
    }
    this.setState({ appState: nextAppState });
  }

  handleHardwareBackPress = () => {
    // console.warn(this.props.nav);

    if (this.shouldCloseApp()) return false
    this.props.goBack();
    return true
  }

  shouldCloseApp() {
    const routeName = this.getCurrentRouteName()
    const notAllowedRouted = [
      'LaunchScreen'
    ]

    return !this.state.isConnected || notAllowedRouted.includes(routeName)
  }

  handleConnetionChange = (isConnected) => {
    if (isConnected !== this.state.isConnected) {
      this.setState({ isConnected, showNetState: true })

      if (isConnected && this.state.showNetState) {
        setTimeout(() => { this.setState({ showNetState: false }) }, 2000);
      }
    }
  }

  getCurrentRouteName = () => {
    const { index } = this.props.nav
    return this.props.nav.routes[index - 1].routeName
  }

  render() {
    const { showNetState, isConnected } = this.state;
    const message = isConnected ? I18n.t('connected') : I18n.t('noInternet');
    const style = isConnected ? styles.online : styles.offline;
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.forground} />
        {showNetState && <Text style={style}> {message} </Text>}
        <ReduxNavigation />

        {!isConnected && <View style={styles.disconnectionOverlay} />}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  // nav: state.nav,
  nav: state.nav,
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  goBack: () => dispatch(NavigationActions.back()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
