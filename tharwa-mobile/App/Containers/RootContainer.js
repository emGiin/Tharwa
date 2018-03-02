import React, { Component } from 'react'
import { View, StatusBar, BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import StartupActions from '../Redux/StartupRedux'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount() {
    this.props.startup();

    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.shouldCloseApp(this.props.nav)) return false
      this.props.goBack();
      return true
    })
  }

  shouldCloseApp(nav) {
    return false
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
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
