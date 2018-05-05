import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  header: {
    backgroundColor: 'transparent'
  },
  drawerHead: {
    height: 150,
    width: '100%',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ecf0f1',
    backgroundColor: '#ecf0f1',
    flexDirection: 'row',
    alignItems: 'center'
  },
  drawerImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  text: {
    marginLeft: 10,
    color: '#555'
  },
  name: {
    fontSize: 16
  },
  info: {
    flexDirection: 'column'
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  }
})
