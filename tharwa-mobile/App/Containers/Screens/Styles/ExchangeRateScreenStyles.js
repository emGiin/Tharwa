import { StyleSheet } from 'react-native'
import { Colors } from '../../../Themes'

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    height: '100%',
  },
  container: {
    backgroundColor: Colors.forground,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 3,
    borderRadius: 3
  }
})
