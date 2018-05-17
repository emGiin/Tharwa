import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'
import { Colors } from '../../../Themes'

const size = Dimensions.get('window').width / 2

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    paddingTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  nfcLogo: {
    height: 50,
    width: 50
  },
  cancelBtn: {
    color: Colors.button,
    fontSize: 16
  },
  detailsText: {
    marginTop: 40,
    color: Colors.white,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 40
  },
  pendingTxt: {
    color: Colors.white,
    textAlign: 'center',
    paddingHorizontal: 5
  },
  pendingContainer: {
    width: size,
    height: size,
    borderRadius: size,
    backgroundColor: Colors.button,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
