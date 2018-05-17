import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';

class NfcPendingScreen extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Text>{`Is NFC supported ?`}</Text>
      </ScrollView>
    )
  }
}

export default NfcPendingScreen