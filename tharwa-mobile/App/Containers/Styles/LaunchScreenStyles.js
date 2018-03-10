import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
   
    paddingBottom: Metrics.baseMargin,
    
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  loginColor:{
    ...ApplicationStyles.screen.backgroundImage,
    backgroundColor: '#2c3e50',
    opacity:0.9

  },
  loginColor2:{
    ...ApplicationStyles.screen.backgroundImage,
    backgroundColor: '#2c3e50',
  

  },
  centered: {
    top: 50,
    alignItems: 'center'
  },
  centered2: {
    alignItems: 'center'
  }
})
