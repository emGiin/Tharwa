import { StyleSheet } from 'react-native'
import { Fonts, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  online: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  offline: {
    backgroundColor: '#ff4b54',
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  disconnectionOverlay: {
    position: 'absolute',
    flex: 1,
    top: 22,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)'
  }
})
