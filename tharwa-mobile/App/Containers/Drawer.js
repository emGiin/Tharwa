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

const mapStateToProps = ({ account: { accountType, information: { infos = {} } } }) => {
  return {
    accountType: accountType || 'Client',
    name: (infos ? `${infos.lastname} ${infos.firstname}` : 'John Doe'),
    picture: infos.picture || Images.avatar,
    email: infos.email || 'john_doe@mail.com'
  };
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)