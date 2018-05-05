import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  View, ScrollView, Image,
  TouchableOpacity, Text
} from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import { Images } from '../Themes'
import styles from './Styles/DrawerComponentStyle'

class Drawer extends Component {
  filter = items => {
    // Client   Employeur
    if (this.props.accountType !== 'Employee') {
      const invisibleItems = ['TransactionOrderScreen'];
      return items.filter(item => !invisibleItems.includes(item.key))
    }
    return items
  }

  render() {
    const { email, name, picture, items, ...other } = this.props
    const getVisible = item => !contains(item.key, visibleItems);

    return (
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
          <TouchableOpacity
            style={styles.drawerHead}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Image style={styles.drawerImage} source={picture} />
            <View style={styles.info}>
              <Text style={[styles.text, styles.name]}>{name}</Text>
              <Text style={styles.text}>{email}</Text>
            </View>
          </TouchableOpacity>
          <DrawerItems
            items={this.filter(items)}
            {...other}
          />
          <View style={styles.separator}></View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ account: { accountType, information: info } }) => {
  return {
    accountType: accountType || 'Client',
    name: (info ? `${info.lastName} ${info.firstName}` : 'John Doe'),
    picture: info.picture || Images.avatar,
    email: info.email || 'john_doe@mail.com'
  };
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)