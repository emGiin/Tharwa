import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class DrawerIcon extends Component {

  render() {
    const { focused, tintColor, icon, unselectedIcon, size = 26 } = this.props
    return (
      <Icon
        name={focused ? icon : (unselectedIcon || `${icon}-outline`)}
        size={size}
        style={{ color: tintColor }}
      />
    );
  }
}

export { DrawerIcon }