import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/TabBarStyles'
import { Colors } from '../Themes'

class CustomTabBar extends Component {
  invisibleItems = ['TransferOrderHistoryScreen'];

  constructor(props) {
    super(props)

    this.keyboardWillShow = this.keyboardWillShow.bind(this)
    this.keyboardWillHide = this.keyboardWillHide.bind(this)

    this.state = { isVisible: true }
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow = () => {
    this.setState({
      isVisible: false
    })
  }

  keyboardWillHide = () => {
    this.setState({
      isVisible: true
    })
  }

  renderItems = () => {
    const items = []
    const { navigation, screens } = this.props
    const { routes, index } = navigation.state;
    const currentRoute = routes[index].key
    const entries = Object.entries(screens)

    for (let [key, { navigationOptions: options }] of entries) {
      if (this.props.accountType !== 'Employee' &&
        this.invisibleItems.includes(key)) continue;

      const color = (currentRoute === key) ? Colors.button : Colors.forground;
      const isFocused = currentRoute === key;

      items.push(
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate(key, options.params || {})
          }}
          style={[styles.tab, { backgroundColor: color }]}
          key={key}
        >
          {
            options.tabBarIcon({
              focused: isFocused,
              tintColor: '#fff',
              size: isFocused ? 20 : 28
            })
          }

          {
            isFocused &&
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 12 }}>
              {options.tabBarLabel}
            </Text>
          }
        </TouchableOpacity>
      )
    }
    return items
  }

  render() {
    return this.state.isVisible ? (
      <View style={styles.tabContainer}>
        {this.renderItems()}
      </View>
    ) : null;
  }
}

const mapStateToProps = ({ account: { information: { infos = {} } } }) => {
  return {
    accountType: infos.accountType || 'Client'
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTabBar)