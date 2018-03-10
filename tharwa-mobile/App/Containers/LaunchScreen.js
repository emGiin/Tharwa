import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {

  componentDidMount() {
    const { navigate } = this.props.navigation;
    setTimeout(() => navigate('LoginScreen'), 6000)
  }

  render() {
    return (
      <View style={styles.mainContainer}>
      
        <View style={styles.loginColor2}></View>
        <View style={styles.centered}>
        <ScrollView style={styles.container}>
        
          <AnimatedCircularProgress
  size={300}
  width={5}
  fill={100}
  tintColor="#108C88"
  backgroundColor="#2c3e50">
  {
    (fill) => (
      <View style={styles.centered2}>
      <Image source={Images.logo} style={styles.logo} />
    </View>
      
    )
  }
</AnimatedCircularProgress>
          <View style={styles.section} >
            
            <Text style={styles.sectionText}>
            The way your bank should be
            </Text>
       
          </View>

        </ScrollView>
        </View>
      </View>
    )
  }
}
