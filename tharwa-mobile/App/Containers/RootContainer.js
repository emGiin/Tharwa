import React, { Component } from 'react'
import { View, Text, StatusBar, BackHandler, NetInfo } from 'react-native'
import I18n from 'react-native-i18n'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '../Themes'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import StartupActions from '../Redux/StartupRedux'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { isConnected: true }
  }
  componentDidMount() {
    this.props.startup();

    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.shouldCloseApp(this.props.nav)) return false
      this.props.goBack();
      return true
    });

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnetionChange);
  }

  handleConnetionChange = (hasInternetConnection) => {
    if (hasInternetConnection !== this.state.isConnected) {
      this.setState({
        isConnected: hasInternetConnection,
        showNetState: true
      })

      if (this.state.isConnected && this.state.showNetState) {
        setTimeout(() => {
          this.setState({ showNetState: false })
        }, 2000);
      }
    }
  }

  shouldCloseApp(nav) {
    return !this.state.isConnected
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
    NetInfo.isConnected.removeEventListener('connectionChange')
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
  nav: state.nav,
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  goBack: () => dispatch(NavigationActions.back()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
