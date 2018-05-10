import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.forground,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 3,
    borderRadius: 3
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 20
  },
  currency: {
    color: "rgba(255,255,255,0.8)",
    textAlign: 'center'
  },
  value: {
    color: Colors.white,
    fontSize: 18,
    textAlign: 'center'
  },
  swapIcon: {
    color: Colors.white,
    fontSize: 30,
    marginBottom: -5,
    marginHorizontal: 10
  },
  equalIcon: {
    color: Colors.white,
    fontSize: 20,
    textAlign: 'center'
  }
})