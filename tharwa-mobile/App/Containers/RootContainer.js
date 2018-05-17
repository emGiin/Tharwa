import React, { Component } from 'react'
import { View, Text, StatusBar, BackHandler, Platform, NetInfo, AppState, NativeModules } from 'react-native'
import { Button } from 'native-base'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import NfcManager from 'react-native-nfc-manager';
import { Colors } from '../Themes'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import StartupActions from '../Redux/StartupRedux'

// Styles
import styles from './Styles/RootContainerStyles'

const { NfcNdefManager } = NativeModules

class RootContainer extends Component {
  state = {
    isConnected: true,
    appState: AppState.currentState,
    nfcSupported: true,
    nfcEnabled: false,
    nfcParsedText: ''
  }

  componentDidMount() {
    this.props.startup();
    NfcNdefManager.setMessage("Hello from react native", () => {
      console.warn("NDEF Sent");

    });
    BackHandler.addEventListener('hardwareBackPress', this.handleHardwareBackPress);
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnetionChange);
    AppState.addEventListener('change', this.handleAppStateChange);
    this.checkNfcSupport();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
    NetInfo.isConnected.removeEventListener('connectionChange')
    AppState.removeEventListener('change', this.handleAppStateChange);

    // NFC
    if (this.nfcStateChangedSubscription) this.nfcStateChangedSubscription.remove();
  }

  /* NFC */
  checkNfcSupport = () => {
    NfcManager.isSupported().then(supported => {
      this.setState({ supported });
      if (supported) {
        this.startNfc();
      }
    })
  }

  startNfc() {
    NfcManager.start({ onSessionClosedIOS: () => { } }).then(() => {
      // console.warn('start OK');
    }).catch(error => {
      console.warn('start fail', error);
      this.setState({ supported: false });
    })

    if (Platform.OS === 'android') {
      NfcManager.getLaunchTagEvent().then(tag => {
        if (tag) this.setState({ tag })
      }).catch(console.warn)

      NfcManager.isEnabled().then(enabled => {
        this.setState({ enabled });
        this.startDetection()
      }).catch(console.warn)

      NfcManager.onStateChanged(this.onStateChanged).then(sub => {
        this.nfcStateChangedSubscription = sub;
      }).catch(console.warn)
    }
  }

  onStateChanged = ({ state }) => {
    if (state === 'on') {
      this.setState({ enabled: true });
    } else if (state === 'off') {
      this.setState({ enabled: false });
      NfcManager.unregisterTagEvent().catch(console.warn)
    }
  }

  startDetection = () => {
    NfcManager.registerTagEvent(this.onTagDiscovered).then(() => {
      console.warn('registerTagEvent OK')
    }).catch(console.warn)
  }

  onTagDiscovered = tag => {
    // console.warn('Tag Discovered', tag);
    this.setState({ tag });
    let text = String.fromCharCode.apply(String, tag.ndefMessage[0].payload);
    /* TODO: goto micro transfer screen */
    console.warn('parsed', text);
    this.setState({ parsedText: text });
  }
  /* NFC */

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      // NfcNdefManager.getMessages(console.warn);
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
    const notAllowedRouted = ['LaunchScreen']
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
        <Button full onPress={this.startDetection.bind(this)}>
          <Text>Hello</Text>
        </Button>
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
