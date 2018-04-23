import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
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
  imagePreview: {
    // margin: 10,
    flex: 1,
    width: 30,
    height: 30,
    borderRadius: 200
  },
  pageContainer: {
    backgroundColor: '#ffffffbb',
    height: 100
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 5
  },
  account: {
    fontSize: 16
  },
  amount: {
    fontSize: 26,
    margin: 5
  },
  account: {
    fontSize: 16
  },
  amount: {
    fontSize: 26,
    margin: 5
  },
  historyTitleContainer: {
    marginTop: -250,
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    marginHorizontal: 20
  },
  historyTitle: {
    color: '#555'
  },
  historyList: {
    marginTop: 20
  }
})
