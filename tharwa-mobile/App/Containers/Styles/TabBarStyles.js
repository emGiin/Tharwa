import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes';

export default StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    elevation: 5,
    backgroundColor: Colors.background
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55
  }
})
