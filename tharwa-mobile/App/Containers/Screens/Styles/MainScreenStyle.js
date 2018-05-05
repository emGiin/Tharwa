import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: Colors.background
  },
  carouselContainer: {
    height: 165,
    marginVertical: -10
  },
  historyTitleContainer: {
    borderBottomColor: Colors.forground,
    borderBottomWidth: 3,
    marginHorizontal: 7
  },
  historyTitle: {
    color: Colors.white,
    fontSize: 18
  },
  historyList: {
    marginTop: 2,
    marginHorizontal: 10
  }
})
