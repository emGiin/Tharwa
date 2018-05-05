import React, { Component } from 'react';
import {
  View, TouchableOpacity,
  Text, Dimensions
} from 'react-native';
import styles from './Styles/TabBarStyles'
import { Colors } from '../Themes';

const { width } = Dimensions.get('window');

class CustomTabBar extends Component {

  renderItems = () => {
    const items = []
    const { navigation, screens } = this.props
    const { routes, index } = navigation.state;
    const currentRoute = routes[index].key

    for (let [key, { navigationOptions: options }] of Object.entries(screens)) {
      const color = (currentRoute === key) ? Colors.button : Colors.forground;
      const isFocused = currentRoute === key;

      items.push(
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => { navigation.navigate(key, options.params || {}) }}
          style={[styles.tab, { backgroundColor: color }]}
          key={key}
        >
          {
            options.tabBarIcon({
              focused: isFocused,
              tintColor: '#fff',
              size: isFocused ? 22 : 28
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
    return (
      <View style={styles.tabContainer}>
        {this.renderItems()}
      </View>
    );
  }
}

export default CustomTabBar;