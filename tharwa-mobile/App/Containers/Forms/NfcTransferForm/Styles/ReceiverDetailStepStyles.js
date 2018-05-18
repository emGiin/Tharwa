import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'
import { Colors } from '../../../../Themes'

const size = Dimensions.get('window').width / 2

export default StyleSheet.create({
  container: {
    height: 300,
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    paddingTop: 25,
    backgroundColor: Colors.forground,
    elevation: 5
  },
  topContainer: {
    paddingTop: 10,
    width: '100%',
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

