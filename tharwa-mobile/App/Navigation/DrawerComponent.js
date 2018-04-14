import React, { Component } from 'react';
import {
  View, ScrollView, Image,
  TouchableOpacity, Text
} from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import { Images } from '../Themes'
import styles from './Styles/DrawerComponentStyle'

class Drawer extends Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
          <TouchableOpacity
            style={styles.drawerHead}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Image style={styles.drawerImage} source={Images.avatar} />
            <Text style={{ marginLeft: 10, color: '#555' }}>John Doe</Text>
          </TouchableOpacity>
          <DrawerItems {...this.props} />
          <View style={{ borderTopWidth: 1, borderTopColor: '#ddd' }}></View>

        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default Drawer