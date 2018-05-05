import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    height: '100%',
    flex: 1,
    // backgroundColor: Colors.background
  },
  carouselContainer: {
    height: 165,
    marginVertical: -10
  },
  historyTitleContainer: {
    borderBottomColor: Colors.forground,
    borderBottomWidth: 2,
    marginHorizontal: 7
  },
  historyTitle: {
    color: Colors.forground,
    fontSize: 18
  },
  historyList: {
    marginTop: 2,
    marginHorizontal: 10
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})
