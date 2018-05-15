import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  NativeModules
} from 'react-native';

const { NfcManager } = NativeModules

class App extends Component {
  componentWillMount() {
    // NfcManager.setMessage("Hello from react native");
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={this.sendText}>
          <Text style={{ color: 'blue' }}>Start Tag Detection</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

export default App;