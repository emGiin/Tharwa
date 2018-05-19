import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    marginBottom: 20
  },
  leftButton: {
    position: 'absolute',
    left: 10,
    top: 13
  },
  rightButton: {
    position: 'absolute',
    right: 10,
    top: 15
  },
  badgeContainer: {
    height: 15,
    width: 15,
    borderRadius: 20,
    backgroundColor: "#c0392b",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 2,
    right: 0
  },
  badgeTxt: {
    fontSize: 10,
    color: '#fff'
  }
})
